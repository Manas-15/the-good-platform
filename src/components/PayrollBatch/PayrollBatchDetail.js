import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  payrollConstants,
  paginationConstants,
} from "../../constants";
import { Link } from "react-router-dom";
import * as moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Accordion } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "./../../assets/css/payroll.scss";
import "react-datepicker/dist/react-datepicker.css";
import { ProcessHelper, history } from "./../../helpers";
import { payrollSettingActions } from "../../actions/payrollSetting.actions";

const actionInitialValues = {
  preferenceId: "",
};
let PageSize = paginationConstants?.PAGE_SIZE;
let accordionData, isCorporateView;
const PayrollBatchDetail = (props) => {
  // let history = useHistory();
  const preferences = useSelector((state) => state?.payrollSetting?.items);
  const batchId = props?.batchId;
  const employee = useSelector((state) => state.employee.user);
  const [isBatchView, setIsBatchView] = useState(false);
  const [currentView, setCurrentView] = useState(
    payrollConstants.EMPLOYEE_VIEW
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(payrollSettingActions.getBatchDetail({ batchId: props?.batchId }));
  }, [props?.batchId]);
  const groupBy = (key) => {
    return preferences?.reduce(function (acc, item) {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  };
  if (currentView === payrollConstants.ORGANIZATION_VIEW) {
    accordionData = groupBy("socialOrganization");
  } else if (currentView === payrollConstants.PROGRAM_VIEW) {
    accordionData = groupBy("charityProgram");
  } else if (currentView === payrollConstants.CORPORATE_VIEW) {
    accordionData = groupBy("corporateName");
  } else {
    accordionData = groupBy("employeeName");
  }
  useEffect(() => {
    isCorporateView = history.location.pathname !== "/admin-payroll-batch";
    setCurrentView(
      isCorporateView
        ? payrollConstants.EMPLOYEE_VIEW
        : payrollConstants.CORPORATE_VIEW
    );
  }, [history?.location?.pathname]);
  console.log("isCorporateView ccccccc", accordionData);
  return (
    <div className="customContainer">
      <div className="row mb-4">
        <div className="col-md-12">
          <Link onClick={() => props?.hideBatchDetail(false)}>
            <i className="bi bi-arrow-90deg-left fs-6">&nbsp;Back</i>
          </Link>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-7">
          <h1 className="ant-typography customHeading">
            Payroll Batch Detail -{" "}
            {moment(preferences[0]?.batchDate).format("MMM YYYY")}
          </h1>
        </div>
      </div>
      <div className="row mb-b payroll ">
        <div className="col-md-12 text-right">
          {preferences && (
            <CSVLink
              data={preferences?.map(
                ({
                  employeePreferenceId,
                  isDeleted,
                  employeeId,
                  status,
                  isConsentCheck,
                  frequency,
                  ...rest
                }) => ({ ...rest })
              )}
              filename={"Payroll"}
              className="mr-4 text-decoration-underline"
            >
              <span>Export to CSV</span>
            </CSVLink>
          )}
          <Link
            className="fs-6 text-decoration-underline mr-3"
            onClick={() => setCurrentView(payrollConstants.PROGRAM_VIEW)}
          >
            <button
              type="button"
              className={`${
                currentView === payrollConstants.PROGRAM_VIEW ? "active" : ""
              } btn btn-sm btn-outline-primary btn-outline-custom`}
            >
              Program View
            </button>
          </Link>
          {isCorporateView && (
            <Link
              className="fs-6 text-decoration-underline mr-3"
              onClick={() => setCurrentView(payrollConstants.EMPLOYEE_VIEW)}
            >
              <button
                type="button"
                className={`${
                  currentView === payrollConstants.EMPLOYEE_VIEW ? "active" : ""
                } btn btn-sm  btn-outline-primary btn-outline-custom`}
              >
                Employee View
              </button>
            </Link>
          )}
          {!isCorporateView && (
            <Link
              className="fs-6 text-decoration-underline mr-3"
              onClick={() => setCurrentView(payrollConstants.CORPORATE_VIEW)}
            >
              <button
                type="button"
                className={`${
                  currentView === payrollConstants.CORPORATE_VIEW
                    ? "active"
                    : ""
                } btn btn-sm  btn-outline-primary btn-outline-custom`}
              >
                Corporate View
              </button>
            </Link>
          )}
          <Link
            className="fs-6 text-decoration-underline"
            onClick={() => setCurrentView(payrollConstants.ORGANIZATION_VIEW)}
          >
            <button
              type="button"
              className={`${
                currentView === payrollConstants.ORGANIZATION_VIEW
                  ? "active"
                  : ""
              } btn btn-sm btn-outline-primary btn-outline-custom`}
            >
              Social Organization View
            </button>
          </Link>
          {/* )} */}
        </div>
      </div>
      {accordionData ? (
        <>
          {Object.keys(accordionData).map((type, index) => (
            <div className="row mt-4">
              {ProcessHelper(accordionData[type], batchId)?.length > 0 ? (
                <Accordion defaultActiveKey={index} className="Payroll">
                  <Accordion.Item eventKey={0}>
                    <Accordion.Header>
                      {type}{" "}
                      {currentView === payrollConstants.EMPLOYEE_VIEW &&
                        ` - ${accordionData[type][0]?.employeeUid}`}
                      {currentView === payrollConstants.PROGRAM_VIEW &&
                        ` - ${accordionData[type][0]?.socialOrganization}`}
                      &nbsp;&#45;&nbsp;
                      {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                      {accordionData[type]
                        ? ProcessHelper(accordionData[type], batchId)
                            ?.reduce(
                              (total, currentValue) =>
                                (total = total + currentValue.donationAmount),
                              0
                            )
                            .toLocaleString()
                        : 0}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="ant-row">
                        <div className="ant-col ant-col-24 mt-2">
                          <div className="ant-table-wrapper">
                            <div className="ant-table">
                              <table>
                                <thead className="ant-table-thead">
                                  <tr>
                                    <th className="ant-table-cell">Sr No.</th>
                                    {(currentView ===
                                      payrollConstants.ORGANIZATION_VIEW ||
                                      currentView ===
                                        payrollConstants.PROGRAM_VIEW) && (
                                      <th className="ant-table-cell">
                                        Employee Name
                                      </th>
                                    )}
                                    {(currentView ===
                                      payrollConstants.ORGANIZATION_VIEW ||
                                      currentView ===
                                        payrollConstants.PROGRAM_VIEW) && (
                                      <th className="ant-table-cell">
                                        Employee ID
                                      </th>
                                    )}
                                    {currentView !==
                                      payrollConstants.PROGRAM_VIEW && (
                                      <th>Program</th>
                                    )}
                                    {currentView ===
                                      payrollConstants.EMPLOYEE_VIEW || currentView ===
                                      payrollConstants.CORPORATE_VIEW && (
                                      <th className="ant-table-cell">
                                        Organization
                                      </th>
                                    )}
                                    {/* <th className="text-center">Status</th> */}
                                    <th className="ant-table-cell">
                                      Amount (
                                      {ReactHtmlParser(
                                        donationPreferenceConstants?.CURRENCY
                                      )}
                                      )
                                    </th>
                                    {!batchId && (
                                      <th className="ant-table-cell text-center">
                                        Actions
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="ant-table-tbody">
                                  {accordionData[type]
                                    .filter((preference) =>
                                      batchId
                                        ? preference
                                        : !preference?.batchId &&
                                          (preference?.status ===
                                            donationPreferenceConstants?.RESUMED ||
                                            preference?.status === null)
                                    )
                                    .map((preference, i) => (
                                      <tr
                                        key={index + 1}
                                        className="ant-table-row ant-table-row-level-0"
                                      >
                                        <td className="ant-table-cell">
                                          {i + 1}
                                        </td>
                                        {(currentView ===
                                          payrollConstants.ORGANIZATION_VIEW ||
                                          currentView ===
                                            payrollConstants.PROGRAM_VIEW) && (
                                          <td className="ant-table-cell">
                                            <span className="ant-typography font-weight-bold">
                                              {preference?.employeeName}
                                            </span>
                                          </td>
                                        )}
                                        {(currentView ===
                                          payrollConstants.ORGANIZATION_VIEW ||
                                          currentView ===
                                            payrollConstants.PROGRAM_VIEW) && (
                                          <td className="ant-table-cell">
                                            {preference?.employeeUid}
                                          </td>
                                        )}
                                        {currentView !==
                                          payrollConstants.PROGRAM_VIEW && (
                                          <td className="ant-table-cell">
                                            <span className="ant-typography font-weight-bold">
                                              {preference?.charityProgram}
                                            </span>
                                          </td>
                                        )}
                                        {currentView ===
                                          payrollConstants.EMPLOYEE_VIEW || currentView ===
                                          payrollConstants.CORPORATE_VIEW && (
                                          <td className="ant-table-cell">
                                            <span className="ant-typography font-weight-bold">
                                              {preference.socialOrganization}
                                            </span>
                                          </td>
                                        )}
                                        {/* <td className="text-center">
                                  {preference?.status ===
                                    donationPreferenceConstants?.SUSPENDED && (
                                    <span className="badge badge-danger">
                                      Suspended
                                    </span>
                                  )}
                                  {(!preference?.status ||
                                    preference?.status ===
                                      donationPreferenceConstants?.RESUMED) && (
                                    <span className="badge badge-success">
                                      Active
                                    </span>
                                  )}
                                </td> */}
                                        <td className="ant-table-cell">
                                          <input
                                            name="amount"
                                            type="text"
                                            size="4"
                                            maxLength={10}
                                            value={preference?.donationAmount.toLocaleString()}
                                            className="form-control"
                                            disabled={true}
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ) : (
                <div className="text-center m-4">No data found</div>
              )}
            </div>
          ))}
          {ProcessHelper(preferences, batchId)?.length > 0 && (
            <div className="row mt-4">
              <div className="col-md-12 text-right">
                <h5>
                  Total:&nbsp;
                  <span className="fs-5">
                    {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                    {preferences
                      ? preferences
                          .filter((preference) =>
                            batchId
                              ? preference
                              : preference?.isDeleted === false &&
                                !preference?.batchId &&
                                (preference?.status ===
                                  donationPreferenceConstants?.RESUMED ||
                                  preference?.status === null)
                          )
                          ?.reduce(
                            (total, currentValue) =>
                              (total = total + currentValue.donationAmount),
                            0
                          )
                          .toLocaleString()
                      : 0}
                  </span>
                </h5>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center m-4">No data found</div>
      )}
    </div>
  );
};
export default PayrollBatchDetail;
