import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../actions";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
import Loader from "./../Shared/Loader";
// import employees from "./../../config/employees.json";
const actionInitialValues = {
  userId: "",
  requestType: "",
};
const ListEmployees = (props) => {
  let history = useHistory();
  const corporateId = props?.match?.params?.corporateId;
  const employees = useSelector((state) => state.employee);
  // const user = useSelector((state) => state.employee.user);
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionType, setActionType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(Object);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(employeeActions.getEmployees({ corporateId: corporateId }));
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
    dispatch(employeeActions.employeeAccountRequest(actionInitialValues));
  };
  const handleClose = () => setOpen(false);
  return (
    <div className="customContainer">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">
            <Link to="/corporates" className="text-decoration-underline">Corporates</Link> / Employees
          </h1>
        </div>
        {/* <div className="col-md-6" style={{ textAlign: "right" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push("/employees/add")}
          >
            Add Employee
          </button>
        </div> */}
      </div>
      <div className="ant-row searchContainer mt-3 py-4 px-4 align-center">
        <div className="ant-col ant-col-24  searchContainer">
          <div className="ant-col ant-col-8">
            <div className="ant-input-affix-wrapper inputFilterInput">
              <span className="ant-input-prefix">
                <i className="bi bi-search"></i>
                <input
                  placeholder="Search by Name"
                  class="ant-input-search"
                  type="text"
                  value=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {employees.actionRequest && <Loader />}
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">Sr No.</th>
                    <th className="ant-table-cell">Name</th>
                    <th className="ant-table-cell">Email</th>
                    <th className="ant-table-cell">Phone</th>
                    <th className="ant-table-cell">Status</th>
                    <th className="ant-table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {employees?.items?.length > 0 ? (
                    employees?.items.map((employee, index) => (
                      <tr
                        key={index + 1}
                        className="ant-table-row ant-table-row-level-0"
                      >
                        <td className="ant-table-cell">{index + 1}</td>
                        <td className="ant-table-cell">
                          <span className="ant-typography font-weight-bold">
                            {employee?.name}
                          </span>
                        </td>
                        <td className="ant-table-cell">{employee?.email}</td>
                        <td className="ant-table-cell">
                          {employee?.contact_number}
                          {/* {employee.address
                    .split(",")
                    .reduce((all, cur) => [...all, <br />, cur])} */}
                        </td>
                        <td className="ant-table-cell text-uppercase">
                          {employee?.isApprove && (
                            <span className="text-success">Approved</span>
                          )}

                          {employee?.isApprove === null && (
                            <span className="text-warning">Pending</span>
                          )}

                          {!employee?.isApprove &&
                            employee?.isApprove !== null && (
                              <span className="text-danger">Rejected</span>
                            )}
                        </td>
                        <td className="ant-table-cell">
                          <a
                            className="icon"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <span className="bi-three-dots"></span>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow actions">
                            {!employee?.isApprove ? (
                              <li
                                className="dropdown-header text-start"
                                onClick={() => handleOpen("Approve", employee)}
                              >
                                <span className="bi-check-circle">
                                  {" "}
                                  Approve
                                </span>
                              </li>
                            ) : null}
                            {employee?.isApprove ||
                            employee?.isApprove === null ? (
                              <li
                                className="dropdown-header text-start"
                                onClick={() => handleOpen("Reject", employee)}
                              >
                                <span className="bi-x-circle"> Reject</span>
                              </li>
                            ) : null}
                          </ul>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};
export default ListEmployees;
