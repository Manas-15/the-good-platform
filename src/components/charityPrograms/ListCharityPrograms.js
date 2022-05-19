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
                            className="btn btn-custom btn-sm"
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
              {/* {items?.length === 0 && (
                <div className="row">
                  <div className="col-md-4 card p-0">
                    <div className="img-sec">
                      <img
                        src="https://dkprodimages.gumlet.io/campaign/cover/Support-Mark1283685362.jpg"
                        alt="image"
                      />
                    </div>
                    <div className="description">
                      <h4>
                        This 63 Year Old Is Working Relentlessly To Feed Warm
                        Meals To Senior Citizens
                      </h4>
                    </div>
                    <div className="founder">
                      <span className="founder-short">RL</span>
                      <span>By Rahul</span>
                    </div>
                    <div class="campaign">
                      <div class="campaign-heading">
                        <span class="campaign-raised">₹10,75,010</span>{" "}
                        <span>raised out of ₹46,20,000</span>
                      </div>
                      <div
                        class="dk-progress-bar_backgroundBar__25DwK"
                        title="23% Raised"
                      >
                        <div class="dk-progress-bar_progressBar__3NzxJ">
                          <div class="dk-progress-bar_animatedProgressBar__3NDGy"></div>
                        </div>
                      </div>
                      <div class="campaign-card_statsWrapper__eFgvz">
                        <div class="campaign-card_daysLeft__JraZG">
                          <img
                            src=""
                            width="16"
                            loading="lazy"
                            class="gm-observing gm-observing-cb"
                          />{" "}
                          29 days left
                        </div>
                        <div class="campaign-card_stats__3_5AK">
                          <img src="" />
                          &nbsp;&nbsp;1,108 Backers
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 card p-0">dddd</div>
                  <div className="col-md-4 card p-0">vvv</div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListCharityPrograms;
