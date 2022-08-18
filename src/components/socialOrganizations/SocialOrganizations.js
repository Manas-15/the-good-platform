import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  socialOrganizationConstants,
  paginationConstants,
  viewPortalConstants,
  userConstants,
} from "../../constants";
import { socialOrganizationActions } from "../../actions";
import { Tabs } from "antd";
import { AuditOutlined, RedoOutlined } from "@ant-design/icons";
import Loader from "../Shared/Loader";
import ListSocialOrganizations from "./ListSocialOrganizations";
import { SearchHelper } from "../../helpers";
import { history } from "../../helpers";
import { Modal, Button } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import { addProgrammeSchema } from "../Validations";

let pageSize = paginationConstants?.PAGE_SIZE;
const TabPane = Tabs.TabPane;

const SocialOrganizations = () => {
  const dispatch = useDispatch();
  const socialOrganizations = useSelector(
    (state) => state?.socialOrganizations
  );
  const employeeProgram = useSelector(
    (state) => state?.socialOrganizations?.employeeprogram
  );
  const loggedInUserType = useSelector(
    (state) => state?.employee?.loggedinUserType
  );
  const user = useSelector((state) => state?.employee?.user);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);

  const programmeInitialValues = {
    socialName: "",
    charityName: "",
    category: "",
    unit_price: "",
    employeeId: user?.emp_id,
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
  const [tabType, setTabType] = useState(socialOrganizationConstants.SPONSORED);

  const isCorporatePortal = user?.user_type === userConstants.CORPORATE;
  const isEmployeePortal = user?.user_type === userConstants.EMPLOYEE;
  const isIndividualPortal =
    currentPortal?.currentView === viewPortalConstants.INDIVIDUAL_PORTAL;
  const isOtherCorporatePortal =
    user?.userRole === viewPortalConstants.PAYMENT_ADMIN;

  useEffect(() => {
    dispatch(
      socialOrganizationActions.getSocialOrganizations(
        isIndividualPortal
          ? {
              pageNumber: currentPage.toString(),
              employeeId: isEmployeePortal ? user?.emp_id : null,
              userId: user?.user_id,
              corporateId: isCorporatePortal
                ? selectedCorporate?.corporate?.corporateId
                  ? selectedCorporate?.corporate?.corporateId
                  : selectedCorporate?.corporate?.id
                : user?.corporateId,
              pageSize: pageSize.toString(),
              loggedInUserType: loggedInUserType ? loggedInUserType : null,
              individualId:
                loggedInUserType === userConstants.INDIVIDUAL
                  ? user?.uuid
                  : null,
            }
          : isOtherCorporatePortal
          ? {
              loggedInUserType: loggedInUserType ? loggedInUserType : null,
              userRole: user?.userRole ? user?.userRole : null,
            }
          : {
              pageNumber: currentPage.toString(),
              corporateId: isCorporatePortal
                ? selectedCorporate?.corporate?.corporateId
                  ? selectedCorporate?.corporate?.corporateId
                  : selectedCorporate?.corporate?.id
                : user?.corporateId,
              employeeId: isEmployeePortal ? user?.emp_id : null,
              individualId: user?.uuid,
              loggedInUserType: user?.user_type,
              pageSize: pageSize.toString(),
              userId: user?.user_id,
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
      socialOrganizationActions.getApprovedProgram({
        employeeId: user?.emp_id,
      })
    );
  }, []);
  const createProgramme = (values) => {
    // programmeInitialValues.employeeId = user?.emp_id;
    dispatch(socialOrganizationActions.addNewProgramme(values));
    setOpen(false);
  };
  return (
    <div className="customContainer program-list">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">Social Organizations</h1>
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn btn-secondary"
            // onClick={() => history.push("/add-programme")}
            onClick={() => showModal()}
          >
            Add Programme
          </button>
        </div>
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
              <TabPane
                tab={
                  <span>
                    <RedoOutlined className="fs-5" />
                    {socialOrganizationConstants.YOURS} (
                    {employeeProgram
                      ? searchText &&
                        tabType === socialOrganizationConstants.YOURS
                        ? SearchHelper(employeeProgram, searchText).length
                        : employeeProgram?.filter(
                            (employeeProgram) =>
                              employeeProgram.approve === true
                          ).length
                      : 0}
                    )
                  </span>
                }
                key={socialOrganizationConstants.YOURS}
              >
                <ListSocialOrganizations
                  tabType={tabType}
                  items={
                    searchText && tabType === socialOrganizationConstants.YOURS
                      ? SearchHelper(employeeProgram, searchText)
                      : employeeProgram?.filter(
                          (employeeProgram) => employeeProgram.approve === true
                        )
                  }
                />
              </TabPane>
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
            <Modal.Title>Add New Programme</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={programmeInitialValues}
            validationSchema={addProgrammeSchema}
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
              isSubmitting,
            }) => (
              <Form>
                <Modal.Body style={{ fontSize: "18" }}>
                  <>
                    <h6>Organisation</h6>
                    <div className="form-group mt-2">
                      <label htmlFor="email" className="has-float-label">
                        <Field
                          name="socialName"
                          id="socialName"
                          type="text"
                          placeholder=" "
                          className={
                            "form-control" +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                        />
                        <span>Social Name</span>
                      </label>
                      <ErrorMessage
                        name="socialName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <h6>Charity</h6>
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
                        <span>Charity Name</span>
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
                        {/* {corporates?.items?.map?.((corporate, index) => ( */}
                        <option value="Health" key="">
                          Health
                        </option>
                        <option value="Domestic Needs" key="">
                          Domestic Needs
                        </option>

                        {/* ))} */}
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
                    <div className="form-group mt-2">
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
                    </div>
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
    </div>
  );
};
export default SocialOrganizations;
