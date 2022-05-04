import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { transactionsHistoryActions } from "../../actions";
import Loader from "../Shared/Loader";
import transactions from "./../../config/transactions.json";
import * as moment from "moment";
import { paymentConstants } from "../../constants";

const actionInitialValues = {
  userId: "",
  requestType: "",
};
const ListTransactionsHistory = (props) => {
  let history = useHistory();
  const transactions = useSelector((state) => state.transactionsHistory);
  const user = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionType, setActionType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(Object);
  const [records, setRecords] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(transactionsHistoryActions.getTransactionsHistory());
    setRecords(transactions?.items);
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
  const filter = (type) => {
    console.log("typeeeeeeeeeeeeeee", type, transactions?.items);
    let filterData = [];
    // filterData = transactions?.items?.map((transaction) =>
    //   {return transaction?.paymentStatus = (type === paymentConstants.SUCCESS ? 2 : 3)}

    // )
    setRecords(filterData);
  };
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Transactions History</h4>
        </div>
        <div className="col-md-6 text-right">
          {/* <a className="icon" href="#" data-bs-toggle="dropdown" title="Filter">
            <span className="bi-funnel-fill"></span>
          </a> */}
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow actions">
            <li
              className="dropdown-header text-start"
              onClick={() => filter(paymentConstants?.SUCCESS)}
            >
              Payment Success
            </li>
            {/* <li
              className="dropdown-header text-start"
              onClick={() => filter(paymentConstants?.PENDING)}
            >
              Payment Pending
            </li> */}
            <li
              className="dropdown-header text-start"
              onClick={() => filter(paymentConstants?.FAILED)}
            >
              Payment Failed
            </li>
          </ul>
        </div>
      </div>
      {transactions.loading && <Loader />}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            <th>Name</th>
            <th>Program</th>
            <th>Organization</th>
            <th>Corporate</th>
            <th>Transaction ID</th>
            <th>Donation</th>
            <th>Payment Mode</th>
            <th>Payment Status</th>
            <th>Payment Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.items?.length > 0 ? (
            transactions?.items?.map((transaction, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{transaction?.employeeName}</td>
                <td>{transaction?.charityName}</td>
                <td>{transaction?.socialOrg}</td>
                <td>{transaction?.corporateName}</td>
                <td>{transaction?.transactionId}</td>
                <td>{transaction?.amount}</td>
                <td>{transaction?.paymentMethod && transaction?.paymentMethod.replace(/_/g," ")}</td>
                <td>
                  {transaction?.paymentStatus === 2 ? "Success" : "Failed"}
                </td>
                <td>
                  {transaction?.paymentDate &&
                    transaction?.paymentDate !== "None" &&
                    moment(transaction?.paymentDate).format("DD/MM/YY, h:mm A")}
                </td>
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
