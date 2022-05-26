import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { CompleteBatchSchema } from "./../Validations";
import {
  donationPreferenceConstants,
  payrollConstants,
  paginationConstants,
  viewPortalConstants,
} from "../../constants";
import { payrollBatchActions } from "../../actions/payrollBatch.actions";
import Loader from "./../Shared/Loader";
import { Link } from "react-router-dom";
import * as moment from "moment";
import ReactHtmlParser from "react-html-parser";
// import payrollBatch from "./../../config/payrollBatch.json";
import { Modal, Button } from "react-bootstrap";
import "./../../assets/css/payroll.scss";
import Pagination from "./../Shared/Pagination";
import PayrollBatchDetail from "./PayrollBatchDetail";
import { Progress } from "antd";
import PayrollBatchAccordion from "./PayrollBatchAccordion";

const completeInitialValues = {
  batchId: "",
  requestType: "",
  referenceId: "",
  referenceNote: "",
};
const confirmInitialValues = {
  batchId: "",
  requestType: "",
};
let pageSize = paginationConstants?.PAGE_SIZE;
const PayrollBatch = (props) => {
  // let history = useHistory();
  const corporateId = props?.match?.params?.corporateId;
  const organizationId = props?.match?.params?.organizationId;
  const payrollBatches = useSelector((state) => state.payrollBatch);
  const employee = useSelector((state) => state.employee.user);
  const currentPortal = useSelector((state) => state.currentView);
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
  const [currentView, setCurrentView] = useState(
    payrollConstants?.CORPORATE_VIEW
  );
  const isOrganizationView =
    currentPortal?.currentView ===
    viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;
  const isBluePencilView =
    currentPortal?.currentView ===
    viewPortalConstants.BLUE_PENCEIL_ADMIN_PORTAL;
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
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
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
      })
    );
    filter("All");
  }, [currentPage]);
  useEffect(() => {
    setRecords(payrollBatches?.items);
  }, [payrollBatches?.items]);
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
    { label: "Processed", value: "10" },
  ];
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedBatch(item);
    if (isOrganizationView) {
      setActionTitle("Confirm Payment Receipt");
      setActionContent(`Are you sure want to receive this batch payments?`);
    } else {
      setActionTitle(`${action} ${corporateId ? "Confirmation" : ""}`);
      setActionContent(
        `Are you sure to ${
          corporateId
            ? "complete"
            : action == "Confirm Batch"
            ? "confirm"
            : "unconfirm"
        } this batch?`
      );
    }
    if (action === "Complete Batch") {
      completeInitialValues.batchId = item?.batchId;
      completeInitialValues.requestType = payrollConstants.COMPLETE;
    } else if (action === "Receive Batch") {
      confirmInitialValues.batchId = item?.batchId;
      confirmInitialValues.requestType = payrollConstants.RECEIVE;
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
    setIsBatchDetail(true);
    setSelectedBatchId(batchId);
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
              {!corporateId && !isOrganizationView && (
                <>
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
                </>
              )}
            </div>
          </div>
          {payrollBatches.loading && <Loader />}
          {records && (corporateId || organizationId) && (
            <>
              <div className="ant-row">
                <div className="ant-col ant-col-24 mt-2">
                  <div className="ant-table-wrapper">
                    <div className="ant-table">
                      <table>
                        <thead className="ant-table-thead">
                          <tr>
                            <th className="ant-table-cell">Sr No.</th>
                            <th className="ant-table-cell">Batch id</th>
                            {/* {currentView ===
                              payrollConstants.ORGANIZATION_VIEW && (
                              <th className="ant-table-cell">
                                Organization Id
                              </th>
                            )} */}
                            {currentView ===
                              payrollConstants.ORGANIZATION_VIEW && (
                              <th className="ant-table-cell">
                                Organization Name
                              </th>
                            )}
                            {!corporateId && (
                              <th className="ant-table-cell">Corporate ID</th>
                            )}
                            {!corporateId && (
                              <th className="ant-table-cell">Corporate Name</th>
                            )}
                            <th className="ant-table-cell">Crated Date</th>
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
                          {records?.map((batch, index) => (
                            <tr
                              key={index + 1}
                              className="ant-table-row ant-table-row-level-0"
                            >
                              <td className="ant-table-cell">
                                {currentPage >= 2
                                  ? currentPage * pageSize -
                                    pageSize +
                                    index +
                                    1
                                  : index + 1}
                              </td>
                              <td className="ant-table-cell">
                                <Link
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
                              {!corporateId && (
                                <td className="ant-table-cell">
                                  {batch?.corporateId}
                                </td>
                              )}
                              {!corporateId && (
                                <td className="ant-table-cell">
                                  {batch?.corporateName}
                                </td>
                              )}
                              <td className="ant-table-cell">
                                {moment(batch?.createdDate).format("MMM, YYYY")}
                              </td>
                              <td className="ant-table-cell">
                                {batch?.amount?.toLocaleString()}
                              </td>
                              <td className="ant-table-cell">
                                <Link
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
                                  payrollConstants.PAID_STATUS && (
                                  <>
                                    <span>
                                      {/* {payrollConstants.CONFIRMED} */}
                                      75% (Paid to Social Organization)
                                    </span>
                                    <Progress percent={75} showInfo={false} />
                                  </>
                                )}
                                {batch?.status ===
                                  payrollConstants.RECEIVED_STATUS && (
                                  <>
                                    <span>
                                      {/* {payrollConstants.CONFIRMED} */}
                                      100% (Received by Social Organization)
                                    </span>
                                    <Progress percent={100} showInfo={false} />
                                  </>
                                )}
                              </td>
                              <td className="ant-table-cell text-center">
                                {corporateId &&
                                  batch?.status ===
                                    payrollConstants.PENDING_STATUS && (
                                    <Link
                                      onClick={() =>
                                        handleOpen("Complete Batch", batch)
                                      }
                                    >
                                      <span
                                        className="bi-check-circle fs-5"
                                        title="Complete"
                                      ></span>
                                    </Link>
                                  )}
                                {!corporateId && !isOrganizationView && (
                                  <>
                                    {batch?.status ===
                                    payrollConstants.CONFIRMED_STATUS ? (
                                      <>
                                        <Link
                                          onClick={() =>
                                            handleOpen("Unconfirm Batch", batch)
                                          }
                                        >
                                          <span
                                            className="bi-arrow-counterclockwise fs-5"
                                            title="Unconfirm"
                                          ></span>
                                        </Link>
                                        <Link
                                          onClick={() =>
                                            handleOpen("Paid", batch)
                                          }
                                        >
                                          <span
                                            className="bi-box2-heart fs-5 ml-2"
                                            title="Paid"
                                          ></span>
                                        </Link>
                                      </>
                                    ) : (
                                      <Link
                                        onClick={() =>
                                          handleOpen("Confirm Batch", batch)
                                        }
                                      >
                                        <span
                                          className="bi-check-circle fs-5"
                                          title="Confirm"
                                        ></span>
                                      </Link>
                                    )}
                                  </>
                                )}
                                {isOrganizationView && batch?.status !==
                                    payrollConstants.RECEIVED_STATUS && (
                                  <Link
                                    onClick={() =>
                                      handleOpen("Receive Batch", batch)
                                    }
                                  >
                                    <img
                                      src="/assets/img/receive.svg"
                                      alt="Receive"
                                      title="Receive"
                                      height={20}
                                      className="custom-color"
                                    />
                                  </Link>
                                )}
                                {isOrganizationView && batch?.status ===
                                    payrollConstants.RECEIVED_STATUS && (
                                  <button className="btn btn-sm btn-success">Received</button>
                                )}
                              </td>
                            </tr>
                          ))}
                          {records?.length === 0 && (
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
            </>
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
                  isSubmitting,
                }) => (
                  <Form>
                    <Modal.Body style={{ fontSize: "18" }}>
                      {ReactHtmlParser(actionContent)}
                      {actionType !== payrollConstants.COMPLETE_BATCH && (
                        <>
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
                              {selectedBatch?.amount}
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
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <strong>Reference ID:</strong>
                            </div>
                            <div className="col-md-8">
                              {selectedBatch?.referenceId}
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <strong>Reference Note:</strong>
                            </div>
                            <div className="col-md-8">
                              {selectedBatch?.referenceNote}
                            </div>
                          </div>
                        </>
                      )}
                      {actionType === payrollConstants.COMPLETE_BATCH && (
                        <>
                          <div className="form-group">
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
            !isOrganizationView &&
            (currentView === payrollConstants.ORGANIZATION_VIEW ||
              currentView === payrollConstants.CORPORATE_VIEW) && (
              <PayrollBatchAccordion
                viewType={currentView}
                showBatchDetail={(e) => showBatchDetail(e)}
                hideBatchDetail={hideBatchDetail}
              />
            )}
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
