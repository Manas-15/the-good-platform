import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import payrollBatch from "./../../config/payrollBatch.json";
import { Modal, Accordion } from "react-bootstrap";
import "./../../assets/css/payroll.scss";
import Pagination from "./../Shared/Pagination";

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
let pageSize = paginationConstants?.PAGE_SIZE;
let accordionData;
const PayrollBatch = (props) => {
  let history = useHistory();
  const corporateId = props?.match?.params?.corporateId;
  // const payrollBatch = useSelector((state) => state.payrollBatch);
  const employee = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [referenceNote, setReferenceNote] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState();
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
  if (payrollBatch.loading) {
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
    setActionTitle(`${action} ${corporateId ? "Confirmation" : ""}`);
    setActionContent(
      `Are you sure to ${
        corporateId ? "complete" : "confirm"
      } this batch <strong>"${item?.batchId}"</strong>?`
    );
  };
  const handleCancel = () => {
    setShow(false);
  };
  const confirm = () => {
    handleClose();
    // actionInitialValues.userId = selectedCorporate.userId;
    // actionInitialValues.requestType = actionType;
    // dispatch(corporateActions.corporateAccountRequest(actionInitialValues));
  };
  const handleClose = () => setOpen(false);
  const groupBy = (key) => {
    return payrollBatch?.reduce(function (acc, item) {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  };
  if (currentView === payrollConstants.ORGANIZATION_VIEW) {
    accordionData = groupBy("socialOrganization");
  } else if (currentView === payrollConstants.PROGRAM_VIEW) {
    accordionData = groupBy("charityProgram");
  } else {
    accordionData = groupBy("corporateName");
  }
  return (
    <div className="customContainer">
      <div className="row mb-3 payroll">
        <div className="col-md-5">
          <h1 className="ant-typography customHeading">Payroll Batch</h1>
        </div>
      </div>
      {payrollBatch.loading && <Loader />}
      {payrollBatch && (
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
                          <th className="ant-table-cell">Corporate id</th>
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
                        <th className="ant-table-cell">Reference ID</th>
                        <th className="ant-table-cell">Status</th>
                        <th className="ant-table-cell text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {payrollBatch
                        ?.filter((pr) =>
                          corporateId
                            ? pr
                            : pr.status !== payrollConstants.PENDING
                        )
                        .map((batch, index) => (
                          <tr
                            key={index + 1}
                            className="ant-table-row ant-table-row-level-0"
                          >
                            <td className="ant-table-cell">{index + 1}</td>
                            <td className="ant-table-cell">
                              <Link
                                to={{
                                  pathname: "/payroll-setting",
                                  query: { batch: batch },
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
                              {batch?.cratedDate}
                            </td>
                            <td className="ant-table-cell">
                              {batch?.totalAmount.toLocaleString()}
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
                              {batch?.status === payrollConstants.COMPLETED && (
                                <span className="text-success">
                                  {batch?.status}
                                </span>
                              )}
                              {batch?.status === payrollConstants.PENDING && (
                                <span className="text-warning">
                                  {batch?.status}
                                </span>
                              )}
                            </td>

                            <td className="ant-table-cell text-center">
                              {corporateId &&
                                batch?.status === payrollConstants.PENDING && (
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
        <ConfirmationDialog
          open={true}
          title={actionTitle}
          actionType={actionType}
          content={actionContent}
          handleConfirm={() => {
            confirm();
          }}
          handleCancel={() => {
            handleClose();
          }}
        />
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
