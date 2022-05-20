import React, { useState } from "react";
import "./../../assets/css/charityProgramsList.scss";
import { donationPreferenceConstants } from "../../constants";
import ReactHtmlParser from "react-html-parser";
import { Progress, Tooltip } from "antd";
import { Link } from "react-router-dom";
import urlSlug from "url-slug";

const CardCharityPrograms = ({ items, setCharity }) => {
  const openNav = (charity) => {
    document.getElementById("sidepanel").classList.add("is-open");
    setCharity(charity);
  };
  return (
    <div className="ant-row">
      <div className="ant-col ant-col-24 mt-2">
        {items?.length > 0 ? (
          <div className="row">
            {items.map((charityProgram) => (
              <div className="col-md-4 card  p-0 ml-3">
                <div className="img-sec">
                  <img
                    src="/assets/img/dummy.png"
                    alt="image"
                  />
                  <Tooltip title="80G Tax benefits available for INR donations">
                    <span className="tax-benefit">
                      Tax Benefit <i className="bi-info-circle-fill fs-6"></i>
                    </span>
                  </Tooltip>
                </div>
                <div className="description">
                  <h4>
                    <Link
                      to={{
                        pathname: `/social-organizations/programs/${urlSlug(
                          charityProgram?.charityName
                        )}`,
                        programName: charityProgram?.charityName,
                      }}
                    >
                      <span className="custom-color">{charityProgram?.charityName}</span>
                    </Link>
                  </h4>
                </div>
                <div className="founder">
                  {/* <span className="founder-short">RL</span> */}
                  <span>{charityProgram?.soicalName}</span>
                </div>
                <div className="campaign mt-2">
                  <div className="campaign-heading">
                    <span className="campaign-raised">₹10,75,010</span>{" "}
                    <span>raised out of ₹46,20,000</span>
                  </div>
                  <div
                    className="dk-progress-bar_backgroundBar__25DwK"
                    title="23% Raised"
                  >
                    <div>
                      <Progress percent={60} showInfo={false} />
                    </div>
                  </div>
                  <div className="days-donations">
                    <div className="days">
                      <i className="bi-clock fs-6"></i>
                      &nbsp;&nbsp;29 days left
                    </div>
                    <div className="donations">
                      <i className="bi-person fs-5"></i>
                      &nbsp;&nbsp;1,108 Donations
                    </div>
                  </div>
                  <div className="days-donations">
                    <button
                      type="button"
                      className={`btn button btn-outline-primary btn-outline-custom`}
                    >
                      <i className="bi bi-facebook"></i> Share
                    </button>
                    <button
                      type="button"
                      onClick={() => openNav(charityProgram)}
                      className={`btn button btn-custom`}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12 text-center">No programs found</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CardCharityPrograms;