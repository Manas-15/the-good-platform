import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { donationPreferenceActions } from "../../actions/donationPreference.actions";
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

const preferenceForm = {
  employeePreferenceId: "",
  type: "",
  donationAmount: "",
  frequency: "",
  isConsentCheck: "",
};
const actionInitialValues = {
  isDeleted: false,
  isSuspended: false,
  suspendDuration: moment(new Date()).add(4, "months"),
  requestType: "",
  preferenceId: "",
};
let PageSize = 10;
let accordionData;
const PayrollSetting = () => {
  let history = useHistory();
  const preferences = useSelector((state) => state.donationPreferences);
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
      donationPreferenceActions.getDonationPreferences({
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
    actionInitialValues.isDeleted =
      actionType === donationPreferenceConstants.DELETE;
    actionInitialValues.isSuspended =
      actionType === donationPreferenceConstants.SUSPEND;
    actionInitialValues.preferenceId = selectedPreference?.employeePreferenceId;
    actionInitialValues.requestType = actionType;
    dispatch(
      donationPreferenceActions.operateActionRequest(actionInitialValues)
    );
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
  }else {
    accordionData = groupBy("employeeName");
  }
  const camelCase = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };
  console.log(
    "export data ---------------",
    preferences?.items?.map(
      ({
        employeePreferenceId,
        isDeleted,
        employeeId,
        status,
        isConsentCheck,
        frequency,
        ...rest
      }) => ({ ...rest })
    )
  );
  return (
    <div>
      <div className="row mb-3 payroll">
        <div className="col-md-4">
          <h4>Payroll Setting - {moment().format("MMMM YYYY")}</h4>
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
              className="mr-4 fs-6 text-decoration-underline"
            >
              <span className="bi-file-earmark-arrow-up-fill fs-5" title="Export To CSV"></span>
            </CSVLink>
          )}
          <Link
              className="fs-6 text-decoration-underline mr-3"
              onClick={() => setCurrentView(payrollConstants.PROGRAM_VIEW)}
            >
              <button type="button" className={`${currentView === payrollConstants.PROGRAM_VIEW ? 'active' : '' } btn btn-sm btn-outline-primary`}>Program View</button>
          </Link>
          {/* {currentView === "Organization" && ( */}
            <Link
              className="fs-6 text-decoration-underline mr-3"
              onClick={() => setCurrentView(payrollConstants.EMPLOYEE_VIEW)}
            >
              <button type="button"  className={`${currentView === payrollConstants.EMPLOYEE_VIEW ? 'active' : '' } btn btn-sm  btn-outline-primary`}>Employee View</button>
            </Link>
          {/* )} */}
          {/* {currentView === "Employee" && ( */}
            <Link
              className="fs-6 text-decoration-underline"
              onClick={() => setCurrentView(payrollConstants.ORGANIZATION_VIEW)}
            >
              <button type="button"  className={`${currentView === payrollConstants.ORGANIZATION_VIEW ? 'active' : '' } btn btn-sm btn-outline-primary`}>Social Organization View</button>
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
                (preference) => preference?.isDeleted === false && (preference?.status ===
                  donationPreferenceConstants?.RESUMED || preference?.status === null)
              ).length > 0 && (
                <Accordion defaultActiveKey={index} className="Payroll">
                  <Accordion.Item eventKey={0}>
                    <Accordion.Header>
                      {type}{" "}
                      {currentView === payrollConstants.EMPLOYEE_VIEW &&
                        ` - ${accordionData[type][0]?.employeeUid}`}
                      {currentView === payrollConstants.PROGRAM_VIEW &&
                        ` - ${accordionData[type][0]?.socialOrganization}`}
                    </Accordion.Header>
                    <Accordion.Body>
                      <table className="table table-striped">
                        <thead>
                          <tr className="table-active">
                            <th>Sl#</th>
                            {(currentView === payrollConstants.ORGANIZATION_VIEW || currentView === payrollConstants.PROGRAM_VIEW) && (
                              <th>Employee Name</th>
                            )}
                            {(currentView === payrollConstants.ORGANIZATION_VIEW || currentView === payrollConstants.PROGRAM_VIEW) && (
                              <th>Employee ID</th>
                            )}
                            {currentView !== payrollConstants.PROGRAM_VIEW && (<th>Program</th>)}
                            {currentView === payrollConstants.EMPLOYEE_VIEW && (
                              <th>Social Organization</th>
                            )}
                            {/* <th className="text-center">Status</th> */}
                            <th>
                              Amount (
                              {ReactHtmlParser(
                                donationPreferenceConstants?.CURRENCY
                              )}
                              )
                            </th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accordionData[type]
                            .filter(
                              (preference) => preference?.isDeleted === false && (preference?.status ===
                              donationPreferenceConstants?.RESUMED || preference?.status === null)
                            )
                            .map((preference, i) => (
                              <tr>
                                <td>{i + 1}</td>
                                {(currentView === payrollConstants.ORGANIZATION_VIEW || currentView === payrollConstants.PROGRAM_VIEW) && (
                                  <td>{preference?.employeeName}</td>
                                )}
                                {(currentView === payrollConstants.ORGANIZATION_VIEW || currentView === payrollConstants.PROGRAM_VIEW) && (
                                  <td>{preference?.employeeUid}</td>
                                )}
                                {currentView !== payrollConstants.PROGRAM_VIEW && <td>{preference?.charityProgram}</td>}
                                {currentView === payrollConstants.EMPLOYEE_VIEW && (
                                  <td>{preference.socialOrganization}</td>
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
                                <td>
                                  <input
                                    name="amount"
                                    type="text"
                                    size="4"
                                    maxLength={10}
                                    defaultValue={preference.donationAmount.toLocaleString()}
                                    className="form-control"
                                    disabled={true}
                                  />
                                </td>
                                <td className="text-center">
                                  <Link
                                    onClick={() =>
                                      handleOpenDialog("Delete", preference)
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
        <Button className="btn btn-primary">Process Batch</Button>
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
