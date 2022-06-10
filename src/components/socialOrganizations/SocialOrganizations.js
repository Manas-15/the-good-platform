import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import socialOrganizations from "./../../config/socialOrganizations.json";
import { useDispatch, useSelector } from "react-redux";
import {
  socialOrganizationConstants,
  paginationConstants,
  charityProgramConstants,
  viewPortalConstants,
  userConstants,
} from "../../constants";
import {
  selectedOrganizationActions,
  socialOrganizationActions,
} from "../../actions";
import { Tabs, Icon } from "antd";
import { AuditOutlined, RedoOutlined } from "@ant-design/icons";
import Pagination from "./../Shared/Pagination";
import Loader from "../Shared/Loader";
import ListSocialOrganizations from "./ListSocialOrganizations";
import { SearchHelper } from "../../helpers";

// import Donate from "./../";
let pageSize = paginationConstants?.PAGE_SIZE;
let theArray = [];
const TabPane = Tabs.TabPane;
const SocialOrganizations = () => {
  let history = useHistory();
  const socialOrganizations = useSelector((state) => state.socialOrganizations);
  const loggedInUserType = useSelector(
    (state) => state?.user?.loggedinUserType
  );
  const user = useSelector((state) => state?.employee?.user);
  // const loggedInUser = useSelector((state) => state?.user);
  const [open, setOpen] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [searchText, setSearchText] = useState("");
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const [tabType, setTabType] = useState(socialOrganizationConstants.SPONSORED);
  const currentPortal = useSelector((state) => state.currentView);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const isEmployeePortal =
    currentPortal?.currentView === viewPortalConstants.EMPLOYEE_PORTAL;

  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(
    //   "loggedInUser?.loggedInUserType",
    //   loggedInUserType,
    //   currentPage
    // );
    dispatch(
      socialOrganizationActions.getSocialOrganizations({
        pageNumber: currentPage.toString(),
        employeeId: isEmployeePortal ? user?.emp_id : null,
        corporateId: isCorporatePortal
          ? selectedCorporate?.corporate?.corporateId
          : user?.corporateId,
        pageSize: pageSize.toString(),
        // offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
        loggedInUserType: loggedInUserType,
        individualId:
          loggedInUserType === userConstants.INDIVIDUAL ? user?.uuid : null,
      })
    );
  }, [currentPage]);
  const setPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setTotalCount(socialOrganizations?.totalCount);
  }, [socialOrganizations?.totalCount]);
  // const setOrganization = (organization) => {
  //   dispatch(selectedOrganizationActions.selectedOrganization(organization));
  // };
  const renderClass = (param) => {
    switch (param) {
      case socialOrganizationConstants.APPROVED:
        return "text-success";
      case socialOrganizationConstants.REJECTED:
        return "text-danger";
      case socialOrganizationConstants.PENDING:
        return "text-warning";
      default:
        return "text-warning";
    }
  };
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setActionTitle(`${action} Confirmation`);
    if (action === charityProgramConstants.UNPROMOTE) {
      setActionContent(
        `Are you sure you want to unpromote?. Doing this would remove all the donation preferences set for the programs by the employees. Total 15 employees have set donation preference for the programs.`
      );
    } else {
      setActionContent(`Are you sure to ${action.toLowerCase()}?`);
    }
  };
  const handleChange = (id) => {
    // let items = socialOrganizations?.items;
    // if (e.target.value === "checkAll") {
    //   items.forEach((item) => {
    //     item.isChecked = e.target.checked;
    //     allChecked = e.target.checked;
    //   });
    // } else {
    //   items.find((item) => item.name === e.target.name).isChecked =
    //     e.target.checked;
    // }
    const index = theArray.indexOf(id);
    // console.log("ddddddddddddddddddd checked start", theArray);
    if (index !== -1) {
      theArray.splice(index, 1);
    } else {
      theArray.push(id);
    }
    // console.log("ddddddddddddddddddd checked end", theArray);

    // setState({items:items, allChecked: allChecked});
  };
  const changeTab = (activeKey) => {
    setTabType(activeKey);
  };
  const search = (value) => {
    // console.log("fffffffffffffffffffffff", tabType, value);
    setSearchText(value);
    // if(tabType === socialOrganizationConstants.SPONSORED){
    //   socialOrganizations?.items?.sponsored.filter((sponsor) => sponsor?.name.includes(value))
    //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>", socialOrganizations?.items?.sponsored.filter((sponsor) => sponsor?.name.includes(value)))
    // }
  };
  return (
    <div className="customContainer program-list">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">Social Organizations</h1>
        </div>
      </div>
      <div className="ant-row searchContainer mt-3 py-4 px-4 align-center">
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
      {socialOrganizations.loading && <Loader />}
      <div className="ant-tabs-nav-wrap">
        {loggedInUserType !== userConstants.INDIVIDUAL && (
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
      </div>
    </div>
  );
};
export default SocialOrganizations;
