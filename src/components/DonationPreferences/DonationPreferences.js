import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { donationPreferenceActions } from "../../actions/donationPreference.actions";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { donationPreferenceConstants } from "../../constants";
import DonationConsent from "./../Shared/DonationConsent";
import Loader from "./../Shared/Loader";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
const preferenceForm = {
  employeePreferenceId: "",
  type: "",
  donationAmount: "",
  frequency: "",
  isConsentCheck: "",
};
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
  const dispatch = useDispatch();
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
    // actionInitialValues.userId = selectedCorporate.userId;
    // actionInitialValues.requestType = actionType;
    // dispatch(corporateActions.corporateAccountRequest(actionInitialValues));
  };
  useEffect(() => {
    dispatch(
      donationPreferenceActions.getDonationPreferences({
        employeeId: employee?.emp_id,
      })
    );
  }, []);
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
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Donation Preferences</h4>
        </div>
      </div>
      {preferences.loading && <Loader />}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            <th>Charity Program Name</th>
            <th>Social Organization</th>
            <th>Category</th>
            <th>Amount</th>
            <th className="text-center">Frequency</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {preferences?.items ? (
            preferences?.items.map((preference, index) => (
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
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <span className="bi-three-dots"></span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow actions">
                    <li
                      className="dropdown-header text-start"
                      onClick={() => handleOpenDialog("Suspend", preference)}
                    >
                      <span className="bi-check-circle"> Suspend</span>
                    </li>
                    <li
                      className="dropdown-header text-start"
                      onClick={() => handleOpenDialog("Delete", preference)}
                    >
                      <span className="bi-x-circle"> Delete</span>
                    </li>
                  </ul>
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
      <div className="row mb-4">
        <div className="col-md-6">
          <p>Showing 1 to 10 of 20 records</p>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <nav aria-label="Page navigation example" className="d-inline-block">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {openDialog && (
        <ConfirmationDialog
          open={true}
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
      {open && (
        <DonationConsent
          open={open}
          selectedCharity={selectedPreference?.charityProgram}
          employee={employee}
          frequency={selectedPreference?.frequency}
          handleCheck={handleCheck}
          closeCheck={closeCheck}
        />
      )}
    </div>
  );
};
export default DonationPreferences;
