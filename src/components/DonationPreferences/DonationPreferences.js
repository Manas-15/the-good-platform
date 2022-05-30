import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { donationPreferenceActions } from "../../actions/donationPreference.actions";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {
  donationPreferenceConstants,
  paginationConstants,
  viewPortalConstants,
} from "../../constants";
import DonationConsent from "./../Shared/DonationConsent";
import Loader from "./../Shared/Loader";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import { Link } from "react-router-dom";
import Pagination from "./../Shared/Pagination";
import * as moment from "moment";
import "./../../assets/css/donationPreference.scss";
import donationsConsent from "./../../config/donationsConsent.json";
import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import ListDonationPreferences from "./ListDonationPreferences";
import { Tabs, Icon } from "antd";
import { AuditOutlined, RedoOutlined } from "@ant-design/icons";

const preferenceForm = {
  employeePreferenceId: "",
  type: "",
  donationAmount: "",
  frequency: "",
  isConsentCheck: "",
  donationConsent: "",
};
const actionInitialValues = {
  isDeleted: false,
  isSuspended: false,
  suspendDuration: "",
  requestType: "",
  preferenceId: "",
};
let pageSize = paginationConstants?.PAGE_SIZE;
const TabPane = Tabs.TabPane;
const DonationPreferences = () => {
  let history = useHistory();
  const preferences = useSelector((state) => state.donationPreferences);
  const employee = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const [updateType, setUpdateType] = useState("");
  const [updatedValue, setUpdatedValue] = useState();
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [tabType, setTabType] = useState(donationPreferenceConstants.ACTIVE);

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
    dispatch(
      donationPreferenceActions.getDonationPreferences({
        employeeId: employee?.emp_id,
        userType: "Employee",
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
      })
    );
  }, [currentPage]);
  const handleOpenDialog = (action, item) => {
    setOpenDialog(true);
    setActionType(action);
    setSelectedPreference(item);
    actionInitialValues.suspendDuration = "";
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${
        item?.charityProgram
      }"</strong>?`
    );
  };

  const setDuration = (value) => {
    if (actionType === donationPreferenceConstants.SUSPEND) {
      actionInitialValues.suspendDuration = moment(new Date()).add(
        value,
        "months"
      );
    }
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const confirm = () => {
    handleCloseDialog();
    actionInitialValues.isDeleted =
      actionType === donationPreferenceConstants.DELETE;
    actionInitialValues.isSuspended =
      actionType === donationPreferenceConstants.SUSPEND;
    actionInitialValues.preferenceId = selectedPreference?.employeePreferenceId;
    actionInitialValues.requestType = actionType;
    dispatch(
      donationPreferenceActions.operateActionRequest(actionInitialValues)
    );
  };

  const handleCheck = () => {
    setChecked(true);
    setOpen(false);
    updateDonationPreference();
  };
  const closeCheck = (selectedPreference) => {
    setChecked(false);
    setOpen(false);
    setUpdatedValue();
    document
      .getElementById("amount" + selectedPreference?.employeePreferenceId)
      .reset();
    document
      .getElementById("frequency" + selectedPreference?.employeePreferenceId)
      .reset();
  };
  const showConsent = (preference, type) => {
    setOpen(true);
    setSelectedPreference(preference);
    setUpdateType(type);
  };
  const updateDonationPreference = () => {
    preferenceForm.employeePreferenceId =
      selectedPreference.employeePreferenceId;
    preferenceForm.type = updateType;
    if (updateType === donationPreferenceConstants.AMOUNT) {
      preferenceForm.donationAmount = updatedValue.replace(/,/g, "");
      preferenceForm.donationConsent = `${
        donationsConsent?.consent
      } [Frequency: ${
        selectedPreference?.frequency === 2
          ? donationPreferenceConstants.MONTHLY
          : donationPreferenceConstants.ONCE
      }]`;
      // preferenceForm.frequency = selectedPreference?.frequency === donationPreferenceConstants.MONTHLY ? 2 : 1;
    }
    if (updateType === donationPreferenceConstants.FREQUENCY) {
      preferenceForm.frequency =
        updatedValue === donationPreferenceConstants.MONTHLY
          ? donationPreferenceConstants.MONTHLY_FREQUENCY
          : donationPreferenceConstants.ONCE_FREQUENCY;
      preferenceForm.donationConsent = `${donationsConsent?.consent} [Frequency: ${updatedValue}]`;
    }
    preferenceForm.isConsentCheck = true;
    dispatch(
      donationPreferenceActions.updateDonationPreference(preferenceForm)
    );
  };
  if (preferences.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  const setPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setTotalCount(preferences?.totalCount);
  }, [preferences?.totalCount]);
  const changeTab = (activeKey) => {
    setTabType(activeKey);
  };
  return (
    <div className="customContainer">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">Donation Preferences</h1>
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
      {preferences.loading && <Loader />}
      <div className="ant-tabs-nav-wrap">
        <Tabs
          defaultActiveKey={donationPreferenceConstants.ACTIVE}
          onChange={changeTab}
        >
          <TabPane
            tab={
              <span>
                <AuditOutlined className="fs-5" />
                {donationPreferenceConstants.ACTIVE} (
                {preferences?.items?.sponsored
                  ? preferences?.items?.sponsored?.filter((charity) =>
                      isCorporatePortal ? charity : charity?.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={donationPreferenceConstants.ACTIVE}
          >
            <ListDonationPreferences tabType={tabType} items={preferences?.items} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <RedoOutlined className="fs-5" />
                {donationPreferenceConstants.COMPLETED} (
                {preferences?.items?.others
                  ? preferences?.items?.others?.filter((charity) =>
                      isCorporatePortal ? charity : charity?.donated === false
                    ).length
                  : 0}
                )
              </span>
            }
            key={donationPreferenceConstants.COMPLETED}
          >
            <ListDonationPreferences tabType={tabType} items={preferences?.items} />
          </TabPane>
        </Tabs>
      </div>      
      {openDialog && (
        <ConfirmationDialog
          open={true}
          actionType={actionType}
          title={actionTitle}
          content={actionContent}
          duration={setDuration}
          handleConfirm={() => {
            confirm();
          }}
          handleCancel={() => {
            handleCloseDialog();
          }}
        />
      )}
      {open && (
        <DonationConsent
          open={open}
          selectedCharity={selectedPreference}
          employee={employee}
          frequency={
            updateType === donationPreferenceConstants.FREQUENCY
              ? updatedValue
                ? updatedValue === donationPreferenceConstants.MONTHLY
                  ? donationPreferenceConstants.MONTHLY
                  : donationPreferenceConstants.ONCE
                : selectedPreference?.frequency === 2
                ? donationPreferenceConstants.MONTHLY
                : donationPreferenceConstants.ONCE
              : selectedPreference?.frequency === 2
              ? donationPreferenceConstants.MONTHLY
              : donationPreferenceConstants.ONCE
          }
          amount={
            updateType === donationPreferenceConstants.AMOUNT
              ? updatedValue
                ? updatedValue
                : selectedPreference?.donationAmount
              : selectedPreference?.donationAmount
          }
          handleCheck={handleCheck}
          closeCheck={() => closeCheck(selectedPreference)}
        />
      )}
    </div>
  );
};
export default DonationPreferences;
