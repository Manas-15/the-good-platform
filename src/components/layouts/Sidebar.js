import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "./../../helpers";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isEmployeeView =
    history.location.pathname.includes("/employees") ||
    history.location.pathname.includes("/employee-donation-preference") ||
    history.location.pathname.includes("/payroll-setting") ||
    history.location.pathname.includes("/payroll-batch");
  const isSuperadminView =
    history.location.pathname === "/transactions-history" ||
    history.location.pathname === "/admin-payroll-batch";
  const isOrganizationView =
    history.location.pathname === "/social-organizations";
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {isEmployeeView ? (
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link "
                to="/corporates/1/employees"
                activeClassName="active"
              >
                <i className="bi bi-people-fill"></i>
                <span>Employees</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link "
                to="/employee-donation-preference"
                activeClassName="active"
              >
                <i className="bi bi-sliders"></i>
                <span>Donation Preference</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link "
                to="/payroll-setting"
                activeClassName="active"
              >
                <i className="bi bi-gear"></i>
                <span>Payroll Setting</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link "
                to={`/corporates/${'1'}/payroll-batch`}
                activeClassName="active"
              >
                <i className="bi bi-hdd-stack"></i>
                <span>Payroll Batch</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            {isSuperadminView ? (
              <>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/transactions-history"
                  activeClassName="active"
                >
                  <i className="bi bi-clock-history"></i>
                  <span>Transactions History</span>
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink
                className="nav-link "
                to={`/admin-payroll-batch`}
                activeClassName="active"
              >
                <i className="bi bi-hdd-stack"></i>
                <span>Payroll Batch</span>
              </NavLink>
            </li>
            </>
            ) : (
              <>
                {isOrganizationView && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      to="/social-organizations"
                      activeClassName="active"
                    >
                      <i className="bi bi-people-fill"></i>
                      <span>Social Organization</span>
                    </NavLink>
                  </li>
                )}
                {!isOrganizationView && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link "
                        to="/dashboard"
                        activeClassName="active"
                      >
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link "
                        to="/charity-programs"
                        activeClassName="active"
                      >
                        <i className="bi bi-heart"></i>
                        <span>Charity Programs</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link "
                        to="/donation-preferences"
                        activeClassName="active"
                      >
                        <i className="bi bi-handbag"></i>
                        <span>Donation Preferences</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link "
                        to={`/employee/${user?.uuid}/transactions-history`}
                        activeClassName="active"
                      >
                        <i className="bi bi-clock-history"></i>
                        <span>Transactions History</span>
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            )}
          </>
        )}
      </ul>
    </aside>
  );
};
export default Sidebar;
