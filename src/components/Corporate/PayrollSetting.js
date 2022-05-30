import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { payrollSettingActions } from "../../actions/payrollSetting.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  payrollConstants,
  paginationConstants,
  viewPortalConstants,
} from "../../constants";
import Loader from "./../Shared/Loader";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import { Link } from "react-router-dom";
import * as moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Button, Accordion } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "./../../assets/css/payroll.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ProcessHelper } from "./../../helpers";

const actionInitialValues = {
  preferenceId: "",
};
let PageSize = paginationConstants?.PAGE_SIZE;
let accordionData, batchId;
const PayrollSetting = (props) => {
  let history = useHistory();
  const preferences = useSelector((state) => state.payrollSetting);
  const employee = useSelector((state) => state.employee.user);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const currentPortal = useSelector((state) => state.currentView);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isBatchView, setIsBatchView] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const [updateType, setUpdateType] = useState("");
  const [updatedValue, setUpdatedValue] = useState();
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [currentView, setCurrentView] = useState(
    payrollConstants.EMPLOYEE_VIEW
  );
  const [generateMonthYear, setGenerateMonthYear] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, [currentPage]);
  const handleOpenDialog = (action, item) => {
    setOpenDialog(true);
    setActionType(action);
    setActionTitle(`${action} Confirmation`);
    if (item) {
      setSelectedPreference(item);
      setActionContent(
        `Are you sure to ${action.toLowerCase()} <strong>"${
          item?.charityProgram
        }"</strong>?`
      );
    } else {
      setActionContent(`Are you sure to process this batch?`);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPreference(null);
  };
  const confirm = () => {
    handleCloseDialog();
    if (selectedPreference) {
      actionInitialValues.preferenceId =
        selectedPreference?.employeePreferenceId;
      dispatch(payrollSettingActions.operateActionRequest(actionInitialValues));
    } else {
      processBatch();
    }
  };
  if (preferences.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  const groupBy = (key) => {
    return preferences?.items?.reduce(function (acc, item) {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  };
  if (currentView === payrollConstants.ORGANIZATION_VIEW) {
    accordionData = groupBy("socialOrganization");
  } else if (currentView === payrollConstants.PROGRAM_VIEW) {
    accordionData = groupBy("charityProgram");
  } else {
    accordionData = groupBy("employeeName");
  }
  // const camelCase = (str) => {
  //   return str.substring(0, 1).toUpperCase() + str.substring(1);
  // };
  const processBatch = () => {
    const data = ProcessHelper(preferences?.items);
    const finalData = {
      corporateId: isCorporatePortal
        ? selectedCorporate?.corporate?.corporateId
        : null,
      totalAmount: data.reduce(
        (total, currentValue) => (total = total + currentValue.donationAmount),
        0
      ),
      items: data,
    };
    dispatch(payrollSettingActions.processBatch(finalData));
  };
  useEffect(() => {
    batchId = props?.location?.query?.batchId;
    if (batchId) {
      setIsBatchView(true);
      dispatch(payrollSettingActions.getBatchDetail({ batchId: batchId }));
    }
  }, [props?.history?.action === "PUSH"]);
  const generatePayroll = () => {
    setIsGenerating(true);
    getData();
  };
  const getData = () => {
    const startMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");
    dispatch(
      payrollSettingActions.getDonationPreferences({
        corporateId: selectedCorporate?.corporate?.corporateId,
        userType: isCorporatePortal ? "Corporate" : null,
        requestType: "Batch",
        filterDate: moment(generateMonthYear).isBetween(startMonth, endOfMonth)
          ? moment().format("MM-YYYY")
          : moment(generateMonthYear).format("MM-YYYY"),
        // pageSize: 1000,
        // offset: currentPage >= 2 ? currentPage * 10 - 10 : 0,
      })
    );
  };
  return (
    <div className="customContainer">
      <div className="row mb-4">
        <div className="col-md-7">
          <h1 className="ant-typography customHeading">
            Payroll Setting -{" "}
            {isGenerating
              ? moment(generateMonthYear).format("MMM YYYY")
              : moment().format("MMM YYYY")}
          </h1>
        </div>
      </div>
      <div className="row mb-b payroll text-right">
        <div className="col-md-4">
          {!batchId && (
            <div className="row">
              <div className="col-md-8">
                <DatePicker
                  className={"form-control"}
                  autoComplete="none"
                  maxDate={new Date(moment().add(1, "months"))}
                  showMonthDropdown={true}
                  showYearDropdown={true}
                  dropdownMode="select"
                  selected={generateMonthYear}
                  dateFormat="MMM-yyyy"
                  showMonthYearPicker
                  onChange={(val) => {
                    setGenerateMonthYear(val);
                  }}
                />
              </div>
              <div className="col-md-4 pl-0">
                <button
                  type="button"
                  className={"btn btn-custom"}
                  onClick={generatePayroll}
                >
                  Generate
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-8 text-right">
          {preferences?.items && (
            <CSVLink
              data={preferences?.items?.map(
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
          {/* {currentView === "Organization" && ( */}
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
          {/* )} */}
          {/* {currentView === "Employee" && ( */}
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
      {preferences.loading && <Loader />}
      {!preferences?.items && (
        <div className="card p-4 text-center mt-4">
          <strong>
            Seems like there is no donation preferences set by your employees.
            <br />
            Let's wait till any good soul makes a right decision.
          </strong>
        </div>
      )}
      {accordionData ? (
        <>
          {Object.keys(accordionData).map((type, index) =>
            ProcessHelper(accordionData[type], null)?.length > 0 ? (
              <Accordion defaultActiveKey={0} className="Payroll mt-4">
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
                      ? ProcessHelper(accordionData[type], null)
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
                                    payrollConstants.EMPLOYEE_VIEW && (
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
                                  {!preferences?.items?.[0]?.batchId &&
                                    !batchId && (
                                      <th className="ant-table-cell text-center">
                                        Actions
                                      </th>
                                    )}
                                </tr>
                              </thead>
                              <tbody className="ant-table-tbody">
                                {ProcessHelper(accordionData[type], null).map(
                                  (preference, i) => (
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
                                        payrollConstants.EMPLOYEE_VIEW && (
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
                                          defaultValue={preference?.donationAmount.toLocaleString()}
                                          className="form-control"
                                          disabled={true}
                                        />
                                      </td>
                                      {!preferences?.items?.[0]?.batchId &&
                                        !batchId && (
                                          <td className="ant-table-cell text-center">
                                            <Link
                                              onClick={() =>
                                                handleOpenDialog(
                                                  "Delete",
                                                  preference
                                                )
                                              }
                                              title="Delete"
                                            >
                                              <i className="bi bi-trash fs-5 custom-color"></i>
                                            </Link>
                                          </td>
                                        )}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ) : null
          )}
          {ProcessHelper(preferences?.items, batchId)?.length > 0 && (
            <div className="row mt-4">
              <div className="col-md-12 text-right">
                <h5>
                  Total:&nbsp;
                  <span className="fs-5">
                    {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                    {preferences?.items
                      ? preferences?.items
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
      ) : null}
      {!moment(generateMonthYear).isAfter(moment()) &&
        ProcessHelper(preferences?.items, batchId)?.length > 0 &&
        !batchId && (
          <div className="text-right m-3">
            <button
              className="btn btn-custom"
              onClick={() => handleOpenDialog("Process batch", "")}
              disabled={
                preferences?.items?.[0]?.batchId ||
                moment(generateMonthYear).isAfter(moment())
              }
            >
              {preferences?.items?.[0]?.batchId ? "Processed" : "Process Batch"}
            </button>
          </div>
        )}
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
export default PayrollSetting;
