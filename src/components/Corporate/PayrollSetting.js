import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { payrollSettingActions } from "../../actions/payrollSetting.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  payrollConstants,
  paginationConstants,
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

const actionInitialValues = {
  preferenceId: "",
};
let PageSize = paginationConstants?.PAGE_SIZE;
let accordionData, batch;
const PayrollSetting = (props) => {
  let history = useHistory();
  const preferences = useSelector((state) => state.payrollSetting);
  const employee = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const [updateType, setUpdateType] = useState("");
  const [updatedValue, setUpdatedValue] = useState();
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [currentView, setCurrentView] = useState("Employee");
  const [generateMonthYear, setGenerateMonthYear] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);

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
    console.log("////// fffffffffffff ////////////// processBatch");
    if (selectedPreference) {
      console.log(
        "////// fddddddddddddddddddddddf ////////////// processBatch"
      );
      actionInitialValues.preferenceId =
        selectedPreference?.employeePreferenceId;
      dispatch(payrollSettingActions.operateActionRequest(actionInitialValues));
    } else {
      console.log("//////////////////// processBatch");
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
    const data = preferences?.items?.filter(
      (item) =>
        item.isDeleted === false &&
        (item?.status === donationPreferenceConstants?.RESUMED ||
          item?.status === null)
    );
    const finalData = {
      corporateId: 1,
      totalAmount: data.reduce(
        (total, currentValue) => (total = total + currentValue.donationAmount),
        0
      ),
      items: data,
    };
    console.log("<<<<<<<<<<< coming to process batch >>>>>>>>", finalData);
    dispatch(payrollSettingActions.processBatch(finalData));
  };
  useEffect(() => {
    console.log(
      "ccccccccccccccc coming props",
      props?.history?.action === "PUSH"
    );
    // const batch = batch;
    batch = props?.location?.query?.batch;
  }, [props?.history?.action === "PUSH"]);
  const generatePayroll = () => {
    setIsGenerating(true);
    console.log(
      "generate payroll >>>>>>>>>",
      moment(generateMonthYear).format("MM-YYYY")
    );
    getData();
  };
  const getData = () => {
    console.log("ddddddddddddddddddddd get data");
    dispatch(
      payrollSettingActions.getDonationPreferences({
        monthYear: moment(generateMonthYear).format("MM-YYYY"),
        pageSize: 1000,
        offset: currentPage >= 2 ? currentPage * 10 - 10 : 0,
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
              ? moment(generateMonthYear).format("MMMM YYYY")
              : moment().format("MMMM YYYY")}
          </h1>
        </div>
      </div>
      <div className="row mb-b payroll text-right">
        <div className="col-md-4">
          {!batch && (
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
                  dateFormat="MMMM-yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  onChange={(val) => {
                    setGenerateMonthYear(val);
                  }}
                />
              </div>
              <div className="col-md-4 pl-0">
                <button
                  type="button"
                  className={"btn btn-primary"}
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
              } btn btn-sm btn-outline-primary`}
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
              } btn btn-sm  btn-outline-primary`}
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
              } btn btn-sm btn-outline-primary`}
            >
              Social Organization View
            </button>
          </Link>
          {/* )} */}
        </div>
      </div>
      {preferences.loading && <Loader />}
      {accordionData ? (
        <>
          {Object.keys(accordionData).map((type, index) => (
            <div className="row mt-4">
              {accordionData[type].filter(
                (preference) =>
                  preference?.isDeleted === false &&
                  (preference?.status ===
                    donationPreferenceConstants?.RESUMED ||
                    !preference?.status)
              ).length > 0 ? (
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
                        ? accordionData[type]
                            .filter(
                              (preference) =>
                                preference?.isDeleted === false &&
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
                                    {!batch && (
                                      <th className="ant-table-cell text-center">
                                        Actions
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="ant-table-tbody">
                                  {accordionData[type]
                                    .filter(
                                      (preference) =>
                                        preference?.isDeleted === false &&
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
                                        {!batch && (
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
                                              <i className="bi bi-trash fs-5"></i>
                                            </Link>
                                          </td>
                                        )}
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
          <div className="row mt-4">
            <div className="col-md-12 text-right">
              <h5>
                Total:&nbsp;
                <span className="fs-5">
                  {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                  {preferences?.items
                    ? preferences?.items
                        .filter(
                          (preference) =>
                            preference?.isDeleted === false &&
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
        </>
      ) : (
        <div className="text-center m-4">No data found</div>
      )}
      {accordionData && !batch && (
        <div className="text-right m-3">
          <Button
            className="btn btn-primary"
            onClick={() => handleOpenDialog("Process batch", "")}
          >
            Process Batch
          </Button>
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
