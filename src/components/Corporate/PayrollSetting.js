import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { payrollSettingActions } from "../../actions/payrollSetting.actions";
import { useDispatch, useSelector } from "react-redux";
import { donationPreferenceConstants, payrollConstants } from "../../constants";
import Loader from "./../Shared/Loader";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import { Link } from "react-router-dom";
import * as moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Button, Accordion } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "./../../assets/css/payroll.scss";

const actionInitialValues = {
  preferenceId: "",
};
let PageSize = 10;
let accordionData;
const PayrollSetting = () => {
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

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const currentTableData = useMemo(async () => {
    console.log("1111111111111111 currentPage", currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    // return fetchData();
    // return preferences?.items?.slice(firstPageIndex, lastPageIndex);
    // useEffect(() => {
    // dispatch(
    return await dispatch(
      payrollSettingActions.getDonationPreferences({
        page: currentPage,
        limit: PageSize,
        offset: currentPage === 1 ? 0 : currentPage * 10,
      })
    );
    // );
    // }, []);
  }, [currentPage]);

  const handleOpenDialog = (action, item) => {
    setOpenDialog(true);
    setActionType(action);
    setSelectedPreference(item);
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${
        item?.charityProgram
      }"</strong>?`
    );
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const confirm = () => {
    handleCloseDialog();
    actionInitialValues.preferenceId = selectedPreference?.employeePreferenceId;
    dispatch(payrollSettingActions.operateActionRequest(actionInitialValues));
  };
  if (preferences.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  const groupBy = (key) => {
    return preferences?.items?.reduce(function (acc, item) {
      console.log("iiiiiiiiiiiiiiiiiiii", item);
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
    const data = preferences?.items?.filter((item) => item.isDeleted === false);
    console.log("<<<<<<<<<<< coming to process batch >>>>>>>>", data);
    // dispatch(payrollSettingActions.processBatch(data));
  };
  return (
    <div className="customContainer">
      <div className="row mb-3">
        <div className="col-md-12">
          <h1 className="ant-typography customHeading">
            Payroll Setting - {moment().format("MMMM YYYY")}
          </h1>
        </div>
      </div>
      <div className="row mb-3 payroll text-right">
        <div className="col-md-12 text-right">
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
            <div className="row">
              {accordionData[type].filter(
                (preference) =>
                  preference?.isDeleted === false &&
                  preference?.status ===
                    (donationPreferenceConstants?.RESUMED ||
                      preference?.status === null)
              ).length > 0 && (
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
                                preference?.status ===
                                  (donationPreferenceConstants?.RESUMED ||
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
                                    <th className="ant-table-cell text-center">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="ant-table-tbody">
                                  {accordionData[type]
                                    .filter(
                                      (preference) =>
                                        preference?.isDeleted === false &&
                                        preference?.status ===
                                          (donationPreferenceConstants?.RESUMED ||
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
                            preference?.status ===
                              (donationPreferenceConstants?.RESUMED ||
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
        <tr>
          <td colSpan="7" className="text-center">
            No data found
          </td>
        </tr>
      )}
      <div className="text-right m-3">
        <Button className="btn btn-primary" onClick={processBatch}>
          Process Batch
        </Button>
      </div>
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
