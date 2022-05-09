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
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">Sr No.</th>
                    <th className="ant-table-cell">Program</th>
                    <th className="ant-table-cell">Organization</th>
                    <th className="ant-table-cell">Category</th>
                    <th className="ant-table-cell text-center">
                      Unit Price (
                      {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)})
                    </th>
                    <th className="ant-table-cell text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {items?.length > 0 ? (
                    items.map((charityProgram, index) => (
                      <tr
                        key={index + 1}
                        className="ant-table-row ant-table-row-level-0"
                      >
                        <td className="ant-table-cell">{index + 1}</td>
                        <td className="ant-table-cell">
                          <span className="ant-typography font-weight-bold">
                            {charityProgram?.charityName}
                          </span>
                        </td>
                        <td className="ant-table-cell">
                          {charityProgram?.soicalName}
                        </td>
                        <td className="ant-table-cell">
                          {charityProgram?.category}
                        </td>
                        <td className="ant-table-cell text-center">
                          {charityProgram?.unitPrice.toLocaleString()}
                        </td>
                        <td className="ant-table-cell text-center">
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
            </div>
          </div>
        </div>
      </div>
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
