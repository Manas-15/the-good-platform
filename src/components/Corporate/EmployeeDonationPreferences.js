import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { donationPreferenceActions } from "../../actions/donationPreference.actions";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { donationPreferenceConstants } from "../../constants";
import DonationConsent from "./../Shared/DonationConsent";
import Loader from "./../Shared/Loader";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import { Link } from "react-router-dom";
import Pagination from "./../Shared/Pagination";
import * as moment from "moment";
import ReactHtmlParser from "react-html-parser";

const preferenceForm = {
  employeePreferenceId: "",
  type: "",
  donationAmount: "",
  frequency: "",
  isConsentCheck: "",
};
const actionInitialValues = {
  isDeleted: false,
  isSuspended: false,
  suspendDuration: moment(new Date()).add(4, 'months'),
  requestType: "",
  preferenceId: "",
};
let PageSize = 10;
const EmployeeDonationPreferences = () => {
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const currentTableData = useMemo(async () => {
    console.log("1111111111111111 currentPage", currentPage)
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    // return fetchData();
    // return preferences?.items?.slice(firstPageIndex, lastPageIndex);
    // useEffect(() => {
      // dispatch(
        return await dispatch(donationPreferenceActions.getDonationPreferences({
          page: currentPage,
          limit: PageSize,
          offset: currentPage === 1 ? 0 : (currentPage * 10),
        }))
      // );
    // }, []);
  }, [currentPage]);

  
  const handleOpenDialog = (action, item) => {
    setOpenDialog(true);
    setActionType(action);
    setSelectedPreference(item);
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${
        item?.charityProgram
      }"</strong>?`
    );
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const confirm = () => {
    handleCloseDialog();
    actionInitialValues.isDeleted = actionType === donationPreferenceConstants.DELETE;
    actionInitialValues.isSuspended = actionType === donationPreferenceConstants.SUSPEND;
    actionInitialValues.preferenceId = selectedPreference?.employeePreferenceId;
    actionInitialValues.requestType = actionType;
    dispatch(donationPreferenceActions.operateActionRequest(actionInitialValues));
  };
 
  const handleCheck = () => {
    setChecked(true);
    setOpen(false);
    updateDonationPreference();
  };
  const closeCheck = () => {
    setChecked(false);
    setOpen(false);
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
      preferenceForm.donationAmount = updatedValue;
    }
    if (updateType === donationPreferenceConstants.FREQUENCY) {
      preferenceForm.frequency =
        updatedValue === donationPreferenceConstants.MONTHLY ? 1 : 2;
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
  console.log("currentTableData >>>>>>>>>>>>>>>>>>>>>>>>", currentTableData)
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Donation Preference</h4>
        </div>
      </div>
      {preferences.loading && <Loader />}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Program</th>
            <th>Social Organization</th>
            <th>Amount ({ReactHtmlParser(donationPreferenceConstants?.CURRENCY)})</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {preferences ? (
            preferences?.items?.filter((preference) => preference?.isDeleted == false).map((preference, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{preference.charityProgram}</td>
                <td>{preference.socialOrganization}</td>
                <td>{preference.category}</td>
                <td>
                  <input
                    name="amount"
                    type="text"
                    size="4"
                    maxLength={10}
                    defaultValue={preference.donationAmount}
                    className="form-control"
                    onBlur={() =>
                      showConsent(
                        preference,
                        donationPreferenceConstants.AMOUNT
                      )
                    }
                    onInput={(e) => setUpdatedValue(e.target.value)}
                  />
                </td>
                <td className="text-center">
                  <BootstrapSwitchButton
                    checked={
                      updatedValue ? updatedValue : preference.frequency === 2
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
                </td>
                <td className="text-center">
                  {preference?.isSuspended ? "Suspended" : "Active"}
                </td>
                <td className="text-center">
                  {preference?.is_suspended &&
                    <Link
                      onClick={() => handleOpenDialog("Resume", preference)}
                      className="mr-2"
                      title="Resume"
                    >
                      <i className="bi bi-play-circle-fill fs-5"></i>
                    </Link>
                  }
                  {!preference?.is_suspended &&
                    <Link
                      onClick={() => handleOpenDialog("Suspend", preference)}
                      className="mr-2"
                      title="Suspend"
                    >
                      <i className="bi bi-pause-circle-fill fs-5"></i>
                    </Link>
                  }
                  <Link
                    onClick={() => handleOpenDialog("Delete", preference)}
                    title="Delete"
                  >
                    <i className="bi bi-trash fs-5"></i>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No preferences found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={100}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      {openDialog && (
        <ConfirmationDialog
          open={true}
          actionType={actionType}
          title={actionTitle}
          content={actionContent}
          handleConfirm={() => {
            confirm();
          }}
          handleCancel={() => {
            handleCloseDialog();
          }}
        />
      )}
    </div>
  );
};
export default EmployeeDonationPreferences;
