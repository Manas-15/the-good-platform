import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { CompleteBatchSchema } from "./../Validations";
import {
  donationPreferenceConstants,
  payrollConstants,
  paginationConstants,
  viewPortalConstants
} from "../../constants";
import { payrollBatchActions } from "../../actions/payrollBatch.actions";
import Loader from "./../Shared/Loader";
import { Link } from "react-router-dom";
import * as moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Modal, Button } from "react-bootstrap";
import { Progress, Tooltip } from "antd";
import "./../../assets/css/payroll.scss";
import Pagination from "./../Shared/Pagination";
import PayrollBatchDetail from "./PayrollBatchDetail";
import PayrollBatchAccordion from "./PayrollBatchAccordion";

const completeInitialValues = {
  batchId: "",
  requestType: "",
  referenceId: "",
  referenceNote: ""
};
const confirmInitialValues = {
  batchId: "",
  requestType: "",
  socialId: ""
};
const paidInitialValues = {
  batchId: "",
  requestType: "",
  referenceId: "",
  referenceNote: ""
};
let pageSize = paginationConstants?.PAGE_SIZE;

const PayrollBatch = (props) => {
  const corporateId = props?.match?.params?.corporateId;
  const organizationId = props?.match?.params?.organizationId;
  const payrollBatches = useSelector((state) => state.payrollBatch);
  const currentPortal = useSelector((state) => state.currentView);
  const isOrganizationPortal =
    currentPortal?.currentView ===
    viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;
  const isBluePencilPortal =
    currentPortal?.currentView ===
    viewPortalConstants.BLUE_PENCEIL_ADMIN_PORTAL;
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const selectedOrganization = useSelector(
    (state) => state?.selectedOrganization?.organization
  );
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [referenceNote, setReferenceNote] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [isBatchDetail, setIsBatchDetail] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  // const [searchValue, setSearchValue] = useState("");
  // const [selectedKeySearch, setSelectedKeySearch] = useState("");
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [selected, setSelected] = useState();
  const [groupByBatchData, setGroupByBatchData] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Not Processed");

  const [openPaidSimulator, setOpenPaidSimulator] = useState(false);
  const [currentView, setCurrentView] = useState(
    isBluePencilPortal
      ? payrollConstants?.LIST_VIEW
      : payrollConstants?.CORPORATE_VIEW
  );

  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const setPage = (page) => {
    setCurrentPage(page);
  };
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

  useEffect(() => {
    dispatch(
      payrollBatchActions.getPayrollBatch({
        corporateId: corporateId ? corporateId : null,
        socialId: organizationId ? organizationId : null,
        userType: corporateId
          ? "Corporate"
          : organizationId
          ? "SocialOrganization"
          : "BluePencilAdmin",
        requestType: "Batch",
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0
      })
    );
    // filter("All");
  }, [currentPage]);

  const groupByBatch = () => {
    return allRecords?.reduce?.(function (acc, item) {
      (acc[item["batchId"]] = acc[item["batchId"]] || []).push(item);
      return acc;
    }, {});
  };
  let allGroupData;
  const allData = payrollBatches?.items?.filter((item) => !item?.isDeleted);
  useEffect(() => {
    setAllRecords(
      payrollBatches?.items?.filter(
        (item) =>
          item?.receivedOrganizationIds?.split(",")?.length !==
          item?.totalOrganizationCount
      )
    );
  }, [payrollBatches?.items]);

  useEffect(() => {
    setRecords(allRecords);
    allGroupData = groupByBatch();
    setGroupByBatchData(allGroupData);
    // filter("status", "false");
  }, [allRecords]);

  // console.log(groupByBatchData);
  if (payrollBatches.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  const showReferenceNote = (referenceNote) => {
    setShow(true);
    setReferenceNote(referenceNote);
  };
  const statusOption = [
    { label: "All", value: 0 },
    { label: "Pending", value: payrollConstants.PENDING_STATUS },
    { label: "Processed", value: payrollConstants.COMPLETED_STATUS }
  ];
  const openPaidConfirmation = (item) => {
    paidInitialValues.referenceNote = `Processed Payroll batch for the month of ${moment().format(
      "MMMM"
    )} - ${item?.corporateName}`;
    setOpenPaidSimulator(true);
    setSelectedBatch(item);
  };
  const hidePaidSimulator = () => {
    setOpenPaidSimulator(false);
  };
  const confirmPaid = (values) => {
    dispatch(
      payrollBatchActions.updateBatchStatus({
        batchId: selectedBatch?.batchId,
        requestType: payrollConstants.PAID,
        referenceId: values?.referenceId,
        referenceNote: values?.referenceNote
      })
    );
    hidePaidSimulator();
  };
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedBatch(item);
    if (isOrganizationPortal) {
      setActionTitle("Confirm Payment Receipt");
      setActionContent(`Are you sure want to receive this batch payments?`);
    } else {
      setActionTitle(
        `${!(isBluePencilPortal && action === "Confirm Batch") ? action : ""} ${
          corporateId
            ? "Confirmation"
            : isBluePencilPortal && action === "Confirm Batch"
            ? "Confirm Payment Receipt"
            : ""
        }`
      );
      setActionContent(
        `Are you sure want to ${
          corporateId
            ? "complete"
            : action == "Confirm Batch"
            ? "confirm payment receipt"
            : "unconfirm"
        } for this batch?`
      );
    }
    if (action === "Complete Batch") {
      completeInitialValues.referenceNote = `Process batch for the month of ${moment().format(
        "MMMM"
      )} - ${item?.corporateName}`;
      completeInitialValues.batchId = item?.batchId;
      completeInitialValues.requestType = payrollConstants.COMPLETE;
    } else if (action === "Receive Batch") {
      confirmInitialValues.batchId = item?.batchId;
      confirmInitialValues.requestType = payrollConstants.RECEIVE;
      confirmInitialValues.socialId = isOrganizationPortal
        ? selectedOrganization?.id
        : null;
    } else {
      confirmInitialValues.batchId = item?.batchId;
      if (action === "Confirm Batch") {
        confirmInitialValues.requestType = payrollConstants.CONFIRM;
      } else {
        confirmInitialValues.requestType = payrollConstants.UNCONFIRM;
      }
    }
  };
  const handleCancel = () => {
    setShow(false);
  };
  const confirm = (values) => {
    handleClose();
    // if (values) {
    //   values.batchId = selectedBatch?.batchId;
    //   values.action = actionType === "Complete Batch" ? "Complete" : "Confirm";
    // }
    dispatch(payrollBatchActions.updateBatchStatus(values));
    console.log(
      "<<<<<<<<<<<<<<<<<<<<< allRecords >>>>>>>>>>>>>>>>>>>>>>>>>",
      values
    );
    const data = allRecords?.filter((item) => item?.batchId !== values.batchId);
    console.log("<<<<<<<<<<<<<<<<<<<<< data >>>>>>>>>>>>>>>>>>>>>>>>>", data);
    setAllRecords(data);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedBatch(null);
    setActionType(null);
  };
  const showBatchDetail = (batchId) => {
    setIsBatchDetail(true);
    setSelectedBatchId(batchId);
  };
  const hideBatchDetail = (status) => {
    setIsBatchDetail(status);
    setSelectedBatchId(null);
  };

  const onFilter = (type, value) => {
    // console.log(type, value);
    setSelectedStatus(value);
    if (value === "2") {
      // console.log(value, "received status");
      setAllRecords(
        allData.filter(
          (val) =>
            val?.receivedOrganizationIds?.split(",")?.length ===
            val?.totalOrganizationCount
        )
      );
    } else if (value === "0") {
      // console.log(value, "all status");
      setAllRecords(payrollBatches?.items);
    } else {
      // console.log(value, "pending status");
      setAllRecords(
        allData.filter(
          (val) =>
            val?.receivedOrganizationIds?.split(",")?.length !==
            val?.totalOrganizationCount
        )
      );
    }
  };

  //************************************************************************* */
  // const filter = (value) => {
  //   console.log(value);
  //   if (value && value === payrollConstants.PENDING_STATUS.toString()) {
  //     setAllRecords(
  //       records?.filter(
  //         (record) =>
  //           !record?.receivedOrganizationIds ||
  //           (record?.status === payrollConstants.RECEIVED_STATUS &&
  //             record?.totalOrganizationCount !==
  //               record?.receivedOrganizationIds?.split(",")?.length)
  //       )
  //     );
  //   } else if (value && value === payrollConstants.RECEIVED_STATUS.toString()) {
  //     setAllRecords(
  //       records?.filter(
  //         (record) =>
  //           record?.status === payrollConstants.RECEIVED_STATUS &&
  //           record?.totalOrganizationCount ===
  //             record?.receivedOrganizationIds?.split(",")?.length
  //       )
  //     );
  //   } else {
  //     setAllRecords(records);
  //   }
  //   if (selectedKeySearch && searchValue) {
  //     onSearchChange(searchValue, selectedKeySearch);
  //   }
  // };

  //************************************************************************* */

  const onSearchChange = (e, selected) => {
    const keyword = e;
    allGroupData = groupByBatch();
    // if (keyword !== "") {
    //   const results = Object.keys(groupByBatchData)?.map((type, index) => {
    //     console.log(type, index);
    // if (selected === "batchId") {
    //   if (
    //     groupByBatchData[type]?.[0]?.batchId
    //       ?.toLowerCase()
    //       .startsWith(keyword.toLowerCase())
    //   ) {
    //     return groupByBatchData[type];
    //   }
    // } else if (selected === "referenceId") {
    //   if (
    //     groupByBatchData[type]?.[0]?.referenceId
    //       ?.toLowerCase()
    //       .startsWith(keyword.toLowerCase())
    //   ) {
    //     return groupByBatchData[type];
    //   }
    // } else {
    //   if (
    //     selected === "amount" &&
    //     groupByBatchData[type]?.[0]?.amount
    //       ?.toString()
    //       .startsWith(keyword.toString())
    //   ) {
    //     return groupByBatchData[type];
    //   }
    // }
    // });
    //   console.log("resultsresults", results);
    //   setGroupByBatchData(results);
    // } else {
    //   keyword === "" && setGroupByBatchData(allGroupData);
    // }
    // setSearchValue(keyword);
    // setSelectedKeySearch(selected);
  };
  // console.log(groupByBatchData);
  const onHandleChange = (e) => {
    setSelected(e.target.value);
  };
  //for reset state on selected
  // useEffect(() => {
  //   if (
  //     selected === "batchId" ||
  //     selected === "referenceId" ||
  //     selected === "amount"
  //   ) {
  //     allGroupData = groupByBatch();
  //     setGroupByBatchData(allGroupData);
  //   }
  // }, [selected]);

  // if (isBluePencilPortal || isOrganizationPortal) {
  //   allGroupData = groupByBatch();

  //   console.log("dddddddddddddddddddd groupByBatch", allGroupData);
  // }

  // console.log(isCorporatePortal);
  return (
    <div className="customContainer">
      {!isBatchDetail && (
        <>
          <div className="row mb-3 payroll">
            <div className="col-md-6">
              <h1 className="ant-typography customHeading">Payroll Batch</h1>
            </div>
            <div className="col-md-6 text-right">
              {(isCorporatePortal || isBluePencilPortal || isOrganizationPortal) && (
                <div className="row mb-4">
                  <div className="col-md-6 mt-2">
                    <h6 className="mt-2">Filter By</h6>
                  </div>
                  <div className="col-md-6 mt-2">
                    <select
                      className="form-select"
                      defaultValue={1}
                      onChange={(e) => onFilter("status", e.target.value)}
                    >
                      <option value={"All"} key={"default"} disabled>
                        Status
                      </option>
                      {statusOption.map((status, index) => (
                        <option value={status.value} key={index}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="row mb-3">
                <div className="col-md d-flex pl-0">
                  <div className="col-md-6">
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
                        <option value="batchId">Batch ID</option>
                        {/* {isCorporatePortal && ( */}
                        <option value="referenceId">Reference ID</option>
                        {/* )} */}

                        <option value="amount">Amount</option>
                      </select>
                    </div>
                  </div>

                  {selected === "batchId" && (
                    <div className="col-md-6">
                      <div>
                        <div className="ant-input-affix-wrapper inputFilterInput">
                          <span className="ant-input-prefix">
                            <i className="bi bi-search"></i>
                            <input
                              type="text"
                              // className="form-control"
                              className="ant-input-search"
                              placeholder="Search by Batch Id"
                              onChange={(e) =>
                                onSearchChange(e.target.value, "batchId")
                              }
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selected === "referenceId" && (
                    <div className="col-md-6">
                      <div>
                        <div className="ant-input-affix-wrapper inputFilterInput">
                          <span className="ant-input-prefix">
                            <i className="bi bi-search"></i>
                            <input
                              type="text"
                              // className="form-control"
                              className="ant-input-search"
                              placeholder="Search by Reference ID"
                              onChange={(e) =>
                                onSearchChange(e.target.value, "referenceId")
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
            <div className="col-md-4 text-right">
              {!corporateId && !isOrganizationPortal && (
                <>
                  {isBluePencilPortal && (
                    <Link
                      to="#"
                      className="fs-6 text-decoration-underline mr-3"
                      onClick={() => setCurrentView(payrollConstants.LIST_VIEW)}
                    >
                      <button
                        type="button"
                        className={`${
                          currentView === payrollConstants.LIST_VIEW
                            ? "active"
                            : ""
                        } btn btn-sm btn-outline-primary btn-outline-custom`}
                      >
                        List View
                      </button>
                    </Link>
                  )}
                  {!isOrganizationPortal && (
                    <Link
                      to="#"
                      className="fs-6 text-decoration-underline mr-3"
                      onClick={() =>
                        setCurrentView(payrollConstants.CORPORATE_VIEW)
                      }
                    >
                      <button
                        type="button"
                        className={`${
                          currentView === payrollConstants.CORPORATE_VIEW
                            ? "active"
                            : ""
                        } btn btn-sm btn-outline-primary btn-outline-custom`}
                      >
                        Corporate View
                      </button>
                    </Link>
                  )}
                  {!isBluePencilPortal && (
                    <Link
                      to="#"
                      className="fs-6 text-decoration-underline mr-3"
                      onClick={() =>
                        setCurrentView(payrollConstants.ORGANIZATION_VIEW)
                      }
                    >
                      <button
                        type="button"
                        className={`${
                          currentView === payrollConstants.ORGANIZATION_VIEW
                            ? "active"
                            : ""
                        } btn btn-sm btn-outline-primary btn-outline-custom`}
                      >
                        Organization View
                      </button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {payrollBatches.loading && <Loader />}
          {allRecords?.length === 0 && (
            <div className="card p-4 text-center">
              {isOrganizationPortal && (
                <strong>
                  No Payroll donation batch created by the Blue Pencil Admin
                  till now.
                  <br />
                  You should wait a while till any donation reaches to you.
                </strong>
              )}
              {isCorporatePortal && (
                <strong>
                  There is no Payroll Batch processed by you.
                  <br />
                  Please go to Donation preferences to process a batch now.
                </strong>
              )}
              {isBluePencilPortal && (
                <strong>
                  No Payroll donation batch created by any corporate.
                  <br />
                  You should wait a while till any donation reaches to you.
                </strong>
              )}
            </div>
          )}

          {allRecords?.length > 0 &&
            (corporateId ||
              organizationId ||
              currentView === payrollConstants.LIST_VIEW) && (
              <div className="ant-row">
                <div className="ant-col ant-col-24 mt-2">
                  <div className="ant-table-wrapper">
                    <div className="ant-table">
                      <table>
                        <thead className="ant-table-thead">
                          <tr>
                            <th className="ant-table-cell">Batch id</th>

                            {currentView ===
                              payrollConstants.ORGANIZATION_VIEW && (
                              <th className="ant-table-cell">
                                Organization Name
                              </th>
                            )}

                            {!corporateId && (
                              <th className="ant-table-cell">Corporate Name</th>
                            )}
                            <th className="ant-table-cell">Month</th>
                            <th className="ant-table-cell">
                              Amount (
                              {ReactHtmlParser(
                                donationPreferenceConstants?.CURRENCY
                              )}
                              )
                            </th>
                            <th className="ant-table-cell">REF ID</th>
                            <th className="ant-table-cell">Status</th>
                            <th className="ant-table-cell text-center">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          {(isBluePencilPortal || isOrganizationPortal) &&
                            groupByBatchData &&
                            Object.keys(groupByBatchData)?.map(
                              (type, index) => (
                                <tr
                                  key={index + 1}
                                  className="ant-table-row ant-table-row-level-0"
                                >
                                  {/* <td className="ant-table-cell">
                            {currentPage >= 2
                              ? currentPage * pageSize -
                                pageSize +
                                index +
                                1
                              : index + 1}
                          </td> */}
                                  <td className="ant-table-cell">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        showBatchDetail(
                                          groupByBatchData[type]?.[0]?.batchId
                                        )
                                      }
                                    >
                                      {groupByBatchData[type]?.[0]?.batchId}
                                    </Link>
                                  </td>
                                  {/* {currentView ===
                              payrollConstants.ORGANIZATION_VIEW && (
                              <td className="ant-table-cell">
                                {batch?.socialOrganizationId}
                              </td>
                            )} */}
                                  {currentView ===
                                    payrollConstants.ORGANIZATION_VIEW && (
                                    <td className="ant-table-cell">
                                      {
                                        groupByBatchData[type]?.[0]
                                          ?.socialOrganizationName
                                      }
                                    </td>
                                  )}
                                  {/* {!corporateId && (
                            <td className="ant-table-cell">
                              {batch?.corporateId}
                            </td>
                          )} */}
                                  {!corporateId && (
                                    <td className="ant-table-cell">
                                      {
                                        groupByBatchData[type]?.[0]
                                          ?.corporateName
                                      }
                                    </td>
                                  )}
                                  <td className="ant-table-cell">
                                    {moment(
                                      groupByBatchData[type]?.[0]?.createdDate
                                    ).format("MMM, YYYY")}
                                  </td>
                                  <td className="ant-table-cell">
                                    {ReactHtmlParser(
                                      donationPreferenceConstants?.CURRENCY
                                    )}
                                    {groupByBatchData[type]
                                      ? groupByBatchData[type]
                                          ?.reduce(
                                            (total, currentValue) =>
                                              (total =
                                                total + currentValue.amount),
                                            0
                                          )
                                          ?.toLocaleString()
                                      : 0}
                                  </td>
                                  <td className="ant-table-cell">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        showReferenceNote(
                                          isOrganizationPortal
                                            ? groupByBatchData[type]?.[0]
                                                ?.adminreferenceNote
                                            : groupByBatchData[type]?.[0]
                                                ?.referenceNote
                                        )
                                      }
                                    >
                                      {isOrganizationPortal
                                        ? groupByBatchData[type]?.[0]
                                            ?.adminreferenceId
                                        : groupByBatchData[type]?.[0]
                                            ?.referenceId}
                                    </Link>
                                  </td>
                                  <td className="ant-table-cell">
                                    {groupByBatchData[type]?.[0]?.status ===
                                      payrollConstants.COMPLETED_STATUS && (
                                      <>
                                        <span>
                                          {/* {payrollConstants.CONFIRMED} */}
                                          25% (Batch created)
                                        </span>
                                        <Progress
                                          percent={25}
                                          showInfo={false}
                                        />
                                      </>
                                    )}
                                    {groupByBatchData[type]?.[0]?.status ===
                                      payrollConstants.CONFIRMED_STATUS && (
                                      <>
                                        <span>
                                          {/* {payrollConstants.CONFIRMED} */}
                                          50% (Confirmed by Bluepencil)
                                        </span>
                                        <Progress
                                          percent={50}
                                          showInfo={false}
                                        />
                                      </>
                                    )}
                                    {groupByBatchData[type]?.[0]?.status ===
                                      payrollConstants.PAID_STATUS &&
                                      !groupByBatchData[type]?.[0]
                                        ?.receivedOrganizationIds && (
                                        <>
                                          <span>
                                            {/* {payrollConstants.CONFIRMED} */}
                                            75% (Paid to Social Organization)
                                          </span>
                                          <Progress
                                            percent={75}
                                            showInfo={false}
                                          />
                                        </>
                                      )}
                                    {(groupByBatchData[type]?.[0]?.status ===
                                      payrollConstants.RECEIVED_STATUS ||
                                      groupByBatchData[type]?.[0]?.status ===
                                        payrollConstants.PAID_STATUS) &&
                                      groupByBatchData[type]?.[0]
                                        ?.receivedOrganizationIds &&
                                      ((!isOrganizationPortal &&
                                        groupByBatchData[
                                          type
                                        ][0].receivedOrganizationIds?.split(",")
                                          ?.length !==
                                          groupByBatchData[type]?.[0]
                                            ?.totalOrganizationCount) ||
                                        (isOrganizationPortal &&
                                          !groupByBatchData[
                                            type
                                          ][0]?.receivedOrganizationIds
                                            ?.split(",")
                                            ?.includes(
                                              groupByBatchData[
                                                type
                                              ]?.[0]?.socialOrganizationId?.toString()
                                            ))) && (
                                        <>
                                          <span>
                                            {/* {payrollConstants.CONFIRMED} */}
                                            {75 +
                                              Math.round(
                                                25 /
                                                  groupByBatchData[type]?.[0]
                                                    ?.totalOrganizationCount
                                              )}
                                            % (Partially received by
                                            organizations)
                                          </span>
                                          <Progress
                                            percent={
                                              75 +
                                              Math.round(
                                                25 /
                                                  groupByBatchData[type]?.[0]
                                                    ?.totalOrganizationCount
                                              )
                                            }
                                            showInfo={false}
                                          />
                                        </>
                                      )}
                                    {groupByBatchData[type]?.[0]?.status ===
                                      payrollConstants.RECEIVED_STATUS &&
                                      ((groupByBatchData[
                                        type
                                      ][0].receivedOrganizationIds?.split(",")
                                        ?.length ===
                                        groupByBatchData[type]?.[0]
                                          ?.totalOrganizationCount &&
                                        !isOrganizationPortal) ||
                                        (isOrganizationPortal &&
                                          groupByBatchData[
                                            type
                                          ][0]?.receivedOrganizationIds
                                            ?.split(",")
                                            ?.includes(
                                              groupByBatchData[
                                                type
                                              ]?.[0]?.socialOrganizationId?.toString()
                                            ))) && (
                                        <>
                                          <span>
                                            {/* {payrollConstants.CONFIRMED} */}
                                            100% (Received by Social
                                            Organization)
                                          </span>
                                          <Progress
                                            percent={100}
                                            showInfo={false}
                                          />
                                        </>
                                      )}
                                  </td>
                                  <td className="ant-table-cell text-center">
                                    {corporateId &&
                                      groupByBatchData[type]?.[0]?.status ===
                                        payrollConstants.PENDING_STATUS && (
                                        <Tooltip title="Complete">
                                          <Link
                                            to="#"
                                            onClick={() =>
                                              handleOpen(
                                                "Complete Batch",
                                                groupByBatchData[type]?.[0]
                                              )
                                            }
                                          >
                                            <span className="bi-check-circle fs-5"></span>
                                          </Link>
                                        </Tooltip>
                                      )}
                                    {!corporateId && !isOrganizationPortal && (
                                      <>
                                        {groupByBatchData[type]?.[0]?.status ===
                                        payrollConstants.CONFIRMED_STATUS ? (
                                          <>
                                            <Tooltip title="Unconfirm">
                                              <Link
                                                to="#"
                                                onClick={() =>
                                                  handleOpen(
                                                    "Unconfirm Batch",
                                                    groupByBatchData[type]?.[0]
                                                  )
                                                }
                                              >
                                                <span className="bi-arrow-counterclockwise fs-5"></span>
                                              </Link>
                                            </Tooltip>
                                            <Tooltip title="Paid">
                                              <Link
                                                to="#"
                                                onClick={() =>
                                                  openPaidConfirmation(
                                                    groupByBatchData[type]?.[0]
                                                  )
                                                }
                                              >
                                                <span className="bi-check-square fs-5 ml-2"></span>
                                              </Link>
                                            </Tooltip>
                                          </>
                                        ) : (
                                          groupByBatchData[type]?.[0]
                                            ?.status ===
                                            payrollConstants.COMPLETED_STATUS && (
                                            <Tooltip title="Confirm">
                                              <Link
                                                to="#"
                                                onClick={() =>
                                                  handleOpen(
                                                    "Confirm Batch",
                                                    groupByBatchData[type]?.[0]
                                                  )
                                                }
                                              >
                                                <span className="bi-check-circle fs-5"></span>
                                              </Link>
                                            </Tooltip>
                                          )
                                        )}
                                      </>
                                    )}
                                    {isOrganizationPortal &&
                                      !groupByBatchData[
                                        type
                                      ][0]?.receivedOrganizationIds
                                        ?.split(",")
                                        ?.includes(
                                          groupByBatchData[
                                            type
                                          ]?.[0]?.socialOrganizationId?.toString()
                                        ) && (
                                        <Tooltip title="Confirm Payment Receipt">
                                          <Link
                                            to="#"
                                            onClick={() =>
                                              handleOpen(
                                                "Receive Batch",
                                                groupByBatchData[type]?.[0]
                                              )
                                            }
                                          >
                                            <img
                                              src="/assets/img/receive.svg"
                                              alt="Receive"
                                              height={20}
                                              className="custom-color"
                                            />
                                          </Link>
                                        </Tooltip>
                                      )}
                                    {isOrganizationPortal &&
                                      groupByBatchData[
                                        type
                                      ][0]?.receivedOrganizationIds
                                        ?.split(",")
                                        ?.includes(
                                          groupByBatchData[
                                            type
                                          ]?.[0]?.socialOrganizationId?.toString()
                                        ) && (
                                        <Tooltip title="Received">
                                          <span className="bi-check-square-fill fs-5"></span>
                                        </Tooltip>
                                      )}
                                  </td>
                                </tr>
                              )
                            )}

                          {!isBluePencilPortal &&
                            !isOrganizationPortal &&
                            allRecords?.map((batch, index) => (
                              <tr
                                key={index + 1}
                                className="ant-table-row ant-table-row-level-0"
                              >
                                {/* <td className="ant-table-cell">
                            {currentPage >= 2
                              ? currentPage * pageSize -
                                pageSize +
                                index +
                                1
                              : index + 1}
                          </td> */}
                                <td className="ant-table-cell">
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      showBatchDetail(batch?.batchId)
                                    }
                                  >
                                    {batch?.batchId}
                                  </Link>
                                </td>
                                {/* {currentView ===
                              payrollConstants.ORGANIZATION_VIEW && (
                              <td className="ant-table-cell">
                                {batch?.socialOrganizationId}
                              </td>
                            )} */}
                                {currentView ===
                                  payrollConstants.ORGANIZATION_VIEW && (
                                  <td className="ant-table-cell">
                                    {batch?.socialOrganizationName}
                                  </td>
                                )}
                                {/* {!corporateId && (
                            <td className="ant-table-cell">
                              {batch?.corporateId}
                            </td>
                          )} */}
                                {!corporateId && (
                                  <td className="ant-table-cell">
                                    {batch?.corporateName}
                                  </td>
                                )}
                                <td className="ant-table-cell">
                                  {batch?.createdDate && moment(batch?.createdDate).format(
                                    "MMM, YYYY"
                                  )}
                                </td>
                                <td className="ant-table-cell">
                                  {batch?.amount?.toLocaleString()}
                                </td>
                                <td className="ant-table-cell">
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      showReferenceNote(batch?.referenceNote)
                                    }
                                  >
                                    {batch?.referenceId}
                                  </Link>
                                </td>
                                <td className="ant-table-cell">
                                  {batch?.status ===
                                    payrollConstants.COMPLETED_STATUS && (
                                    <>
                                      <span>
                                        {/* {payrollConstants.CONFIRMED} */}
                                        25% (Batch created)
                                      </span>
                                      <Progress percent={25} showInfo={false} />
                                    </>
                                  )}
                                  {batch?.status ===
                                    payrollConstants.CONFIRMED_STATUS && (
                                    <>
                                      <span>
                                        {/* {payrollConstants.CONFIRMED} */}
                                        50% (Confirmed by Bluepencil)
                                      </span>
                                      <Progress percent={50} showInfo={false} />
                                    </>
                                  )}
                                  {batch?.status ===
                                    payrollConstants.PAID_STATUS &&
                                    !batch?.receivedOrganizationIds && (
                                      <>
                                        <span>
                                          {/* {payrollConstants.CONFIRMED} */}
                                          75% (Paid to Social Organization)
                                        </span>
                                        <Progress
                                          percent={75}
                                          showInfo={false}
                                        />
                                      </>
                                    )}
                                  {(batch?.status ===
                                    payrollConstants.RECEIVED_STATUS ||
                                    batch.status ===
                                      payrollConstants.PAID_STATUS) &&
                                    batch?.receivedOrganizationIds &&
                                    batch?.receivedOrganizationIds?.split(",")
                                      ?.length !==
                                      batch.totalOrganizationCount && (
                                      <>
                                        <span>
                                          {/* {payrollConstants.CONFIRMED} */}
                                          {75 +
                                            Math.round(
                                              25 / batch?.totalOrganizationCount
                                            )}
                                          % (Partially received by
                                          organizations)
                                        </span>
                                        <Progress
                                          percent={
                                            75 +
                                            Math.round(
                                              25 / batch?.totalOrganizationCount
                                            )
                                          }
                                          showInfo={false}
                                        />
                                      </>
                                    )}
                                  {batch.status ===
                                    payrollConstants.RECEIVED_STATUS &&
                                    batch?.receivedOrganizationIds?.split(",")
                                      ?.length ===
                                      batch?.totalOrganizationCount && (
                                      <>
                                        <span>
                                          {/* {payrollConstants.CONFIRMED} */}
                                          100% (Received by Social Organization)
                                        </span>
                                        <Progress
                                          percent={100}
                                          showInfo={false}
                                        />
                                      </>
                                    )}
                                </td>
                                <td className="ant-table-cell text-center">
                                  {corporateId &&
                                    batch?.status ===
                                      payrollConstants.PENDING_STATUS && (
                                      <Tooltip title="Complete">
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            handleOpen("Complete Batch", batch)
                                          }
                                        >
                                          <span className="bi-check-circle fs-5"></span>
                                        </Link>
                                      </Tooltip>
                                    )}
                                  {!corporateId && !isOrganizationPortal && (
                                    <>
                                      {batch?.status ===
                                      payrollConstants.CONFIRMED_STATUS ? (
                                        <>
                                          <Tooltip title="Unconfirm">
                                            <Link
                                              to="#"
                                              onClick={() =>
                                                handleOpen(
                                                  "Unconfirm Batch",
                                                  batch
                                                )
                                              }
                                            >
                                              <span className="bi-arrow-counterclockwise fs-5"></span>
                                            </Link>
                                          </Tooltip>
                                          <Tooltip title="Paid">
                                            <Link
                                              to="#"
                                              onClick={() =>
                                                openPaidConfirmation(batch)
                                              }
                                            >
                                              <span className="bi-check-square fs-5 ml-2"></span>
                                            </Link>
                                          </Tooltip>
                                        </>
                                      ) : (
                                        batch?.status ===
                                          payrollConstants.COMPLETED_STATUS && (
                                          <Tooltip title="Confirm">
                                            <Link
                                              to="#"
                                              onClick={() =>
                                                handleOpen(
                                                  "Confirm Batch",
                                                  batch
                                                )
                                              }
                                            >
                                              <span className="bi-check-circle fs-5"></span>
                                            </Link>
                                          </Tooltip>
                                        )
                                      )}
                                    </>
                                  )}
                                  {isOrganizationPortal &&
                                    batch?.status !==
                                      payrollConstants.RECEIVED_STATUS && (
                                      <Tooltip title="Confirm Payment Receipt">
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            handleOpen("Receive Batch", batch)
                                          }
                                        >
                                          <img
                                            src="/assets/img/receive.svg"
                                            alt="Receive"
                                            height={20}
                                            className="custom-color"
                                          />
                                        </Link>
                                      </Tooltip>
                                    )}
                                  {isOrganizationPortal &&
                                    batch.status ===
                                      payrollConstants.RECEIVED_STATUS && (
                                      <Tooltip title="Received">
                                        <span className="bi-check-square-fill fs-5"></span>
                                      </Tooltip>
                                    )}
                                </td>
                              </tr>
                            ))}
                          {allRecords?.length === 0 && (
                            <tr>
                              <td className="text-center" colSpan={9}>
                                No data found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

          <Pagination
            className="pagination-bar mt-4"
            currentPage={currentPage}
            totalCount={totalCount ? totalCount : 0}
            pageSize={pageSize}
            onPageChange={(page) => setPage(page)}
          />
          {open && (
            <Modal show={open} onHide={handleClose} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>{actionTitle}</Modal.Title>
              </Modal.Header>
              <Formik
                initialValues={
                  corporateId ? completeInitialValues : confirmInitialValues
                }
                validationSchema={corporateId ? CompleteBatchSchema : null}
                onSubmit={(values) => {
                  confirm(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form>
                    <Modal.Body style={{ fontSize: "18" }}>
                      {ReactHtmlParser(actionContent)}
                      {actionType !== payrollConstants.COMPLETE_BATCH && (
                        <>
                          {/* <div className="row mt-4 mb-2">
                            <div className="col-md-4">
                              <strong>Corporate Name:</strong>
                            </div>
                            <div className="col-md-8">
                              {selectedBatch?.corporateName}
                            </div>
                          </div> */}
                          <div className="row mt-4 mb-2">
                            <div className="col-md-4">
                              <strong>Batch ID:</strong>
                            </div>
                            <div className="col-md-8">
                              {selectedBatch?.batchId}
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <strong>Amount:</strong>
                            </div>
                            <div className="col-md-8">
                              {ReactHtmlParser(
                                donationPreferenceConstants?.CURRENCY
                              )}
                              {records
                                ?.filter(
                                  (item) =>
                                    item?.batchId === selectedBatch?.batchId
                                )
                                ?.reduce(
                                  (total, currentValue) =>
                                    (total = total + currentValue.amount),
                                  0
                                )
                                .toLocaleString()}
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <strong>Payment Date:</strong>
                            </div>
                            <div className="col-md-8">
                              {moment(selectedBatch?.createdDate).format(
                                "MMM, YYYY"
                              )}
                            </div>
                          </div>
                          {(selectedBatch?.referenceId ||
                            selectedBatch?.adminreferenceId) && (
                            <div className="row mb-2">
                              <div className="col-md-4">
                                <strong>Reference ID:</strong>
                              </div>
                              <div className="col-md-8">
                                {isOrganizationPortal
                                  ? selectedBatch?.adminreferenceId
                                  : selectedBatch?.referenceId}
                              </div>
                            </div>
                          )}
                          {(selectedBatch?.referenceId ||
                            selectedBatch?.adminreferenceId) && (
                            <div className="row mb-2">
                              <div className="col-md-4">
                                <strong>Reference Note:</strong>
                              </div>
                              <div className="col-md-8">
                                {isOrganizationPortal
                                  ? selectedBatch?.adminreferenceNote
                                  : selectedBatch?.referenceNote}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {actionType === payrollConstants.COMPLETE_BATCH && (
                        <>
                          <div className="mt-3 mb-0">
                            <strong>Batch ID:</strong>&nbsp;
                            {selectedBatch?.batchId}
                          </div>
                          <div className="mt-3 mb-0">
                            <strong>Total Amount:</strong>&nbsp;
                            {ReactHtmlParser(
                              donationPreferenceConstants?.CURRENCY
                            )}
                            {records
                              ?.filter(
                                (item) =>
                                  item?.batchId === selectedBatch?.batchId
                              )
                              ?.reduce(
                                (total, currentValue) =>
                                  (total = total + currentValue.amount),
                                0
                              )
                              .toLocaleString()}
                          </div>
                          <div className="form-group mt-0">
                            <label>
                              <strong>Reference ID*</strong>
                            </label>
                            <input
                              type="text"
                              name="referenceId"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              maxLength={50}
                              placeholder="Enter reference ID"
                              className="form-control"
                            />
                            <span className="error">
                              {errors.referenceId &&
                                touched.referenceId &&
                                errors.referenceId}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>
                              <strong>Reference Note*</strong>
                            </label>
                            <textarea
                              rows="3"
                              name="referenceNote"
                              value={values?.referenceNote}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              maxLength={500}
                              placeholder="Enter reference note"
                              className="form-control"
                            />
                            <span className="error">
                              {errors.referenceNote &&
                                touched.referenceNote &&
                                errors.referenceNote}
                            </span>
                          </div>
                        </>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="btn btn-custom"
                        type="submit"
                        disabled={
                          isSubmitting ||
                          (corporateId &&
                            (!values.referenceId || !values.referenceNote))
                        }
                      >
                        Yes
                      </Button>
                      <Button variant="danger" onClick={handleClose}>
                        No
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            </Modal>
          )}
          <Modal show={show} onHide={handleCancel} backdrop="static">
            <Modal.Header closeButton className="fs-5 p-2">
              <Modal.Title>Reference Note</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "18" }}>{referenceNote}</Modal.Body>
          </Modal>
          {!corporateId &&
            !isOrganizationPortal &&
            (currentView === payrollConstants.ORGANIZATION_VIEW ||
              currentView === payrollConstants.CORPORATE_VIEW) && (
              <PayrollBatchAccordion
                viewType={currentView}
                showBatchDetail={(e) => showBatchDetail(e)}
                hideBatchDetail={hideBatchDetail}
                allRecords={allRecords}
              />
            )}
        </>
      )}
      {openPaidSimulator && (
        <Modal
          show={openPaidSimulator}
          onHide={hidePaidSimulator}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Paid Confirmation</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={paidInitialValues}
            validationSchema={CompleteBatchSchema}
            onSubmit={(values) => {
              confirmPaid(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <Form>
                <Modal.Body style={{ fontSize: "18" }}>
                  <p>
                    This is a simulating service. Click on the respective button
                    to send the response.
                  </p>
                  <div className="form-group mt-0">
                    <label>
                      <strong>Reference ID*</strong>
                    </label>
                    <input
                      type="text"
                      name="referenceId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={50}
                      placeholder="Enter reference ID"
                      className="form-control"
                    />
                    <span className="error">
                      {errors.referenceId &&
                        touched.referenceId &&
                        errors.referenceId}
                    </span>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Reference Note*</strong>
                    </label>
                    <textarea
                      rows="3"
                      name="referenceNote"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.referenceNote}
                      maxLength={500}
                      placeholder="Enter reference note"
                      className="form-control"
                    />
                    <span className="error">
                      {errors.referenceNote &&
                        touched.referenceNote &&
                        errors.referenceNote}
                    </span>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="submit"
                    variant="success"
                    disabled={!values?.referenceId || !values?.referenceNote}
                  >
                    Simulate Success
                  </Button>
                  <Button variant="danger" onClick={hidePaidSimulator}>
                    Simulate Failure
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
      {isBatchDetail && (
        <PayrollBatchDetail
          batchId={selectedBatchId}
          hideBatchDetail={hideBatchDetail}
        />
      )}
    </div>
  );
};
export default PayrollBatch;
