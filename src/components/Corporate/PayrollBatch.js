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
import { Popover, OverlayTrigger } from "react-bootstrap";
import payrollBatch from "./../../config/payrollBatch.json";
import "./../../assets/css/payroll.scss";
import { Button, Modal } from "react-bootstrap";

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
const PayrollBatch = () => {
  let history = useHistory();
  const preferences = useSelector((state) => state.donationPreferences);
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
  if (preferences.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  const showReferenceNote = (referenceNote) => {
    setShow(true);
    setReferenceNote(referenceNote);
  };
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to complete this batch <strong>"${
        item?.batchId
      }"</strong>?`
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
  return (
    <div className="customContainer">
      <div className="row mb-3 payroll">
        <div className="col-md-5">
          <h1 className="ant-typography customHeading">Payroll Batch</h1>
        </div>
      </div>
      {preferences.loading && <Loader />}
      {payrollBatch && (
        <div className="ant-row">
          <div className="ant-col ant-col-24 mt-2">
            <div className="ant-table-wrapper">
              <div className="ant-table">
                <table>
                  <thead className="ant-table-thead">
                    <tr>
                      <th className="ant-table-cell">Sr No.</th>
                      <th className="ant-table-cell">Batch id</th>
                      <th className="ant-table-cell">Crated Date</th>
                      <th className="ant-table-cell text-center">
                        Total Amount
                      </th>
                      <th className="ant-table-cell">Corporate</th>
                      <th className="ant-table-cell">Reference ID</th>
                      <th className="ant-table-cell">Status</th>
                      <th className="ant-table-cell">Action</th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {payrollBatch.length > 0 ? (
                      payrollBatch.map((batch, index) => (
                        <tr
                          key={index + 1}
                          className="ant-table-row ant-table-row-level-0"
                        >
                          <td className="ant-table-cell">{index + 1}</td>
                          <td className="ant-table-cell">{batch?.batchId}</td>
                          <td className="ant-table-cell">
                            {batch?.cratedDate}
                          </td>
                          <td className="ant-table-cell text-center">
                            {ReactHtmlParser(
                              donationPreferenceConstants?.CURRENCY
                            )}
                            {batch.totalAmout}
                          </td>
                          <td className="ant-table-cell">{batch?.corporate}</td>
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
                            {batch?.status === "Completed" && (
                              <span className="text-success">
                                {batch?.status}
                              </span>
                            )}
                            {batch?.status === "Pending" && (
                              <span className="text-warning">
                                {batch?.status}
                              </span>
                            )}
                          </td>
                          <td className="ant-table-cell text-center">
                            {batch?.status === "Pending" && (
                              <Link
                              onClick={() => handleOpen("Complete", batch)}
                              >
                                <span
                                  className="bi-check-circle fs-5"
                                  title="Complete"
                                ></span>
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No batch data found
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
      {open && (
        <ConfirmationDialog
          open={true}
          title={actionTitle}
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
        <Modal.Header closeButton className="fs-5 p-2"><Modal.Title>Reference Note</Modal.Title></Modal.Header>
        <Modal.Body style={{ fontSize: "18" }}>{referenceNote}</Modal.Body>
      </Modal>
    </div>
  );
};
export default PayrollBatch;
