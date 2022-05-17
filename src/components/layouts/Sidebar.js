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
    history.location.pathname === "/admin-payroll-batch" ||
    history.location.pathname === "/admin-payroll-setting";
  const isOrganizationView =
    history.location.pathname === "/social-organizations";
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="ant-menu ant-menu-root ant-menu-inline ant-menu-light" id="sidebar-nav">
        {isEmployeeView ? (
          <>
            <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
            <span className="ant-menu-title-content">
              <NavLink
                className=" "
                to="/corporates/1/employees"
                activeClassName="active"
              >
                <i className="bi bi-people-fill"></i>
                <span className="menu-text">Employees</span>
              </NavLink>
              </span>
            </li>
            <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
              <span className="ant-menu-title-content">
              <NavLink
                className=" "
                to="/employee-donation-preference"
                activeClassName="active"
              >
                <i className="bi bi-sliders"></i>
                <span className="menu-text">Donation Preference</span>
              </NavLink>
              </span>
            </li>
            <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
            <span className="ant-menu-title-content">
              <NavLink
                className=" "
                to="/payroll-setting"
                activeClassName="active"
              >
                <i className="bi bi-gear"></i>
                <span className="menu-text">Payroll Setting</span>
              </NavLink>
              </span>
            </li>
            <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
            <span className="ant-menu-title-content">
              <NavLink
                className=" "
                to={`/corporates/${'1'}/payroll-batch`}
                activeClassName="active"
              >
                <i className="bi bi-hdd-stack"></i>
                <span className="menu-text">Payroll Batch</span>
              </NavLink>
              </span>
            </li>
          </>
        ) : (
          <>
            {isSuperadminView ? (
              <>
              <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
              <span className="ant-menu-title-content">
                <NavLink
                  className=" "
                  to="/transactions-history"
                  activeClassName="active"
                >
                  <i className="bi bi-clock-history"></i>
                  <span className="menu-text">Transactions History</span>
                </NavLink>
                </span>
              </li>
              <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
              <span className="ant-menu-title-content">
              <NavLink
                className=" "
                to={`/admin-payroll-batch`}
                activeClassName="active"
              >
                <i className="bi bi-hdd-stack"></i>
                <span className="menu-text">Payroll Batch</span>
              </NavLink>
              </span>
            </li>
            </>
            ) : (
              <>
                {isOrganizationView && (
                  <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                    <span className="ant-menu-title-content">
                    <NavLink
                      className=" "
                      to="/social-organizations"
                      activeClassName="active"
                    >
                      <i className="bi bi-people-fill"></i>
                      <span className="menu-text">Social Organization</span>
                    </NavLink>
                    </span>
                  </li>
                )}
                {!isOrganizationView && (
                  <>
                    <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                    <span className="ant-menu-title-content">
                      <NavLink
                        className=" "
                        to="/dashboard"
                        activeClassName="active"
                      >
                        <img height="20" src="/assets/img/dashboard.png" />
                        <span className="menu-text">Dashboard</span>
                      </NavLink>
                      </span>
                    </li>
                    <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                    <span className="ant-menu-title-content">
                      <NavLink
                        className=" "
                        to="/charity-programs"
                        activeClassName="active"
                      >
                        <img height="16" src="/assets/img/case.png" />
                        <span className="menu-text">Programs</span>
                      </NavLink>
                      </span>
                    </li>
                    <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                    <span className="ant-menu-title-content">
                      <NavLink
                        className=" "
                        to="/donation-preferences"
                        activeClassName="active"
                      >
                        <i className="bi bi-handbag"></i>
                        <span className="menu-text">Donation Preferences</span>
                      </NavLink>
                      </span>
                    </li>
                    <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                    <span className="ant-menu-title-content">
                      <NavLink
                        className=" "
                        to={`/employee/${user?.uuid}/transactions-history`}
                        activeClassName="active"
                      >
                        <i className="bi bi-clock-history"></i>
                        <span className="menu-text">Transactions History</span>
                      </NavLink>
                      </span>
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
