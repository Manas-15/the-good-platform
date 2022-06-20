import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  viewPortalConstants
} from "../../constants";
import { history } from "../../helpers";

const preferenceForm = {
  corporateId: "",
  employeeId: "",
  charityProgramId: "",
  socialOrganizationId: "",
  donationAmount: "",
  frequency: "",
  isConsentCheck: "",
  donationConsent: ""
};
const DonateHeader = ({ frequency, tabType, selectedCharity }) => {
  const employee = useSelector((state) => state.employee.user);
  const currentView = useSelector((state) => state.currentView);
  // const [selectedCharity, setSelectedCharity] = useState();
  const [val, setVal] = useState();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showNextStep, setShowNextStep] = useState(false);
  const [activeFrequenctTab, setActiveFrequenctTab] = useState(
    donationPreferenceConstants.ONCE
  );
  const isOrganizationView =
    currentView?.currentView === viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;
  const closeNav = () => {
    document.getElementById("sidepanel").classList.remove("is-open");
    // setSelectedCharity(null);
  };
  const isProgramDetail = history.location.pathname.includes("/programs/");
  useEffect(() => {
    if (selectedCharity) {
      setActiveFrequenctTab(
        selectedCharity?.frequency ===
          donationPreferenceConstants.MONTHLY_FREQUENCY
          ? donationPreferenceConstants.MONTHLY
          : donationPreferenceConstants.ONCE
      );
    }
  }, [selectedCharity]);
  return (
    <>
      <div
        className={`${
          isProgramDetail ? "donate-header-program-detail" : "donate-header"
        }`}
      >
        <div className="row">
          <div className="col-md-10 p-2">
            <span className="pl-3">
              You can make a big difference to their lives?
            </span>
          </div>
          {!isProgramDetail && (
            <div className="col-md-2">
              <a href="#" className="closebtn" onClick={closeNav}>
                ×
              </a>
            </div>
          )}
        </div>
        <ul className="nav nav-tabs nav-tabs-bordered">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeFrequenctTab === donationPreferenceConstants.ONCE
                  ? "active"
                  : ""
              }`}
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
              className={`nav-link ${
                activeFrequenctTab === donationPreferenceConstants.MONTHLY
                  ? "active"
                  : ""
              }`}
              data-bs-toggle="tab"
              data-bs-target="#give-monthly"
              onClick={() =>
                setActiveFrequenctTab(donationPreferenceConstants.MONTHLY)
              }
            >
              <span>Give Monthly</span>
              {activeFrequenctTab === donationPreferenceConstants.MONTHLY && (
                <span className="bi-check-circle-fill fs-6 ml-2 text-success"></span>
              )}
            </button>
          </li>
          {/* )} */}
        </ul>
      </div>
    </>
  );
};
export default DonateHeader;
