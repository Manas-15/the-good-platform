import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { transactionsHistoryActions } from "../../actions";
import Loader from "../Shared/Loader";
import * as moment from "moment";
import { paymentConstants } from "../../constants";

const actionInitialValues = {
  userId: "",
  requestType: "",
};
let charityProgramsOption = [];
const paymentStatusOption = [
  { label: "All", value: 0 },
  { label: "Success", value: paymentConstants.PAYMENT_SUCCESS },
  { label: "Failed", value: paymentConstants.PAYMENT_FAILURE },
];
const ListTransactionsHistory = (props) => {
  let history = useHistory();
  const [records, setRecords] = useState([]);
  const transactions = useSelector((state) => state.transactionsHistory);
  const charityPrograms = useSelector((state) => state.charityPrograms);
  const user = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionType, setActionType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(Object);
  const dispatch = useDispatch();
  const employeeId = props?.match?.params?.employeeId;
  console.log("eeeeeeeeeeeeeeeeeeeeeee", employeeId);
  useEffect(() => {
    console.log("eeeeeeeeeee inside eeeeeeeeeeee", employeeId);
    dispatch(
      transactionsHistoryActions.getTransactionsHistory({
        employeeId: employeeId ? employeeId : null,
      })
    );
    setRecords(transactions?.items);
    charityPrograms?.items?.sponser?.forEach((e) => {
      charityProgramsOption.push({ label: e.soicalName, value: e.soicalId });
    });
    charityPrograms?.items?.other?.forEach((e) => {
      charityProgramsOption.push({ label: e.soicalName, value: e.soicalId });
    });
  }, []);
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedEmployee(item);
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${item.name}"</strong>?`
    );
  };
  const confirm = () => {
    handleClose();
    actionInitialValues.userId = selectedEmployee.id;
    actionInitialValues.requestType = actionType;
    // dispatch(employeeActions.employeeAccountRequest(actionInitialValues));
  };

  const handleClose = () => setOpen(false);
  const filter = (type, value) => {
    if (value && value !== "0") {
      setRecords(
        transactions?.items?.filter(
          (record) => record.paymentStatus.toString() === value
        )
      );
    } else {
      setRecords(transactions?.items);
    }
  };
  const downlad = () => {
    dispatch(
      transactionsHistoryActions.download80G({
        employeeId: employeeId ? employeeId : null,
      })
    );
  }
  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-6">
          <h4>Transactions History</h4>
        </div>
        <div className="col-md-6 text-right">
          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="mt-2">Filter By</h6>
            </div>
            {/* <div className="col-md-4">
              <select className="form-select" aria-label="Select Duration">
                <option selected>Organization</option>
                {charityProgramsOption.map((duration, index) => (
                  <option value={duration.value} key={index}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="col-md-6">
              <select
                className="form-select"
                defaultValue={""}
                onChange={(e) => filter("status", e.target.value)}
              >
                <option value={""} key={"default"} disabled>
                  Payment Status
                </option>
                {paymentStatusOption.map((status, index) => (
                  <option value={status.value} key={index}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {transactions.loading && <Loader />}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            {!employeeId && <th>Name</th>}
            <th>Program</th>
            <th>Organization</th>
            {!employeeId && <th>Corporate</th>}
            <th>Transaction ID</th>
            <th>Donation</th>
            <th>Payment Mode</th>
            <th>Payment Status</th>
            <th>Payment Date</th>
            {employeeId && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {records?.length > 0 ? (
            records?.map((transaction, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                {!employeeId && <td>{transaction?.employeeName}</td>}
                <td>{transaction?.charityName}</td>
                <td>{transaction?.socialOrg}</td>
                {!employeeId && <td>{transaction?.corporateName}</td>}
                <td>{transaction?.transactionId}</td>
                <td>{transaction?.amount}</td>
                <td>
                  {transaction?.paymentMethod &&
                    transaction?.paymentMethod.replace(/_/g, " ")}
                </td>
                <td>
                  {transaction?.paymentStatus ===
                  paymentConstants.PAYMENT_SUCCESS ? (
                    <span className="badge badge-success">Success</span>
                  ) : (
                    <span className="badge badge-danger">Failed</span>
                  )}
                </td>
                <td>
                  {transaction?.paymentDate &&
                    transaction?.paymentDate !== "None" &&
                    moment(transaction?.paymentDate).format("DD/MM/YY, h:mm A")}
                </td>
                {employeeId && (
                  <td>
                    {transaction?.paymentStatus ===
                      paymentConstants.PAYMENT_FAILURE && (
                      <Link className="text-decoration-underline" onClick={downlad}>Get 80G</Link>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <div className="row mb-4">
        <div className="col-md-6">
          <p>Showing 1 to 10 of 20 records</p>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <nav aria-label="Page navigation example" className="d-inline-block">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div> */}
    </div>
  );
};
export default ListTransactionsHistory;
