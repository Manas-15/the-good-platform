import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {donationPreferenceActions} from "../../actions/donationPreference.actions";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { donationPreferenceConstants } from "../../constants";
import DonationConsent from "./../Shared/DonationConsent";
import Loader from "./../Shared/Loader";

const DonationPreferences = () => {
  let history = useHistory();
  const preferences = useSelector(state => state.donationPreferences);
  const employee = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(donationPreferenceActions.getDonationPreferences());
  }, []);
  const handleCheck = () => {
    setChecked(true);
    setOpen(false);
  };
  const closeCheck = () => {
    setChecked(false);
    setOpen(false);
  };
  const showConsent = (preference) =>{
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@ preference", preference)
    setOpen(true);
    setSelectedPreference(preference);
  }
  if(preferences.loading){
    document.getElementById("root").classList.add("loading");
  }else{
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
                    onBlur={()=>showConsent(preference)}
                  />
                </td>
                <td className="text-center">
                  <BootstrapSwitchButton
                    checked={preference.frequency === 1}
                    onlabel="Once"
                    onstyle="primary"
                    offlabel="Monthly"
                    offstyle="success"
                    style="w-100 mx-1"
                    size="sm"
                    onChange={(checked) => {
                      console.log("checked ............", checked);
                      showConsent(preference)
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
      {open && (
        <DonationConsent open={open} selectedCharity={selectedPreference?.charityProgram} employee={employee} frequency={selectedPreference?.frequency} handleCheck={handleCheck} closeCheck={closeCheck}/>
      )}
    </div>
  );
};
export default DonationPreferences;
