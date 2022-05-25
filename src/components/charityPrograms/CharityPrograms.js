import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Donate from "./Donate";
import "./../../assets/css/charityProgramsList.scss";
import {
  donationPreferenceConstants,
  viewPortalConstants,
  charityProgramConstants,
  payrollConstants,
} from "./../../constants";
import { charityProgramActions } from "./../../actions";
import ListCharityPrograms from "./ListCharityPrograms";
import CardCharityPrograms from "./CardCharityPrograms";
import { Tabs, Icon } from "antd";
import { AuditOutlined, RedoOutlined } from "@ant-design/icons";
import DonateHeader from "./DonateHeader";
const TabPane = Tabs.TabPane;

const CharityPrograms = () => {
  let history = useHistory();
  const charityPrograms = useSelector((state) => state.charityPrograms);
  const selectedOrganizationId = useSelector(
    (state) => state.selectedOrganization
  );
  const [selectedCharity, setSelectedCharity] = useState();
  const [tabType, setTabType] = useState(charityProgramConstants.SPONSOR);
  const user = useSelector((state) => state.employee.user);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const selectedOrganization = useSelector(
    (state) => state.selectedOrganization
  );

  const [currentView, setCurrentView] = useState(
    charityProgramConstants.LIST_VIEW
  );
  const [selectedCategory, setSelectedCategory] = useState(
    charityProgramConstants.ALL_CATEGORY
  );
  const dispatch = useDispatch();
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const openNav = () => {
    document.getElementById("sidepanel").classList.add("is-open");
  };
  const closeNav = () => {
    document.getElementById("sidepanel").classList.remove("is-open");
    setSelectedCharity(null);
  };
  useEffect(() => {
    dispatch(
      charityProgramActions.getCharityPrograms(
        isCorporatePortal
          ? {
              corporateId: selectedCorporate?.corporate?.corporateId,
              socialId: selectedOrganization?.id,
              userType: payrollConstants.CORPORATE_VIEW,
            }
          : {
              uuid: user?.uuid,
              socialId: selectedOrganization?.id,
              userType: payrollConstants.EMPLOYEE_VIEW,
            }
      )
    );
  }, []);
  const setCharity = (charity) => {
    setSelectedCharity(charity);
  };
  const setType = (type) => {
    setTabType(type);
    closeNav();
  };
  const changeTab = (activeKey) => {
    closeNav();
    setTabType(activeKey);
  };
  if (charityPrograms.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  return (
    <div className="customContainer program-list">
      <div className="row mb-4">
        <div className="col-md-12">
          <h1 className="ant-typography customHeading">
            Social Organizations/Charity Programs
          </h1>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12 text-right">
          <button
            type="button"
            className={`${
              currentView === charityProgramConstants.LIST_VIEW ? "active" : ""
            } btn btn-sm btn-outline-primary btn-outline-custom mr-3`}
            onClick={() => setCurrentView(charityProgramConstants.LIST_VIEW)}
          >
            <i className="bi bi-grid-3x3-gap"></i> List View
          </button>
          <button
            type="button"
            className={`${
              currentView === charityProgramConstants.PROGRESS_VIEW
                ? "active"
                : ""
            } btn btn-sm  btn-outline-primary btn-outline-custom`}
            onClick={() =>
              setCurrentView(charityProgramConstants.PROGRESS_VIEW)
            }
          >
            <i className="bi bi-card-heading"></i> Progress view
          </button>
        </div>
      </div>
      <div className="ant-row searchContainer mt-3 py-4 px-4 align-center">
        <div className="ant-col ant-col-24  searchContainer">
          <div className="ant-col ant-col-4">
            <div className="ant-input-affix-wrapper inputFilterInput">
              <span className="ant-input-prefix">
                <i className="bi bi-search"></i>
                <input
                  placeholder="Search by Program Name"
                  className="ant-input-search"
                  type="text"
                  value=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h5>Categories</h5>
      </div>
      <div className="row mb-4">
        <div className="col">
          <div
            className={`categotyButton`}
            onClick={() =>
              setSelectedCategory(charityProgramConstants.ALL_CATEGORY)
            }
          >
            <label
              className={`${
                selectedCategory === charityProgramConstants.ALL_CATEGORY
                  ? "active"
                  : ""
              } ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
            >
              <span>
                <span className="bi-border-all"></span>{" "}
                {charityProgramConstants.ALL_CATEGORY}
              </span>
            </label>
          </div>
        </div>
        <div className="col">
          <div
            className={`categotyButton`}
            onClick={() =>
              setSelectedCategory(charityProgramConstants.WOMEN_CATEGORY)
            }
          >
            <label
              className={`${
                selectedCategory === charityProgramConstants.WOMEN_CATEGORY
                  ? "active"
                  : ""
              } ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
            >
              <span>
                <img src="/assets/img/women.png" />{" "}
                {charityProgramConstants.WOMEN_CATEGORY}
              </span>
            </label>
          </div>
        </div>
        <div className="col">
          <div
            className={`categotyButton`}
            onClick={() =>
              setSelectedCategory(charityProgramConstants.YOUTH_CATEGORY)
            }
          >
            <label
              className={`${
                selectedCategory === charityProgramConstants.YOUTH_CATEGORY
                  ? "active"
                  : ""
              } ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
            >
              <span>
                <img src="/assets/img/youth.png" />{" "}
                {charityProgramConstants.YOUTH_CATEGORY}
              </span>
            </label>
          </div>
        </div>
        <div className="col">
          <div
            className={`categotyButton`}
            onClick={() =>
              setSelectedCategory(charityProgramConstants.ELDERLY_CATEGORY)
            }
          >
            <label
              className={`${
                selectedCategory === charityProgramConstants.ELDERLY_CATEGORY
                  ? "active"
                  : ""
              } ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
            >
              <span>
                <img src="/assets/img/elderly.png" />{" "}
                {charityProgramConstants.ELDERLY_CATEGORY}
              </span>
            </label>
          </div>
        </div>
        <div className="col">
          <div
            className={`categotyButton`}
            onClick={() =>
              setSelectedCategory(charityProgramConstants.CHILDREN_CATEGORY)
            }
          >
            <label
              className={`${
                selectedCategory === charityProgramConstants.CHILDREN_CATEGORY
                  ? "active"
                  : ""
              } ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
            >
              <span>
                <img src="/assets/img/children.png" />{" "}
                {charityProgramConstants.CHILDREN_CATEGORY}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="ant-tabs-nav-wrap">
        <Tabs
          defaultActiveKey={charityProgramConstants.SPONSOR}
          onChange={changeTab}
        >
          <TabPane
            tab={
              <span>
                <AuditOutlined className="fs-5" />
                {charityProgramConstants.SPONSORED} (
                {charityPrograms?.items?.sponsored
                  ? charityPrograms?.items?.sponsored?.filter((charity) =>
                      isCorporatePortal ? charity : charity?.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={charityProgramConstants.SPONSOR}
          >
            {currentView === charityProgramConstants.LIST_VIEW && (
              <ListCharityPrograms
                items={charityPrograms?.items?.sponsored?.filter((charity) =>
                  isCorporatePortal ? charity : charity?.donated === false
                )}
                setCharity={setCharity}
                tabType={tabType}
              />
            )}
            {currentView === charityProgramConstants.PROGRESS_VIEW && (
              <CardCharityPrograms
                items={charityPrograms?.items?.sponsored?.filter((charity) =>
                  isCorporatePortal ? charity : charity?.donated === false
                )}
                setCharity={setCharity}
                tabType={tabType}
              />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <RedoOutlined className="fs-5" />
                {charityProgramConstants.OTHERS} (
                {charityPrograms?.items?.other
                  ? charityPrograms?.items?.other?.filter((charity) =>
                      isCorporatePortal ? charity : charity?.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={charityProgramConstants.OTHER}
          >
            {currentView === charityProgramConstants.LIST_VIEW && (
              <ListCharityPrograms
                items={charityPrograms?.items?.other?.filter((charity) =>
                  isCorporatePortal ? charity : charity?.donated === false
                )}
                setCharity={setCharity}
                tabType={tabType}
              />
            )}
            {currentView === charityProgramConstants.PROGRESS_VIEW && (
              <CardCharityPrograms
                items={charityPrograms?.items?.other?.filter((charity) =>
                  isCorporatePortal ? charity : charity?.donated === false
                )}
                setCharity={setCharity}
                tabType={tabType}
              />
            )}
          </TabPane>
        </Tabs>
      </div>
      {
        <div id="sidepanel" className="sidepanel">
          <DonateHeader />
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
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default CharityPrograms;
