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
import payrollBatch from "./../../config/payrollBatch.json";
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
const PayrollBatch = () => {
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
  if (preferences.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
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
                      <th className="ant-table-cell">Status</th>
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
                          <td className="ant-table-cell">{batch.corporate}</td>
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
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
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
    </div>
  );
};
export default PayrollBatch;
