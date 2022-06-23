import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  payrollConstants,
  paginationConstants,
  viewPortalConstants,
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
import { Modal, Button } from "react-bootstrap";

const actionInitialValues = {
  preferenceId: "",
};
let PageSize = paginationConstants?.PAGE_SIZE;
let accordionData, isCorporateView;

const PayrollBatchDetail = (props) => {
  const preferences = useSelector((state) => state?.payrollSetting?.items);
  console.log(preferences);
  const selectedOrganization = useSelector(
    (state) => state?.selectedOrganization?.organization
  );
  const batchId = props?.batchId;
  const employee = useSelector((state) => state.employee.user);
  const currentPortal = useSelector((state) => state.currentView);
  const [isBatchView, setIsBatchView] = useState(false);
  const [show, setShow] = useState(false);
  const [referenceNote, setReferenceNote] = useState();
  const [selected, setSelected] = useState();
  const [searchByOrganizationName, setSearchByOrganizationName] = useState("");
  const [searchByProgramName, setSearchByProgramName] = useState("");
  const [searchByAmount, setSearchByAmount] = useState("");

  const [currentView, setCurrentView] = useState(
    payrollConstants.EMPLOYEE_VIEW
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      payrollSettingActions.getBatchDetail({
        batchId: props?.batchId,
        socialId: isOrganizationView ? selectedOrganization?.id : null,
      })
    );
  }, [props?.batchId]);
  const groupBy = (key) => {
    return (
      preferences?.length > 0 &&
      preferences?.reduce?.(function (acc, item) {
        (acc[item[key]] = acc[item[key]] || []).push(item);
        return acc;
      }, {})
    );
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
  const isOrganizationView =
    currentPortal?.currentView ===
    viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;
  const isBluePencilPortal =
    currentPortal?.currentView ===
    viewPortalConstants.BLUE_PENCEIL_ADMIN_PORTAL;
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  useEffect(() => {
    isCorporateView = history.location.pathname !== "/admin-payroll-batch";
    setCurrentView(payrollConstants.LIST_VIEW);
  }, [history?.location?.pathname]);
  const showReferenceNote = (referenceNote) => {
    setShow(true);
    setReferenceNote(referenceNote);
  };
  const handleCancel = () => {
    setShow(false);
  };
  const onSearchChange = (value, selected) => {
    if (selected === "programName") {
      setSearchByProgramName(value);
    } else if (selected === "organizationName") {
      setSearchByOrganizationName(value);
    } else if (selected === "amount") {
      setSearchByAmount(value);
    } else {
      return null;
    }
  };
  const onHandleChange = (e) => {
    console.log("fired");
    setSearchByProgramName("");
    setSearchByOrganizationName("");
    setSearchByAmount("");
    setSelected(e.target.value);
  };
  // const fetchResults = (dateRange) => {
  //   dispatch(
  //     transactionsHistoryActions.getDirectPayment({
  //       pageSize: pageSize,
  //       offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
  //       searchByEmployeeName: searchByEmployeeName,
  //       searchByProgramName: searchByProgramName,
  //       searchByCorporateName: searchByCorporateName,
  //       searchByAmount: searchByAmount,
  //       startDate: dateRange ? moment(dateRange[0]).format("YYYY-MM-DD") : null,
  //       endDate: dateRange
  //         ? moment(dateRange[1]).add(1, "days").format("YYYY-MM-DD")
  //         : null,
  //     })
  //   );
  // };
  // useEffect(() => {
  //   fetchResults("");
  // }, [
  //   searchByProgramName,
  //   searchByEmployeeName,
  //   searchByCorporateName,
  //   searchByAmount,
  // ]);
  return (
    <div className="customContainer">
      <div className="row mb-4">
        <div className="col-md-12">
          <Link to="#" onClick={() => props?.hideBatchDetail(false)}>
            <i className="bi bi-arrow-90deg-left fs-6">&nbsp;Back</i>
          </Link>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12">
          <h1 className="ant-typography customHeading">
            Payroll Batch Detail -
            {preferences?.[0]?.batchId}
            ({preferences &&
              moment(preferences[0]?.batchDate).format("MMM YYYY")})
          </h1>
        </div>
        {/* <div className="col-md-5">
          <h3 className="ant-typography customHeading">
            Batch Id - {preferences?.[0]?.batchId}
          </h3>
        </div> */}
      </div>
      <div className="row mb-b payroll ">
        <div className="col-md-12 text-right">
          {preferences?.items?.length > 0 && (
            <CSVLink
              data={preferences?.map?.(
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
            to="#"
            className="fs-6 text-decoration-underline mr-3"
            onClick={() => setCurrentView(payrollConstants.LIST_VIEW)}
          >
            <button
              type="button"
              className={`${
                currentView === payrollConstants.LIST_VIEW ? "active" : ""
              } btn btn-sm btn-outline-primary btn-outline-custom`}
            >
              List View
            </button>
          </Link>
          <Link
            to="#"
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
          {(isCorporateView) && (
            <Link
              to="#"
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
          {!isOrganizationView &&
            !isBluePencilPortal &&
            (!isCorporateView || isOrganizationView) && (
              <Link
                to="#"
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
          {!isOrganizationView && (
            <Link
              to="#"
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
          )}
          {/* )} */}
        </div>
      </div>
      {accordionData && currentView !== payrollConstants.LIST_VIEW ? (
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
                                        payrollConstants.PROGRAM_VIEW) &&
                                      !isOrganizationView && (
                                        <th className="ant-table-cell">
                                          Employee Name
                                        </th>
                                      )}
                                    {(currentView ===
                                      payrollConstants.ORGANIZATION_VIEW ||
                                      currentView ===
                                        payrollConstants.PROGRAM_VIEW) &&
                                      !isOrganizationView && (
                                        <th className="ant-table-cell">
                                          Employee ID
                                        </th>
                                      )}
                                    {isOrganizationView &&
                                      currentView !==
                                        payrollConstants.CORPORATE_VIEW && (
                                        <th className="ant-table-cell">
                                          Corporate Name
                                        </th>
                                      )}
                                    {currentView !==
                                      payrollConstants.PROGRAM_VIEW && (
                                      <th className="ant-table-cell">
                                        Program
                                      </th>
                                    )}
                                    {(currentView ===
                                      payrollConstants.EMPLOYEE_VIEW ||
                                      currentView ===
                                        payrollConstants.CORPORATE_VIEW) && (
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
                                            payrollConstants.PROGRAM_VIEW) &&
                                          !isOrganizationView && (
                                            <td className="ant-table-cell">
                                              <span className="ant-typography font-weight-bold">
                                                {preference?.employeeName}
                                              </span>
                                            </td>
                                          )}
                                        {(currentView ===
                                          payrollConstants.ORGANIZATION_VIEW ||
                                          currentView ===
                                            payrollConstants.PROGRAM_VIEW) &&
                                          !isOrganizationView && (
                                            <td className="ant-table-cell">
                                              {preference?.employeeUid}
                                            </td>
                                          )}
                                        {isOrganizationView &&
                                          currentView !==
                                            payrollConstants.CORPORATE_VIEW && (
                                            <td className="ant-table-cell">
                                              <span className="ant-typography font-weight-bold">
                                                {preference?.corporateName}
                                              </span>
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
                                        {(currentView ===
                                          payrollConstants.EMPLOYEE_VIEW ||
                                          currentView ===
                                            payrollConstants.CORPORATE_VIEW) && (
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
                                            value={preference?.donationAmount?.toLocaleString()}
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
              ) : null}
            </div>
          ))}
        </>
      ) : null}
      <div className="ant-row searchContainer mt-3 py-4 align-center">
        <div className="col-md d-flex pl-0">
          <div className="col-md-8 d-flex ">
            <div className="col-md-6 pl-0">
              <div>
                <select
                  className="form-select"
                  value={selected}
                  defaultValue={""}
                  onChange={(e) => onHandleChange(e)}
                >
                  <option value={""} key={"default"} disabled>
                    Search by
                  </option>
                  <option value="programName">Program Name</option>
                  <option value="organizationName">Organization Name</option>
                  {/* {!isEmployeePortal && !isCorporatePortal && (
                    <option value="corporateName">Corporate</option>
                  )} */}

                  {/* {!isEmployeePortal && (
                    <option value="employeeName">Donor</option>
                  )} */}
                  <option value="amount">Amount</option>
                </select>
              </div>
            </div>
            {selected === "programName" && (
              <div className="col-md-6">
                <div>
                  <div className="ant-input-affix-wrapper inputFilterInput">
                    <span className="ant-input-prefix">
                      <i className="bi bi-search"></i>
                      <input
                        type="text"
                        className="ant-input-search"
                        placeholder="Search by Program Name"
                        onChange={(e) =>
                          onSearchChange(e.target.value, "programName")
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selected === "organizationName" && (
              <div className="col-md-6">
                <div>
                  <div className="ant-input-affix-wrapper inputFilterInput">
                    <span className="ant-input-prefix">
                      <i className="bi bi-search"></i>
                      <input
                        type="text"
                        // className="form-control"
                        className="ant-input-search"
                        placeholder="Search by Organization Name"
                        onChange={(e) =>
                          onSearchChange(e.target.value, "organizationName")
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            )}
            {selected === "amount" && (
              <div className="col-md-6">
                <div>
                  <div className="ant-input-affix-wrapper inputFilterInput">
                    <span className="ant-input-prefix">
                      <i className="bi bi-search"></i>
                      <input
                        type="text"
                        className="ant-input-search"
                        placeholder="Search by Amount"
                        onChange={(e) =>
                          onSearchChange(e.target.value, "amount")
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {currentView === payrollConstants.LIST_VIEW && (
        <div className="ant-row">
          <div className="ant-col ant-col-24 mt-2">
            <div className="ant-table-wrapper">
              <div className="ant-table">
                <table>
                  <thead className="ant-table-thead">
                    <tr>
                      {/* <th className="ant-table-cell">Batch ID</th>   */}
                      {/* <th className="ant-table-cell">Employee</th> */}
                      <th className="ant-table-cell">Organization</th>
                      <th className="ant-table-cell">Program</th>
                      {/* {!isCorporatePortal && (
                        <th className="ant-table-cell">Corporate Name</th>
                      )} */}
                      {/* <th className="ant-table-cell">REF ID</th> */}
                      <th className="ant-table-cell">
                        Amount (
                        {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                        )
                      </th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {preferences?.length > 0 &&
                      preferences?.map((item, idx) => (
                        <tr key={idx}>
                          {/* <td>{item?.batchId}</td> */}
                          {/* <td>{item?.employeeName}</td> */}
                          <td>{item?.socialOrganization}</td>
                          {/* {!isCorporatePortal && <td>{item?.corporateName}</td>} */}
                          <td>{item?.charityProgram}</td>
                          {/* <td>
                          <Link to="#"
                            onClick={() =>
                              showReferenceNote(item?.referenceNote)
                            }
                          >
                            {item?.referenceId}
                          </Link>
                        </td> */}
                          <td>{item?.donationAmount?.toLocaleString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleCancel} backdrop="static">
            <Modal.Header closeButton className="fs-5 p-2">
              <Modal.Title>Reference Note</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "18" }}>{referenceNote}</Modal.Body>
          </Modal>
        </div>
      )}
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
    </div>
  );
};
export default PayrollBatchDetail;
