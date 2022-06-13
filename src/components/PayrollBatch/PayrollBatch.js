import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Tabs } from "antd";
import "./../../assets/css/payroll.scss";
import Pagination from "./../Shared/Pagination";
import PayrollBatchDetail from "./PayrollBatchDetail";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ReactHtmlParser from "react-html-parser";
import TableData from "./TableData";
import { getLengthHelper } from "../../helpers";
const TabPane = Tabs.TabPane;

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
let pageSize = paginationConstants?.PAGE_SIZE;
let groupByBatchData;
const PayrollBatch = (props) => {
  // let history = useHistory();
  const corporateId = props?.match?.params?.corporateId;
  const organizationId = props?.match?.params?.organizationId;
  const payrollBatches = useSelector((state) => state.payrollBatch);
  const employee = useSelector((state) => state.employee.user);
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
  const [checked, setChecked] = useState(false);
  const [isBatchDetail, setIsBatchDetail] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [updateType, setUpdateType] = useState("");
  const [updatedValue, setUpdatedValue] = useState();
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [records, setRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allRecords, setAllRecords] = useState(records);
  const [selected, setSelected] = useState();

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
    filter("All");
  }, [currentPage]);
  useEffect(() => {
    setRecords(payrollBatches?.items);
    groupByBatchData = groupByBatch();
    const categories = uniqueBy(payrollBatches?.items, "batchId");
  }, [payrollBatches?.items]);
  useEffect(() => {
    setAllRecords(records);
  }, [records]);
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
    { label: "Processed", value: "10" }
  ];
  const openPaidConfirmation = (item) => {
    setOpenPaidSimulator(true);
    setSelectedBatch(item);
  };
  const hidePaidSimulator = () => {
    setOpenPaidSimulator(false);
  };
  const confirmPaid = () => {
    dispatch(
      payrollBatchActions.updateBatchStatus({
        batchId: selectedBatch?.batchId,
        requestType: payrollConstants.PAID
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
      completeInitialValues.referenceNote = `Processed Payroll batch for the month of ${moment().format(
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
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedBatch(null);
    setActionType(null);
  };
  const showBatchDetail = (batchId) => {
    console.log("ddddddddddddddddd showBatchDetail", isBatchDetail);
    setIsBatchDetail(true);
    setSelectedBatchId(batchId);
    console.log("vvvvvvvvvvvvvvvvvbbbbbbbbb showBatchDetail", isBatchDetail);
  };
  const hideBatchDetail = (status) => {
    setIsBatchDetail(status);
    setSelectedBatchId(null);
  };
  const filter = (value) => {
    if (value && value !== "0" && value !== "10") {
      setRecords(
        payrollBatches?.items?.filter(
          (record) => record?.status?.toString() === value
        )
      );
    } else if (value && value === "10") {
      setRecords(
        payrollBatches?.items?.filter(
          (record) => record?.status?.toString() !== value
        )
      );
    } else {
      setRecords(payrollBatches?.items);
    }
  };

  const onSearchChange = (e, selected) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = records.filter((rec) => {
        if (selected === "batchId") {
          return rec?.batchId.toLowerCase().startsWith(keyword.toLowerCase());
        } else if (selected === "corporateName") {
          return rec?.corporateName
            .toLowerCase()
            .startsWith(keyword.toLowerCase());
        } else {
          return rec?.referenceId
            .toLowerCase()
            .startsWith(keyword.toLowerCase());
        }
      });
      setAllRecords(results);
    } else {
      setAllRecords(records);
    }
    setSearchValue(keyword);
  };
  const onHandleChange = (e) => {
    setSelected(e.target.value);
  };
  const uniqueBy = (arr, prop) => {
    return arr?.reduce((a, d) => {
      if (!a.includes(d[prop])) {
        a.push(d[prop]);
      }
      return a;
    }, []);
  };
  const groupByBatch = () => {
    return payrollBatches?.items?.reduce(function (acc, item) {
      (acc[item["batchId"]] = acc[item["batchId"]] || []).push(item);
      return acc;
    }, {});
  };
  if (isBluePencilPortal || isOrganizationPortal) {
    groupByBatchData = groupByBatch();
  }
  return (
    <div className="customContainer">
      {!isBatchDetail && (
        <>
          <div className="row mb-3 payroll">
            <div className="col-md-6">
              <h1 className="ant-typography customHeading">Payroll Batch</h1>
            </div>
            <div className="col-md-6 text-right">
              {isCorporatePortal && (
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="mt-2">Filter By</h6>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      defaultValue={""}
                      onChange={(e) => filter(e.target.value)}
                    >
                      <option value={""} key={"default"} disabled>
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
              {!corporateId && !isOrganizationPortal && (
                <>
                  {isBluePencilPortal && (
                    <Link
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
          {!payrollBatches?.items && (
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
          {records &&
            (corporateId ||
              organizationId ||
              currentView === payrollConstants.LIST_VIEW) && (
              <>
                {/* <div className="row g-2">
                  <div className="col-md d-flex">
                    <div className="col-md-4">
                      <div>
                        <select
                          className="form-select"
                          value={selected}
                          onChange={(e) => onHandleChange(e)}
                        >
                          <option defaultValue>Select Payroll</option>
                          <option value="batchId">BATCH ID</option>
                          <option value="corporateName">CORPORATE NAME</option>
                          <option value="refId">REF ID</option>
                        </select>
                      </div>
                    </div>
                    {selected === "batchId" && (
                      <div className="col-md-4">
                        <div>
                          <input
                            type="name"
                            className="form-control"
                            placeholder="Search by Batch Id"
                            onChange={(e) => onSearchChange(e, selected)}
                            // value=""
                          />
                        </div>
                      </div>
                    )}
                    {selected === "corporateName" && (
                      <div className="col-md-4">
                        <div>
                          <input
                            type="name"
                            className="form-control"
                            placeholder="Search by Corporate Name"
                            onChange={(e) => onSearchChange(e, selected)}
                          />
                        </div>
                      </div>
                    )}
                    {selected === "refId" && (
                      <div className="col-md-4">
                        <div>
                          <input
                            type="name"
                            className="form-control"
                            placeholder="Search by Ref Id"
                            onChange={(e) => onSearchChange(e, selected)}
                            // value=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div> */}
                <div className="ant-row">
                  <div className="ant-col ant-col-24 mt-2">
                    <div className="ant-tabs-nav-wrap program-list">
                      <Tabs defaultActiveKey={"active"}>
                        <TabPane
                          tab={
                            <span>
                              <CloseCircleOutlined className="fs-5" />
                              {"Active"}
                            </span>
                          }
                          key={"active"}
                        >
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
                                      <th className="ant-table-cell">
                                        Corporate Name
                                      </th>
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
                                  {groupByBatchData &&
                                    Object.keys(groupByBatchData)?.map(
                                      (type, index) => (
                                        <>
                                          <TableData
                                            corporateId={corporateId}
                                            organizationId={organizationId}
                                            groupByBatchData={groupByBatchData[
                                              type
                                            ]?.filter?.(
                                              (data) =>
                                                data?.totalOrganizationCount !==
                                                data?.receivedOrganizationIds?.split(
                                                  ","
                                                )?.length
                                            )}
                                            isBatchDetail={(event) =>
                                              showBatchDetail(event)
                                            }
                                          />
                                          {groupByBatchData[type]?.filter?.(
                                            (data) =>
                                              data?.totalOrganizationCount !==
                                              data?.receivedOrganizationIds?.split(
                                                ","
                                              )?.length
                                          )?.length === 0 &&
                                            index === 0 && (
                                              <tr>
                                                <td
                                                  colSpan={7}
                                                  className="text-center"
                                                >
                                                  No data found
                                                </td>
                                              </tr>
                                            )}
                                        </>
                                      )
                                    )}
                                  {/* {getLengthHelper.apply(groupByBatchData[
                                            type
                                          ], 'active') === 0 && (
                                    <tr>
                                      <td colSpan={7}>No data found</td>
                                    </tr>
                                  )} */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* {Object.keys(groupByBatchData)?.map(
                            (type) =>
                              groupByBatchData &&
                              groupByBatchData[type][0]?.totalOrganizationCount
                          )} */}
                        </TabPane>
                        <TabPane
                          tab={
                            <span>
                              <CheckCircleOutlined className="fs-5" />
                              {"Completed"}
                            </span>
                          }
                          key={"completed"}
                        >
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
                                      <th className="ant-table-cell">
                                        Corporate Name
                                      </th>
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
                                  {groupByBatchData &&
                                    Object.keys(groupByBatchData)?.map(
                                      (type, index) => (
                                        <>
                                          <TableData
                                            corporateId={corporateId}
                                            organizationId={organizationId}
                                            groupByBatchData={groupByBatchData[
                                              type
                                            ]?.filter?.(
                                              (data) =>
                                                data?.totalOrganizationCount ===
                                                data?.receivedOrganizationIds?.split(
                                                  ","
                                                )?.length
                                            )}
                                            isBatchDetail={(event) =>
                                              showBatchDetail(event)
                                            }
                                          />
                                          {groupByBatchData[type]?.filter?.(
                                            (data) =>
                                              data?.totalOrganizationCount ===
                                              data?.receivedOrganizationIds?.split(
                                                ","
                                              )?.length
                                          )?.length === 0 &&
                                            index === 0 && (
                                              <tr>
                                                <td
                                                  colSpan={7}
                                                  className="text-center"
                                                >
                                                  No data found
                                                </td>
                                              </tr>
                                            )}
                                        </>
                                      )
                                    )}
                                  {!groupByBatchData && (
                                    <tr>
                                      <td colSpan={9}>No data found</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </>
            )}
          <Pagination
            className="pagination-bar mt-4"
            currentPage={currentPage}
            totalCount={totalCount ? totalCount : 0}
            pageSize={pageSize}
            onPageChange={(page) => setPage(page)}
          />
        </>
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
