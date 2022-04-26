import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../actions";
// import employees from "./../../config/employees.json";

const ListEmployees = (props) => {
  let history = useHistory();
  const corporateId = props?.match?.params?.corporateId;
  const employees = useSelector(state => state.employee);
  const user = useSelector((state) => state.employee.user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(employeeActions.getEmployees({corporateId: corporateId}));
  }, []);
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Employees</h4>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push("/employees/add")}
          >
            Add Employee
          </button>
        </div>
      </div>
      {employees.loading && <em>Loading employees...</em>}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees && employees.items.length > 0
            ?
            employees.map((employee, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>
                  {employee.address
                    .split(",")
                    .reduce((all, cur) => [...all, <br />, cur])}
                </td>
                <td className="text-center">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <span className="bi-three-dots"></span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">Activate</li>
                    <li className="dropdown-header text-start">Deactivate</li>
                  </ul>
                </td>
              </tr>
            ))
            :
            <tr>
              <td colSpan="6" className='text-center'>No employees found</td>
            </tr>
          }
        </tbody>
      </table>
      <div className="row mb-4">
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
      </div>
      <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <div className="icon-box">
                <i className="material-icons">&#xE5CD;</i>
              </div>
              <h4 className="modal-title w-100">Are you sure?</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListEmployees;
