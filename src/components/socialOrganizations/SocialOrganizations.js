import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import socialOrganizations from "./../../config/socialOrganizations.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import urlSlug from "url-slug";
import {
  socialOrganizationConstants,
  paginationConstants,
  charityProgramConstants,
  viewPortalConstants,
} from "../../constants";
import {
  selectedOrganizationActions,
  socialOrganizationActions,
} from "../../actions";
import { Tabs, Icon } from "antd";
import { AuditOutlined, RedoOutlined } from "@ant-design/icons";
import Pagination from "./../Shared/Pagination";
import * as moment from "moment";
import { selectedOrganization } from "../../reducers/selectedOrganization.reducer";
import Loader from "../Shared/Loader";
import { Tooltip } from "antd";
import ListSocialOrganizations from "./ListSocialOrganizations";

// import Donate from "./../";
let pageSize = paginationConstants?.PAGE_SIZE;
let theArray = [];
const TabPane = Tabs.TabPane;
const SocialOrganizations = () => {
  let history = useHistory();
  const socialOrganizations = useSelector((state) => state.socialOrganizations);
  const user = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [tabType, setTabType] = useState(socialOrganizationConstants.SPONSOR);
  const currentPortal = useSelector((state) => state.currentView);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      socialOrganizationActions.getSocialOrganizations({
        employeeId: user?.emp_id,
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
      })
    );
  }, [currentPage]);
  const setPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setTotalCount(socialOrganizations?.totalCount);
  }, [socialOrganizations?.totalCount]);
  const setOrganization = (organization) => {
    console.log(">>>>>>>>>>>>>>>>>>>> ffff", organization);
    dispatch(selectedOrganizationActions.selectedOrganization(organization));
  };
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
    console.log("ddddddddddddddddddd checked start", theArray);
    if (index !== -1) {
      theArray.splice(index, 1);
    } else {
      theArray.push(id);
    }
    console.log("ddddddddddddddddddd checked end", theArray);

    // setState({items:items, allChecked: allChecked});
  };
  const changeTab = (activeKey) => {
    setTabType(activeKey);
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
                  placeholder="Search by Name"
                  className="ant-input-search"
                  type="text"
                  value=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {socialOrganizations.loading && <Loader />}
      <div className="ant-tabs-nav-wrap">
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
                  ? socialOrganizations?.items?.sponsored?.filter((charity) =>
                      isCorporatePortal ? charity : charity?.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={socialOrganizationConstants.SPONSORED}
          >
            <ListSocialOrganizations tabType={tabType} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <RedoOutlined className="fs-5" />
                {socialOrganizationConstants.OTHERS} (
                {socialOrganizations?.items?.other
                  ? socialOrganizations?.items?.other?.filter((charity) =>
                      isCorporatePortal ? charity : charity?.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={socialOrganizationConstants.OTHERS}
          >
            <ListSocialOrganizations tabType={tabType} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default SocialOrganizations;
