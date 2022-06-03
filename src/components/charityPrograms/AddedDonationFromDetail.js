import React, { useState } from "react";
import "./../../assets/css/charityProgramsList.scss";
import { donationPreferenceConstants } from "../../constants";
import ReactHtmlParser from "react-html-parser";
import { Progress, Tooltip } from "antd";
import { Link } from "react-router-dom";
import urlSlug from "url-slug";
import {
  selectedCharityActions,
  selectedCharityTabActions,
} from "./../../actions";
import { useDispatch } from "react-redux";

const AddedDonationFromDetail = ({ charity, selectedAmount, frequency }) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>> charity", charity, frequency);
  const dispatch = useDispatch();
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center">
          <span className="bi-check-circle-fill fs-1 text-success"></span>
          <h3 className="text-success">Added Successfully</h3>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12 p-3">
          <div className="row mb-3">
            <div className="col-md-5 pr-0">
              <strong>Charity Name:</strong>
            </div>
            <div className="col-md-7 pl-0">{charity?.charityName}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-5 pr-0">
              <strong>Organization Name:</strong>
            </div>
            <div className="col-md-7 pl-0">{charity?.soicalName}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-5 pr-0">
              <strong>Category:</strong>
            </div>
            <div className="col-md-7 pl-0">{charity?.category}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-5 pr-0">
              <strong>Amount:</strong>
            </div>
            <div className="col-md-7 pl-0">&#8377;{selectedAmount}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-5 pr-0">
              <strong>Frequency:</strong>
            </div>
            <div className="col-md-7 pl-0">{frequency}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddedDonationFromDetail;
