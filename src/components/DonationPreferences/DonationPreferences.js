import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import charityPrograms from "../../config/charityPrograms.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Field } from "formik";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const DonationPreferences = () => {
  let history = useHistory();
  // const corporates = useSelector(state => state.corporates);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const openNav = () => {
    document.getElementById("sidepanel").classList.add("is-open");
  };
  const closeNav = () => {
    document.getElementById("sidepanel").classList.remove("is-open");
  };
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Donation Preferences</h4>
        </div>
      </div>
      {/* {corporates.loading && <em>Loading charity programs...</em>} */}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            <th>Charity Program Name</th>
            <th>Social Organization</th>
            <th>Cause</th>
            <th>Amount</th>
            <th className="text-center">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {charityPrograms ? (
            charityPrograms.map((charityProgram, index) => (
              <tr key={index + 1}>
                <td scope="row">{index + 1}</td>
                <td>{charityProgram.cause}</td>
                <td>{charityProgram.socialOrganization}</td>
                <td>{charityProgram.category}</td>
                <td>
                  <input
                    name="amount"
                    type="text"
                    size="4"
                    maxLength={10}
                    defaultValue={charityProgram.amount}
                    className="form-control"
                  />
                </td>
                <td className="text-center">
                  <BootstrapSwitchButton
                    checked={charityProgram.frequency}
                    onlabel="Once"
                    onstyle="primary"
                    offlabel="Monthly"
                    offstyle="success"
                    style="w-100 mx-1"
                    size="sm"
                    onChange={(checked) => {
                      console.log("checked ............", checked);
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
      <div className="row">
        <div className="col-md-12 text-right">
          <Button variant="primary" onClick={""}>
            Confirm Donation Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DonationPreferences;
