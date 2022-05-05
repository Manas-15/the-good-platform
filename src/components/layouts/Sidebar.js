import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "./../../helpers";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isEmployeeView =
    history.location.pathname.includes("/employees") ||
    history.location.pathname.includes("/employee-donation-preference") ||
    history.location.pathname.includes("/payroll-setting");
  const isSuperadminView = history.location.pathname.includes(
    "/transactions-history"
  );
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
          </>
        ) : (
          <>
            {isSuperadminView ? (
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
            ) : (
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
              </>
            )}
          </>
        )}
        {/* {user?.user_type === 1 ? (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link "
              to="/corporates"
              activeClassName="active"
            >
              <i className="bi bi-building"></i>
              <span>Corporates</span>
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
              to="/social-organizations"
              activeClassName="active"
            >
              <i className="bi bi-people-fill"></i>
              <span>Social Organization</span>
            </NavLink>
          </li>
        </>
      ) : ( 
        <li className="nav-item">
          <NavLink
            className="nav-link "
            to="/employees"
            activeClassName="active"
          >
            <i className="bi bi-building"></i>
            <span>Employees</span>
          </NavLink>
        </li>
      )} */}

        {/* <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-menu-button-wide"></i><span>Others</span><i className="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="components-alerts.html">
              <i className="bi bi-circle"></i><span>Alerts</span>
            </a>
          </li>
          <li>
            <a href="components-accordion.html">
              <i className="bi bi-circle"></i><span>Accordion</span>
            </a>
          </li>
          <li>
            <a href="components-badges.html">
              <i className="bi bi-circle"></i><span>Badges</span>
            </a>
          </li>
        </ul>
      </li> */}
      </ul>
    </aside>
  );
};
export default Sidebar;
