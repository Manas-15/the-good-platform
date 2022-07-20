import React, { useState } from "react";
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
// import Loader from "./../Shared/Loader";
import { Link } from "react-router-dom";
import * as moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Modal, Button } from "react-bootstrap";
import "./../../assets/css/payroll.scss";
import Pagination from "./../Shared/Pagination";
import { Progress, Tooltip } from "antd";
import { ProcessHelper } from "./../../helpers";
import { Accordion } from "react-bootstrap";
import PayrollBatchDetail from "./PayrollBatchDetail";

const confirmInitialValues = {
  batchId: "",
  requestType: ""
};
let pageSize = paginationConstants?.PAGE_SIZE;
let accordionData;
const paidInitialValues = {
  batchId: "",
  requestType: "",
  referenceId: "",
  referenceNote: ""
};
const PayrollBatchAccordion = (props) => {
  // let history = useHistory();
  // const payrollBatches = useSelector((state) => state.payrollBatch);
  const currentPortal = useSelector((state) => state.currentView);
  // const batchId = props?.batchId;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [referenceNote, setReferenceNote] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  // const [checked, setChecked] = useState(false);
  const [isBatchDetail, setIsBatchDetail] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(false);
  const [openPaidSimulator, setOpenPaidSimulator] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const currentView = props?.viewType;
  const isOrganizationView =
    currentPortal?.currentView ===
    viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;
  const isBluePencilPortal =
    currentPortal?.currentView ===
    viewPortalConstants.BLUE_PENCEIL_ADMIN_PORTAL;
  // const isOrganizationPortal =
  //   currentPortal?.currentView ===
  //   viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;
  // const isCorporatePortal =
  //   currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  // const [currentView, setCurrentView] = useState(props?.viewType);
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
      `Are you sure you wnat to ${action.toLowerCase()} <strong>"${
        item?.charityProgram
      }"</strong>?`
    );
  };
  const showReferenceNote = (referenceNote) => {
    setShow(true);
    setReferenceNote(referenceNote);
  };
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedBatch(item);
    if (isOrganizationView) {
      setActionTitle("Confirm Payment Receipt");
      setActionContent(`Are you sure you want to receive this batch payments?`);
    } else {
      setActionTitle(`${action}`);
      setActionContent(
        `Are you sure you want to ${
          action == "Confirm Batch" ? "confirm" : "unconfirm"
        } this batch?`
      );
    }
    confirmInitialValues.batchId = item?.batchId;
    if (action === "Confirm Batch") {
      confirmInitialValues.requestType = payrollConstants.CONFIRM;
    } else {
      confirmInitialValues.requestType = payrollConstants.UNCONFIRM;
    }
  };
  const handleCancel = () => {
    setShow(false);
  };
  const confirm = (values) => {
    handleClose();
    dispatch(payrollBatchActions.updateBatchStatus(values));
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedBatch(null);
    setActionType(null);
  };
  const openPaidConfirmation = (item) => {
    setOpenPaidSimulator(true);
    setSelectedBatch(item);
  };
  const hidePaidSimulator = () => {
    setOpenPaidSimulator(false);
  };
  // const showBatchDetail = (batchId) => {
  //   // props?.isBatchDetail = true
  //   setIsBatchDetail(true);
  //   setSelectedBatchId(batchId);
  // };
  // const hideBatchDetail = (status) => {
  //   setIsBatchDetail(status);
  //   setSelectedBatchId(null);
  // };

  const groupBy = (key) => {
    return props?.allRecords?.reduce(function (acc, item) {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  };
  if (props?.viewType === payrollConstants.ORGANIZATION_VIEW) {
    accordionData = groupBy("socialOrganizationName");
  } else {
    accordionData = groupBy("corporateName");
  }
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

  const resultAccordionData = (key) => {
    return Object.values(
      key.reduce(
        (
          c,
          {
            batchId,
            amount,
            batchDate,
            category,
            charityProgram,
            corporateName,
            frequency,
            referenceId,
            referenceNote,
            socialOrganizationName,
            status,
            totalOrganizationCount,
            receivedOrganizationIds
          }
        ) => {
          const temp = {
            batchId,
            amount: 0,
            batchDate: "",
            category: "",
            charityProgram: "",
            corporateName: "",
            frequency: 0,
            referenceId: "",
            referenceNote: "",
            socialOrganizationName: "",
            status: 1,
            totalOrganizationCount: 0,
            receivedOrganizationIds: ""
          };
          c[batchId] = c[batchId] || temp;
          c[batchId].amount += amount;
          c[batchId].batchDate = batchDate;
          c[batchId].corporateName = corporateName;
          c[batchId].referenceId = referenceId;
          c[batchId].referenceNote = referenceNote;
          c[batchId].charityProgram = charityProgram;
          c[batchId].socialOrganizationName = socialOrganizationName;
          c[batchId].status = status;
          c[batchId].totalOrganizationCount = totalOrganizationCount;
          c[batchId].receivedOrganizationIds = receivedOrganizationIds;
          return c;
        },
        {}
      )
    );
  };

  return (
    <>
      {accordionData && !isBatchDetail && (
        <>
          {Object.keys(accordionData).map((type, index) => (
            <div className="row mt-4" key={index}>
              {ProcessHelper(accordionData[type], " ")?.length > 0 ? (
                <Accordion defaultActiveKey={index} className="Payroll">
                  <Accordion.Item eventKey={0}>
                    <Accordion.Header>
                      {type} &nbsp;&#45;&nbsp;
                      {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                      {accordionData[type]
                        ? ProcessHelper(accordionData[type], " ")
                            ?.reduce(
                              (total, currentValue) =>
                                (total = total + currentValue.amount),
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
                                    {/* <th className="ant-table-cell">Sr No.</th> */}
                                    <th className="ant-table-cell">Batch id</th>
                                    {!isBluePencilPortal &&
                                      currentView ===
                                        payrollConstants.CORPORATE_VIEW && (
                                        <th className="ant-table-cell">
                                          Organization
                                        </th>
                                      )}
                                    {currentView ===
                                      payrollConstants.ORGANIZATION_VIEW && (
                                      <th className="ant-table-cell">
                                        Corporate
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
                                  {resultAccordionData(
                                    accordionData[type]
                                  )?.map((batch, index) => (
                                    <tr
                                      key={index + 1}
                                      className="ant-table-row ant-table-row-level-0"
                                    >
                                      <td className="ant-table-cell">
                                        <Link
                                          onClick={() =>
                                            props?.showBatchDetail(
                                              batch?.batchId
                                            )
                                          }
                                        >
                                          {batch?.batchId}
                                        </Link>
                                      </td>

                                      {!isBluePencilPortal &&
                                        currentView ===
                                          payrollConstants.CORPORATE_VIEW && (
                                          <td className="ant-table-cell">
                                            {batch?.socialOrganizationName}
                                          </td>
                                        )}

                                      {currentView ===
                                        payrollConstants.ORGANIZATION_VIEW && (
                                        <td className="ant-table-cell">
                                          {batch?.corporateName}
                                        </td>
                                      )}
                                      <td className="ant-table-cell">
                                        {moment(batch?.createdDate).format(
                                          "MMM, YYYY"
                                        )}
                                      </td>
                                      <td className="ant-table-cell">
                                        {batch?.amount?.toLocaleString()}
                                      </td>
                                      <td className="ant-table-cell">
                                        <Link
                                          onClick={() =>
                                            showReferenceNote(
                                              batch?.referenceNote
                                            )
                                          }
                                        >
                                          {batch?.referenceId}
                                        </Link>
                                      </td>
                                      <td className="ant-table-cell">
                                        {batch?.status ===
                                          payrollConstants.COMPLETED_STATUS && (
                                          <>
                                            <span>25% (Batch created)</span>
                                            <Progress
                                              percent={25}
                                              showInfo={false}
                                            />
                                          </>
                                        )}
                                        {batch?.status ===
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
                                        {batch?.status ===
                                          payrollConstants.PAID_STATUS &&
                                          !batch?.receivedOrganizationIds && (
                                            <>
                                              <span>
                                                {/* {payrollConstants.CONFIRMED} */}
                                                75% (Paid to Social
                                                Organization)
                                              </span>
                                              <Progress
                                                percent={75}
                                                showInfo={false}
                                              />
                                            </>
                                          )}
                                        {(batch?.status ===
                                          payrollConstants.RECEIVED_STATUS ||
                                          batch?.status ===
                                            payrollConstants.PAID_STATUS) &&
                                          batch?.receivedOrganizationIds &&
                                          batch?.receivedOrganizationIds?.split(
                                            ","
                                          )?.length !==
                                            batch?.totalOrganizationCount && (
                                            <>
                                              <span>
                                                {/* {payrollConstants.CONFIRMED} */}
                                                {75 +
                                                  Math.round(
                                                    25 /
                                                      batch?.totalOrganizationCount
                                                  )}
                                                % (Partially received by
                                                organizations)
                                              </span>
                                              <Progress
                                                percent={
                                                  75 +
                                                  Math.round(
                                                    25 /
                                                      batch?.totalOrganizationCount
                                                  )
                                                }
                                                showInfo={false}
                                              />
                                            </>
                                          )}
                                        {batch?.status ===
                                          payrollConstants.RECEIVED_STATUS &&
                                          batch?.receivedOrganizationIds?.split(
                                            ","
                                          )?.length ===
                                            batch?.totalOrganizationCount && (
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
                                        {batch?.status ===
                                        payrollConstants.CONFIRMED_STATUS ? (
                                          <>
                                            <Tooltip title="Unconfirm">
                                              <Link
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
                initialValues={confirmInitialValues}
                validationSchema={null}
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
                          <div className="row mt-4 mb-2">
                            <div className="col-md-4">
                              <strong>Corporate Name:</strong>
                            </div>
                            <div className="col-md-8">
                              {selectedBatch?.corporateName}
                            </div>
                          </div>
                          <div className="row mb-2">
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
                              {selectedBatch?.amount?.toLocaleString()}
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
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="btn btn-custom"
                        type="submit"
                        disabled={isSubmitting}
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
                        This is a simulating service. Click on the respective
                        button to send the response.
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
                    </Modal.Body>
                    <Modal.Footer>
                      <Button type="submit" variant="success">
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
          <Modal show={show} onHide={handleCancel} backdrop="static">
            <Modal.Header closeButton className="fs-5 p-2">
              <Modal.Title>Reference Note</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "18" }}>{referenceNote}</Modal.Body>
          </Modal>
        </>
      )}
      {/* {props?.allRecords?.length === 0 && (
        <div className="card text-center m-4 p-4">
          {isOrganizationPortal && (
            <strong>
              No Payroll donation batch created by the Blue Pencil Admin till
              now.
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
      )} */}
      {isBatchDetail && (
        <PayrollBatchDetail
          batchId={selectedBatchId}
          hideBatchDetail={() => props?.hideBatchDetail()}
        />
      )}
    </>
  );
};
export default PayrollBatchAccordion;
