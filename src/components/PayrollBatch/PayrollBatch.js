import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { CompleteBatchSchema } from "./../Validations";
import {
  donationPreferenceConstants,
  payrollConstants,
  paginationConstants,
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
  let history = useHistory();
  const corporateId = props?.match?.params?.corporateId;
  const payrollBatches = useSelector((state) => state.payrollBatch);
  const employee = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [referenceNote, setReferenceNote] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [updateType, setUpdateType] = useState("");
  const [updatedValue, setUpdatedValue] = useState();
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [currentView, setCurrentView] = useState(
    corporateId
      ? payrollConstants?.ORGANIZATION_VIEW
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
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
      })
    );
  }, [currentPage]);
  if (payrollBatches.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  const showReferenceNote = (referenceNote) => {
    setShow(true);
    setReferenceNote(referenceNote);
  };
  // useEffect(() => {
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>")
  //   if(!corporateId){
  //     payrollBatch.filter((pr)=>pr.status !== "Pending")
  //   }
  // }, [payrollBatch]);

  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedBatch(item);
    setActionTitle(`${action} ${corporateId ? "Confirmation" : ""}`);
    setActionContent(
      `Are you sure to ${
        corporateId
          ? "complete"
          : action == "Confirm Batch"
          ? "confirm"
          : "unconfirm"
      } this batch <strong>"${item?.batchId}"</strong>?`
    );
    if (action === "Complete Batch") {
      completeInitialValues.batchId = item?.batchId;
      completeInitialValues.requestType = payrollConstants.COMPLETE;
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
  return (
    <div className="customContainer">
      <div className="row mb-3 payroll">
        <div className="col-md-5">
          <h1 className="ant-typography customHeading">Payroll Batch</h1>
        </div>
      </div>
      {payrollBatches.loading && <Loader />}
      {payrollBatches && (
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
                        <th className="ant-table-cell text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {payrollBatches?.items
                        ?.filter((pr) =>
                          corporateId
                            ? pr
                            : pr.status !== payrollConstants.PENDING_STATUS
                        )
                        .map((batch, index) => (
                          <tr
                            key={index + 1}
                            className="ant-table-row ant-table-row-level-0"
                          >
                            <td className="ant-table-cell">
                              {currentPage >= 2
                                ? currentPage * pageSize - pageSize + index + 1
                                : index + 1}
                            </td>
                            <td className="ant-table-cell">
                              <Link
                                to={{
                                  pathname: `${
                                    corporateId
                                      ? "/payroll-setting"
                                      : "/admin-payroll-setting"
                                  }`,
                                  query: { batchId: batch?.batchId },
                                }}
                              >
                                {batch?.batchId}
                              </Link>
                            </td>
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
                            <td className="ant-table-cell text-uppercase">
                              {batch?.status ===
                                payrollConstants.COMPLETED_STATUS && (
                                <span className="text-success">
                                  {payrollConstants.COMPLETED}
                                </span>
                              )}
                              {batch?.status ===
                                payrollConstants.PENDING_STATUS && (
                                <span className="text-warning">
                                  {payrollConstants.PENDING}
                                </span>
                              )}
                              {batch?.status ===
                                payrollConstants.CONFIRMED_STATUS && (
                                <span className="text-info">
                                  {payrollConstants.CONFIRMED}
                                </span>
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
                              {!corporateId && (
                                <>
                                  {batch?.status ===
                                  payrollConstants.CONFIRMED_STATUS ? (
                                    <Link
                                      onClick={() =>
                                        handleOpen("Unconfirm Batch", batch)
                                      }
                                    >
                                      <span
                                        className="bi-x-circle fs-5"
                                        title="Unconfirm"
                                      ></span>
                                    </Link>
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
                            </td>
                          </tr>
                        ))}
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
                    variant="primary"
                    type="submit"
                    disabled={
                      isSubmitting ||
                      (corporateId &&
                        (!values.referenceId || !values.referenceNote))
                    }
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
        // <ConfirmationDialog
        //   open={true}
        //   title={actionTitle}
        //   actionType={actionType}
        //   content={actionContent}
        //   handleConfirm={() => {
        //     confirm();
        //   }}
        //   handleCancel={() => {
        //     handleClose();
        //   }}
        // />
      )}
      <Modal show={show} onHide={handleCancel} backdrop="static">
        <Modal.Header closeButton className="fs-5 p-2">
          <Modal.Title>Reference Note</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "18" }}>{referenceNote}</Modal.Body>
      </Modal>
    </div>
  );
};
export default PayrollBatch;
