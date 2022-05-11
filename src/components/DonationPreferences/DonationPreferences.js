import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { donationPreferenceActions } from "../../actions/donationPreference.actions";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {
  donationPreferenceConstants,
  paginationConstants,
} from "../../constants";
import DonationConsent from "./../Shared/DonationConsent";
import Loader from "./../Shared/Loader";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import { Link } from "react-router-dom";
import Pagination from "./../Shared/Pagination";
import * as moment from "moment";
import "./../../assets/css/donationPreference.scss";
import donationsConsent from "./../../config/donationsConsent.json";

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

  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      donationPreferenceActions.getDonationPreferences({
        employeeId: employee?.emp_id,
        pageSize: pageSize,
        offset:
          currentPage >= 2
            ? currentPage * pageSize -
            pageSize
            : 0,
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
    console.log("selectedPreference", selectedPreference);
    setChecked(false);
    setOpen(false);
    setUpdatedValue();
    document
      .getElementById("amount" + selectedPreference?.employeePreferenceId)
      .reset();
    document
      .getElementById("frequency" + selectedPreference?.employeePreferenceId)
      .reset();
    // preferences?.items?.map((item) => {
    //   console.log("selectedPreference?.amount", item?.employeePreferenceId, selectedPreference?.employeePreferenceId)
    //   if (item?.employeePreferenceId === selectedPreference?.employeePreferenceId) {
    //     console.log("dddd?.amount", selectedPreference?.donationAmount)
    //     return { ...item, donationAmount: selectedPreference?.donationAmount };
    //   }})
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
        updatedValue === donationPreferenceConstants.MONTHLY ? 2 : 1;
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
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">SR No.</th>
                    <th className="ant-table-cell">Program</th>
                    <th className="ant-table-cell">Organization</th>
                    <th className="ant-table-cell">Category</th>
                    <th className="ant-table-cell">Amount</th>
                    <th className="ant-table-cell text-center">Frequency</th>
                    <th className="ant-table-cell text-center">Status</th>
                    <th className="ant-table-cell text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {preferences?.items?.length > 0 ? (
                    preferences?.items
                      ?.filter((preference) => preference?.isDeleted === false)
                      .map((preference, index) => (
                        <tr
                          key={index + 1}
                          className="ant-table-row ant-table-row-level-0"
                        >
                          <td className="ant-table-cell">{index + 1}</td>
                          <td className="ant-table-cell">
                            <span className="ant-typography font-weight-bold">
                              {preference.charityProgram}
                            </span>
                          </td>
                          <td className="ant-table-cell">
                            {preference.socialOrganization}
                          </td>
                          <td className="ant-table-cell">
                            {preference.category}
                          </td>
                          <td className="ant-table-cell">
                            <form
                              id={`amount${preference?.employeePreferenceId}`}
                            >
                              <input
                                name="amount"
                                type="text"
                                size="4"
                                maxLength={10}
                                defaultValue={preference?.donationAmount.toLocaleString()}
                                className="form-control"
                                onBlur={() =>
                                  showConsent(
                                    preference,
                                    donationPreferenceConstants.AMOUNT
                                  )
                                }
                                onInput={(e) => setUpdatedValue(e.target.value)}
                                id={`amount${preference?.employeePreferenceId}`}
                              />
                            </form>
                          </td>
                          <td className="ant-table-cell text-center">
                            <form
                              id={`frequency${preference?.employeePreferenceId}`}
                            >
                              <BootstrapSwitchButton
                                checked={
                                  updatedValue
                                    ? updatedValue
                                    : preference?.frequency === 1
                                }
                                onlabel="Once"
                                onstyle="primary"
                                offlabel="Monthly"
                                offstyle="success"
                                style="w-100 mx-1"
                                size="sm"
                                onChange={(checked) => {
                                  showConsent(
                                    preference,
                                    donationPreferenceConstants.FREQUENCY
                                  );
                                  setUpdatedValue(
                                    checked
                                      ? donationPreferenceConstants.ONCE
                                      : donationPreferenceConstants.MONTHLY
                                  );
                                }}
                              />
                            </form>
                          </td>
                          <td className="ant-table-cell text-center text-uppercase">
                            {preference?.status ===
                              donationPreferenceConstants?.SUSPENDED && (
                              <>
                                {preference?.frequency ===
                                  donationPreferenceConstants?.MONTHLY_FREQUENCY && (
                                  <span className="text-danger">Suspended</span>
                                )}
                                {preference?.frequency ===
                                  donationPreferenceConstants?.ONCE_FREQUENCY && (
                                  <span className="text-primary">
                                    Completed
                                  </span>
                                )}
                              </>
                            )}
                            {(!preference?.status ||
                              preference?.status ===
                                donationPreferenceConstants?.RESUMED) && (
                              <span className="text-success">Active</span>
                            )}
                          </td>
                          <td className="ant-table-cell text-center">
                            {preference?.status ===
                              donationPreferenceConstants?.SUSPENDED && (
                              <Link
                                onClick={() =>
                                  handleOpenDialog("Resume", preference)
                                }
                                className="mr-2"
                                title="Resume"
                              >
                                <i className="bi bi-play-circle-fill fs-5"></i>
                              </Link>
                            )}
                            {(!preference?.status ||
                              preference?.status ===
                                donationPreferenceConstants?.RESUMED) && (
                              <Link
                                onClick={() =>
                                  handleOpenDialog("Suspend", preference)
                                }
                                className="mr-2"
                                title="Suspend"
                              >
                                <i className="bi bi-pause-circle-fill fs-5"></i>
                              </Link>
                            )}
                            <Link
                              onClick={() =>
                                handleOpenDialog("Delete", preference)
                              }
                              title="Delete"
                            >
                              <i className="bi bi-trash fs-5"></i>
                            </Link>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No preferences found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        className="pagination-bar mt-4"
        currentPage={currentPage}
        totalCount={totalCount ? totalCount : 0}
        pageSize={pageSize}
        onPageChange={(page) => setPage(page)}
      />
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
