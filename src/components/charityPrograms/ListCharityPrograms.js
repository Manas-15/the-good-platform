import React, { useState } from "react";
import "./../../assets/css/charityProgramsList.scss";
import { donationPreferenceConstants } from "../../constants";
import ReactHtmlParser from "react-html-parser";

const ListCharityPrograms = ({ items, setCharity }) => {
  const openNav = (charity) => {
    document.getElementById("sidepanel").classList.add("is-open");
    setCharity(charity);
  };
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            <th>Program</th>
            <th>Organization</th>
            <th>Category</th>
            <th className="text-center">
              Unit Price (
              {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)})
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items?.length > 0 ? (
            items.map((charityProgram, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{charityProgram?.charityName}</td>
                <td>{charityProgram?.soicalName}</td>
                <td>{charityProgram?.category}</td>
                <td className="text-center">
                  {charityProgram?.unitPrice.toLocaleString()}
                </td>
                <td className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={() => openNav(charityProgram)}
                  >
                    Donate
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No charity programs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <div className="row mb-4">
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
      </div> */}
    </>
  );
};
export default ListCharityPrograms;
