import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Donate from "./Donate";
import "./../../assets/css/charityProgramsList.scss";
import {
  donationPreferenceConstants,
  viewPortalConstants,
} from "./../../constants";
import { charityProgramConstants } from "./../../constants";
import { charityProgramActions } from "./../../actions";
import ListCharityPrograms from "./ListCharityPrograms";
import CardCharityPrograms from "./CardCharityPrograms";
import { Tabs, Icon } from "antd";
import { AuditOutlined, RedoOutlined } from "@ant-design/icons";
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
  const [activeFrequenctTab, setActiveFrequenctTab] = useState(
    donationPreferenceConstants.ONCE
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
              corporateId: selectedCorporate?.id,
              socialId: selectedOrganization?.id,
            }
          : { uuid: user?.uuid, socialId: selectedOrganization?.id }
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
              currentView === charityProgramConstants.CARD_VIEW ? "active" : ""
            } btn btn-sm  btn-outline-primary btn-outline-custom`}
            onClick={() => setCurrentView(charityProgramConstants.CARD_VIEW)}
          >
            <i className="bi bi-card-heading"></i> Card View
          </button>
        </div>
      </div>
      <div className="ant-row searchContainer mt-3 py-4 px-4 align-center">
        <div className="ant-col ant-col-24  searchContainer">
          <div className="ant-col ant-col-8">
            <div className="ant-input-affix-wrapper inputFilterInput">
              <span className="ant-input-prefix">
                <i className="bi bi-search"></i>
                <input
                  placeholder="Search by Program"
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
                {charityPrograms?.items
                  ? charityPrograms?.items?.sponser?.filter(
                      (charity) => charity.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={charityProgramConstants.SPONSOR}
          >
            {currentView === charityProgramConstants.LIST_VIEW && (
              <ListCharityPrograms
                items={charityPrograms?.items?.sponser?.filter(
                  (charity) => charity.donated === false
                )}
                setCharity={setCharity}
              />
            )}
            {currentView === charityProgramConstants.CARD_VIEW && (
              <CardCharityPrograms
                items={charityPrograms?.items?.sponser?.filter(
                  (charity) => charity.donated === false
                )}
                setCharity={setCharity}
              />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <RedoOutlined className="fs-5" />
                {charityProgramConstants.OTHERS} (
                {charityPrograms?.items
                  ? charityPrograms?.items?.other?.filter(
                      (charity) => charity.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={charityProgramConstants.OTHER}
          >
            {currentView === charityProgramConstants.LIST_VIEW && (
              <ListCharityPrograms
                items={charityPrograms?.items?.other?.filter(
                  (charity) => charity.donated === false
                )}
                setCharity={setCharity}
              />
            )}
            {currentView === charityProgramConstants.CARD_VIEW && (
              <CardCharityPrograms
                items={charityPrograms?.items?.other?.filter(
                  (charity) => charity.donated === false
                )}
                setCharity={setCharity}
              />
            )}
          </TabPane>
        </Tabs>
      </div>
      {
        <div id="sidepanel" className="sidepanel">
          <div className="donate-header">
            <div className="row">
              <div className="col-md-10 p-2">
                <span className="pl-3">
                  You can make a big difference to their lives?
                </span>
              </div>
              <div className="col-md-2">
                <a
                  href="javascript:void(0)"
                  className="closebtn"
                  onClick={closeNav}
                >
                  ×
                </a>
              </div>
            </div>
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#give-once"
                  onClick={() =>
                    setActiveFrequenctTab(donationPreferenceConstants.ONCE)
                  }
                >
                  <span>Give Once</span>
                  {activeFrequenctTab === donationPreferenceConstants.ONCE && (
                    <span className="bi-check-circle-fill fs-6 ml-2 text-success"></span>
                  )}
                </button>
              </li>
              {/* {tabType === charityProgramConstants.SPONSOR && ( */}
              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#give-monthly"
                  onClick={() =>
                    setActiveFrequenctTab(donationPreferenceConstants.MONTHLY)
                  }
                >
                  <span>Give Monthly</span>
                  {activeFrequenctTab ===
                    donationPreferenceConstants.MONTHLY && (
                    <span className="bi-check-circle-fill fs-6 ml-2 text-success"></span>
                  )}
                </button>
              </li>
              {/* )} */}
            </ul>
          </div>
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
