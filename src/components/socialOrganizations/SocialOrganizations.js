import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  socialOrganizationConstants,
  paginationConstants,
  viewPortalConstants,
  userConstants,
  charityProgramConstants,
  donationPreferenceConstants
} from "../../constants";
import {
  charityProgramActions,
  corporateActions,
  employeeProgramActions,
  selectedCharityActions,
  socialOrganizationActions
} from "../../actions";
import { Tabs } from "antd";
import { AuditOutlined, RedoOutlined } from "@ant-design/icons";
import Loader from "../Shared/Loader";
import ListSocialOrganizations from "./ListSocialOrganizations";
import { SearchCharityHelper, SearchHelper } from "../../helpers";
import { history } from "../../helpers";
import { Modal, Button } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import { addProgramSchema } from "../Validations";
import ListCharityPrograms from "../CharityPrograms/ListCharityPrograms";
import DonateHeader from "../CharityPrograms/DonateHeader";
import Donate from "../CharityPrograms/Donate";

let pageSize = paginationConstants?.PAGE_SIZE;
const TabPane = Tabs.TabPane;

const SocialOrganizations = () => {
  const dispatch = useDispatch();
  const socialOrganizations = useSelector(
    (state) => state?.socialOrganizations
  );
  const employeePrograms = useSelector(
    (state) => state?.employeePrograms?.items
  );
  const loggedInUserType = useSelector(
    (state) => state?.employee?.loggedinUserType
  );
  const user = useSelector((state) => state?.employee?.user);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);

  const programmeInitialValues = {
    // socialName: "",
    charityName: "",
    category: "",
    unit_price: "",
    employeeId: user?.emp_id,
    corporateId: user?.corporateId
  };

  const [open, setOpen] = useState(false);
  // const [allChecked, setAllChecked] = useState(false);
  // const [actionType, setActionType] = useState("");
  // const [actionTitle, setActionTitle] = useState("");
  // const [actionContent, setActionContent] = useState("");
  const [searchText, setSearchText] = useState("");
  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharity, setSelectedCharity] = useState();
  const [tabType, setTabType] = useState(socialOrganizationConstants.SPONSORED);

  const isCorporateUserId = user?.user_type === userConstants.CORPORATE;
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const isEmployee = user?.user_type === userConstants.EMPLOYEE;
  const isEmployeePortal =
    currentPortal?.currentView === viewPortalConstants.EMPLOYEE_PORTAL;
  const isIndividualPortal =
    currentPortal?.currentView === viewPortalConstants.INDIVIDUAL_PORTAL;
  const isOtherCorporatePortal =
    user?.userRole === viewPortalConstants.PAYMENT_ADMIN;
  const categoryOptions = [
    { name: "Agriculture", value: "Agriculture" },
    { name: "Disaster", value: "Disaster" },
    { name: "Domestic Needs", value: "Domestic Needs" },
    { name: "Education", value: "Education" },
    { name: "Health", value: "Health" },
    { name: "Social Change", value: "Social Change" }
  ];
  useEffect(() => {
    dispatch(
      socialOrganizationActions.getSocialOrganizations(
        isIndividualPortal
          ? {
              pageNumber: currentPage.toString(),
              employeeId: isEmployee ? user?.emp_id : null,
              userId: user?.user_id,
              corporateId: isCorporateUserId
                ? selectedCorporate?.corporate?.corporateId
                  ? selectedCorporate?.corporate?.corporateId
                  : selectedCorporate?.corporate?.id
                : user?.corporateId,
              pageSize: pageSize.toString(),
              loggedInUserType: loggedInUserType ? loggedInUserType : null,
              individualId:
                loggedInUserType === userConstants.INDIVIDUAL
                  ? user?.uuid
                  : null
            }
          : isOtherCorporatePortal
          ? {
              loggedInUserType: loggedInUserType ? loggedInUserType : null,
              userRole: user?.userRole ? user?.userRole : null
            }
          : {
              pageNumber: currentPage.toString(),
              corporateId: isCorporateUserId
                ? selectedCorporate?.corporate?.corporateId
                  ? selectedCorporate?.corporate?.corporateId
                  : selectedCorporate?.corporate?.id
                : user?.corporateId,
              employeeId: isEmployee ? user?.emp_id : null,
              individualId: user?.uuid,
              loggedInUserType: user?.user_type,
              pageSize: pageSize.toString(),
              userId: user?.user_id
            }
      )
    );
  }, [currentPage]);

  // const setPage = (page) => {
  //   setCurrentPage(page);
  // };
  useEffect(() => {
    setTotalCount(socialOrganizations?.totalCount);
  }, [socialOrganizations?.totalCount]);
  // const setOrganization = (organization) => {
  //   dispatch(selectedOrganizationActions.selectedOrganization(organization));
  // };
  // const renderClass = (param) => {
  //   switch (param) {
  //     case socialOrganizationConstants.APPROVED:
  //       return "text-success";
  //     case socialOrganizationConstants.REJECTED:
  //       return "text-danger";
  //     case socialOrganizationConstants.PENDING:
  //       return "text-warning";
  //     default:
  //       return "text-warning";
  //   }
  // };
  // const handleOpen = (action, item) => {
  //   setOpen(true);
  //   setActionType(action);
  //   setActionTitle(`${action} Confirmation`);
  //   if (action === charityProgramConstants.UNPROMOTE) {
  //     setActionContent(
  //       `Are you sure you want to unpromote?. Doing this would remove all the donation preferences set for the programs by the employees. Total 15 employees have set donation preference for the programs.`
  //     );
  //   } else {
  //     setActionContent(`Are you sure to ${action.toLowerCase()}?`);
  //   }
  // };
  const changeTab = (activeKey) => {
    setTabType(activeKey);
  };
  const search = (value) => {
    setSearchText(value);
    // if(tabType === socialOrganizationConstants.SPONSORED){
    //   socialOrganizations?.items?.sponsored.filter((sponsor) => sponsor?.name.includes(value))
    // }
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(
      employeeProgramActions.getApprovedProgram({
        employeeId: user?.emp_id,
        corporateId: user?.corporateId
      })
    );
  }, []);
  const createProgramme = (values) => {
    // programmeInitialValues.employeeId = user?.emp_id;
    dispatch(corporateActions.addEmployeeProgram(values));
    setOpen(false);
  };
  const setCharity = (charity) => {
    console.log("dddddddddddddddddd selected", charity);
    setSelectedCharity(charity);
    if (charity) {
      dispatch(selectedCharityActions.selectedCharity(charity));
    }
    openNav();
  };
  const openNav = () => {
    document.getElementById("sidepanel").classList.add("is-open");
  };
  const closeNav = () => {
    document.getElementById("sidepanel").classList.remove("is-open");
  };
  return (
    <div className="customContainer program-list">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">Social Organizations</h1>
        </div>
        {isEmployee && !isCorporateUserId && !isCorporatePortal && (
          <div className="col-md-6 text-end">
            <button className="btn btn-custom me-3" onClick={() => showModal()}>
              <i className="bi bi-plus-circle mr-2"></i>
              Add Program
            </button>
          </div>
        )}
      </div>
      <div className="ant-row searchContainer mt-3 py-4 px-2 align-center">
        <div className="ant-col ant-col-24  searchContainer">
          <div className="ant-col ant-col-8">
            <div className="ant-input-affix-wrapper inputFilterInput">
              <span className="ant-input-prefix">
                <i className="bi bi-search"></i>
                <input
                  placeholder="Search by Organization Name"
                  className="ant-input-search"
                  type="text"
                  onChange={(e) => search(e.target.value)}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* {socialOrganizations?.loading && <Loader />} */}
      <div className="ant-tabs-nav-wrap">
        {user?.user_id &&
          (loggedInUserType === userConstants.EMPLOYEE ||
            loggedInUserType === userConstants.CORPORATE) && (
            <Tabs
              defaultActiveKey={socialOrganizationConstants.SPONSORED}
              onChange={changeTab}
            >
              <TabPane
                tab={
                  <span>
                    <AuditOutlined className="fs-5" />
                    {socialOrganizationConstants.SPONSORED} (
                    {socialOrganizations?.items?.sponsored
                      ? searchText &&
                        tabType === socialOrganizationConstants.SPONSORED
                        ? SearchHelper(
                            socialOrganizations?.items?.sponsored,
                            searchText
                          ).length
                        : socialOrganizations?.items?.sponsored?.length
                      : 0}
                    )
                  </span>
                }
                key={socialOrganizationConstants.SPONSORED}
              >
                <ListSocialOrganizations
                  tabType={tabType}
                  items={
                    searchText &&
                    tabType === socialOrganizationConstants.SPONSORED
                      ? SearchHelper(
                          socialOrganizations?.items?.sponsored,
                          searchText
                        )
                      : socialOrganizations?.items?.sponsored
                  }
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <RedoOutlined className="fs-5" />
                    {socialOrganizationConstants.OTHERS} (
                    {socialOrganizations?.items?.others
                      ? searchText &&
                        tabType === socialOrganizationConstants.OTHERS
                        ? SearchHelper(
                            socialOrganizations?.items?.others,
                            searchText
                          ).length
                        : socialOrganizations?.items?.others?.length
                      : 0}
                    )
                  </span>
                }
                key={socialOrganizationConstants.OTHERS}
              >
                <ListSocialOrganizations
                  tabType={tabType}
                  items={
                    searchText && tabType === socialOrganizationConstants.OTHERS
                      ? SearchHelper(
                          socialOrganizations?.items?.others,
                          searchText
                        )
                      : socialOrganizations?.items?.others
                  }
                />
              </TabPane>
              {isEmployee && !isCorporateUserId && !isCorporatePortal && (
                <TabPane
                  tab={
                    <span>
                      <RedoOutlined className="fs-5" />
                      {socialOrganizationConstants.CUSTOM} Programs (
                      {employeePrograms
                        ? searchText &&
                          tabType === socialOrganizationConstants.CUSTOM
                          ? SearchHelper(employeePrograms, searchText).length
                          : employeePrograms.length
                        : 0}
                      )
                    </span>
                  }
                  key={socialOrganizationConstants.CUSTOM}
                >
                  <ListCharityPrograms
                    items={
                      searchText && tabType === charityProgramConstants.SPONSOR
                        ? SearchCharityHelper(employeePrograms, searchText)
                        : employeePrograms
                    }
                    setCharity={setCharity}
                    tabType={tabType}
                    customProgram={"true"}
                  />
                  {/* <ListSocialOrganizations
                    tabType={tabType}
                    items={
                      searchText &&
                      tabType === socialOrganizationConstants.CUSTOM
                        ? SearchHelper(employeePrograms, searchText)
                        : employeePrograms
                    }
                  /> */}
                </TabPane>
              )}
            </Tabs>
          )}
        {loggedInUserType === userConstants.INDIVIDUAL && (
          <>
            <ListSocialOrganizations
              tabType={tabType}
              items={
                searchText
                  ? SearchHelper(socialOrganizations?.items, searchText)
                  : socialOrganizations?.items
              }
            />
            {/* <Pagination
              className="pagination-bar mt-4"
              currentPage={currentPage}
              totalCount={
                socialOrganizations?.totalCount
                  ? socialOrganizations?.totalCount
                  : 0
              }
              pageSize={pageSize}
              onPageChange={(page) => setPage(page)}
            /> */}
          </>
        )}

        {user?.userRole === viewPortalConstants.PAYMENT_ADMIN && (
          <>
            <ListSocialOrganizations
              tabType={tabType}
              items={
                searchText
                  ? SearchHelper(socialOrganizations?.items, searchText)
                  : socialOrganizations?.items?.data
              }
            />
            {/* <Pagination
              className="pagination-bar mt-4"
              currentPage={currentPage}
              totalCount={
                socialOrganizations?.totalCount
                  ? socialOrganizations?.totalCount
                  : 0
              }
              pageSize={pageSize}
              onPageChange={(page) => setPage(page)}
            /> */}
          </>
        )}

        <Modal show={open} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add New Program</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={programmeInitialValues}
            validationSchema={addProgramSchema}
            onSubmit={(values) => {
              console.log(values);
              createProgramme(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <Form>
                <Modal.Body style={{ fontSize: "18" }}>
                  <>
                    <div className="form-group mt-2">
                      <label htmlFor="charityName" className="has-float-label">
                        <Field
                          name="charityName"
                          id="charityName"
                          type="text"
                          placeholder=" "
                          className={
                            "form-control" +
                            (errors.charityName && touched.charityName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <span>Program Name</span>
                      </label>
                      <ErrorMessage
                        name="charityName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="category"
                        as="select"
                        className={
                          "form-select" +
                          (errors.category && touched.category
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Category</option>
                        {categoryOptions?.map?.((category, index) => (
                          <option value={category.value} key={index}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="corporateProfileId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="unit_price" className="has-float-label">
                        <Field
                          name="unit_price"
                          id="unit_price"
                          type="text"
                          placeholder=" "
                          className={
                            "form-control" +
                            (errors.unit_price && touched.unit_price
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <span>Unit Price</span>
                      </label>
                      <ErrorMessage
                        name="unit_price"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* <div className="form-group mt-2">
                      <label htmlFor="employeeId" className="has-float-label">
                        <Field
                          name="employeeId"
                          id="employeeId"
                          type="text"
                          value={user?.emp_id}
                          placeholder=" "
                          className={
                            "form-control" +
                            (errors.employeeId && touched.employeeId
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <span>Employee Id</span>
                      </label>
                      <ErrorMessage
                        name="employeeId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div> */}
                  </>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="btn btn-custom"
                    type="submit"
                    disabled={false}
                  >
                    Save
                  </Button>
                  <Button variant="danger" onClick={handleClose}>
                    No
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
      {
        <div id="sidepanel" className="sidepanel">
          <DonateHeader selectedCharity={selectedCharity} />
          <div className="tab-content pt-2">
            <div className="tab-pane fade show active give-once" id="give-once">
              <Donate
                frequency={donationPreferenceConstants.ONCE}
                selectedCharity={selectedCharity}
                tabType={tabType}
              />
            </div>
            <div className="tab-pane fade show give-monthly" id="give-monthly">
              <Donate
                frequency={donationPreferenceConstants.MONTHLY}
                selectedCharity={selectedCharity}
                tabType={tabType}
                customProgram={charityProgramConstants.CUSTOM_PROGRAM}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default SocialOrganizations;
