import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { donationPreferenceActions } from "../../actions/donationPreference.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  paginationConstants,
  viewPortalConstants
} from "../../constants";
import DonationConsent from "./../Shared/DonationConsent";
import Loader from "./../Shared/Loader";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import * as moment from "moment";
import "./../../assets/css/donationPreference.scss";
import donationsConsent from "./../../config/donationsConsent.json";
import { BellOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ListDonationPreferences from "./ListDonationPreferences";
import { Tabs } from "antd";
import { SearchDonationPreferenceHelper } from "../../helpers";
import DonateHeader from "../CharityPrograms/DonateHeader";
import Donate from "../CharityPrograms/Donate";

const preferenceForm = {
  employeePreferenceId: "",
  type: "",
  donationAmount: "",
  frequency: "",
  isConsentCheck: "",
  donationConsent: ""
};
const actionInitialValues = {
  isDeleted: false,
  isSuspended: false,
  suspendDuration: "",
  requestType: "",
  preferenceId: ""
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
  const [searchText, setSearchText] = useState("");
  const [getRepeatCharity, setGetRepeatCharity] = useState();
  const [selected, setSelected] = useState("");
  const [searchByEmployeeName, setSearchByEmployeeName] = useState("");
  const [searchByCorporateName, setSearchByCorporateName] = useState("");
  const [searchByProgramName, setSearchByProgramName] = useState("");
  const [searchByAmount, setSearchByAmount] = useState("");

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
    getData();
  }, [currentPage]);
  const getData = () => {
    dispatch(
      donationPreferenceActions.getDonationPreferences({
        employeeId: employee?.emp_id,
        userType: "Employee",
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0
      })
    );
  };
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
    getData();
  };

  const onHandleChange = (e) => {
    console.log("fired");
    setSearchByProgramName("");
    setSearchByEmployeeName("");
    setSearchByCorporateName("");
    setSearchByAmount("");
    setSelected(e.target.value);
  };
  const onSearchChange = (value, selected) => {
    if (selected === "programName") {
      setSearchByProgramName(value);
    } else if (selected === "employeeName") {
      setSearchByEmployeeName(value);
    } else if (selected === "corporateName") {
      setSearchByCorporateName(value);
    } else if (selected === "amount") {
      setSearchByAmount(value);
    } else {
      return null;
    }
  };
  //  const fetchResults = (dateRange) => {
  //    dispatch(
  //      transactionsHistoryActions.getDirectPayment({
  //        pageSize: pageSize,
  //        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
  //        searchByEmployeeName: searchByEmployeeName,
  //        searchByProgramName: searchByProgramName,
  //        searchByCorporateName: searchByCorporateName,
  //        searchByAmount: searchByAmount,
  //        startDate: dateRange
  //          ? moment(dateRange[0]).format("YYYY-MM-DD")
  //          : null,
  //        endDate: dateRange
  //          ? moment(dateRange[1]).add(1, "days").format("YYYY-MM-DD")
  //          : null,
  //      })
  //    );
  //  };
  //  useEffect(() => {
  //    fetchResults("");
  //  }, [
  //    searchByProgramName,
  //    searchByEmployeeName,
  //    searchByCorporateName,
  //    searchByAmount,
  //  ]);
  // const search = (value, selected) => {
  //   setSearchText(value);
  //   setSelected(selected);
  // };

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
  const setRepeatCharity = (charity) => {
    document.getElementsByClassName("sidepanel")[0].classList.add("is-open");
    setGetRepeatCharity(charity);
  };
  return (
    <div className="customContainer program-list">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">Donation Preferences</h1>
        </div>
      </div>
      <div className="ant-row searchContainer mt-3 py-4 align-center">
        <div className="col-md d-flex pl-0">
          <div className="col-md-4">
            <div>
              <select
                className="form-select"
                value={selected}
                defaultValue={""}
                onChange={(e) => onHandleChange(e)}
              >
                <option value={""} key={"default"} disabled>
                  Search by
                </option>
                <option value="programName">Program Name</option>
                {isEmployeePortal && (
                  <option value="organizationName">Organization Name</option>
                )}
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
          {selected === "programName" && (
            <div className="col-md-4">
              <div>
                <div className="ant-input-affix-wrapper inputFilterInput">
                  <span className="ant-input-prefix">
                    <i className="bi bi-search"></i>
                    <input
                      type="text"
                      className="ant-input-search"
                      placeholder="Search by Program Name"
                      onChange={(e) =>
                        onSearchChange(e.target.value, "programName")
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          )}
          {selected === "organizationName" && (
            <div className="col-md-4">
              <div>
                <div className="ant-input-affix-wrapper inputFilterInput">
                  <span className="ant-input-prefix">
                    <i className="bi bi-search"></i>
                    <input
                      type="text"
                      // className="form-control"
                      className="ant-input-search"
                      placeholder="Search by Organization Name"
                      onChange={(e) =>
                        onSearchChange(e.target.value, "organizationName")
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          )}
          {selected === "amount" && (
            <div className="col-md-4">
              <div>
                <div className="ant-input-affix-wrapper inputFilterInput">
                  <span className="ant-input-prefix">
                    <i className="bi bi-search"></i>
                    <input
                      type="text"
                      className="ant-input-search"
                      placeholder="Search by Amount"
                      onChange={(e) => onSearchChange(e.target.value, "amount")}
                    />
                  </span>
                </div>
              </div>
            </div>
          )}
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
                <BellOutlined className="fs-5" />
                {donationPreferenceConstants.ACTIVE} (
                {preferences?.items?.active
                  ? SearchDonationPreferenceHelper(
                      preferences?.items?.active,
                      searchText,
                      selected
                    ).length
                  : 0}
                )
              </span>
            }
            key={donationPreferenceConstants.ACTIVE}
          >
            <ListDonationPreferences
              tabType={tabType}
              items={
                searchText && tabType === donationPreferenceConstants.ACTIVE
                  ? SearchDonationPreferenceHelper(
                      preferences?.items?.active,
                      searchText,
                      selected
                    )
                  : preferences?.items?.active
              }
              repeatCharity={(e) => setRepeatCharity(e)}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <CheckCircleOutlined className="fs-5" />
                {donationPreferenceConstants.COMPLETED} (
                {preferences?.items?.complete
                  ? SearchDonationPreferenceHelper(
                      preferences?.items?.complete,
                      searchText
                    ).length
                  : 0}
                )
              </span>
            }
            key={donationPreferenceConstants.COMPLETED}
          >
            <ListDonationPreferences
              tabType={tabType}
              items={
                searchText && tabType === donationPreferenceConstants.COMPLETED
                  ? SearchDonationPreferenceHelper(
                      preferences?.items?.complete,
                      searchText
                    )
                  : preferences?.items?.complete
              }
              repeatCharity={(e) => setRepeatCharity(e)}
            />
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
      {
        <div id="sidepanel" className="sidepanel">
          <DonateHeader selectedCharity={getRepeatCharity} />
          <div className="tab-content pt-2">
            <div className="tab-pane fade show active give-once" id="give-once">
              <Donate
                frequency={donationPreferenceConstants.ONCE}
                selectedCharity={getRepeatCharity}
                tabType={tabType}
                repeatPreference={true}
              />
            </div>
            <div className="tab-pane fade show give-monthly" id="give-monthly">
              <Donate
                frequency={donationPreferenceConstants.MONTHLY}
                selectedCharity={getRepeatCharity}
                tabType={tabType}
                repeatPreference={true}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default DonationPreferences;
