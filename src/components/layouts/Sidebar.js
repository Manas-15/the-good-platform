import React from "react";
import { NavLink } from "react-router-dom";
// import { history } from "../../helpers";
import { userConstants, viewPortalConstants } from "../../constants";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedCorporate = useSelector(
    (state) => state?.selectedCorporate?.corporate
  );
  const corporateLoggedinUser = useSelector((state) => state?.user?.detail);

  const loggedInUser = useSelector((state) => state.user);
  const selectedOrganization = useSelector(
    (state) => state.selectedOrganization
  );
  const currentView = useSelector((state) => state.currentView);
  const isEmployeeView =
    currentView?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const isSuperadminView =
    currentView?.currentView === viewPortalConstants.BLUE_PENCEIL_ADMIN_PORTAL;
  const isOrganizationView =
    currentView?.currentView === viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;

  return (
    <aside id="sidebar" className="sidebar">
      <ul
        className="ant-menu ant-menu-root ant-menu-inline ant-menu-light"
        id="sidebar-nav"
      >
        {isEmployeeView ? (
          <>
            <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
              <span className="ant-menu-title-content">
                <NavLink
                  className=" "
                  to={`/corporates/${selectedCorporate?.id}/employees`}
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
                  to="/social-organizations"
                  activeClassName="active"
                >
                  <img height="16" src="/assets/img/case.png" alt="Case" />
                  <span className="menu-text">Programs</span>
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
                  to={`/corporates/${selectedCorporate?.id}/payroll-batch`}
                  activeClassName="active"
                >
                  <i className="bi bi-hdd-stack"></i>
                  <span className="menu-text">Payroll Batch</span>
                </NavLink>
              </span>
            </li>
            <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
              <span className="ant-menu-title-content">
                <NavLink
                  className=" "
                  to="/account-summary"
                  activeClassName="active"
                >
                  <i className="bi bi-clock-history"></i>
                  <span className="menu-text">Account Summary</span>
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
                      to={{
                        pathname: "/list-corporates",
                        state: { isSuperadminView }
                      }}
                      activeClassName="active"
                    >
                      <i className="bi bi-building"></i>
                      <span className="menu-text">Corporates</span>
                    </NavLink>
                  </span>
                </li>
                <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                  <span className="ant-menu-title-content">
                    <NavLink
                      className=" "
                      to={{
                        pathname: "/list-individuals",
                        state: { isSuperadminView }
                      }}
                      activeClassName="active"
                    >
                      <i className="bi bi-people"></i>
                      <span className="menu-text">Individuals</span>
                    </NavLink>
                  </span>
                </li>
                <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                  <span className="ant-menu-title-content">
                    <NavLink
                      className=" "
                      to="/admin-payroll-batch"
                      activeClassName="active"
                    >
                      <i className="bi bi-hdd-stack"></i>
                      <span className="menu-text">Payroll Batch </span>
                    </NavLink>
                  </span>
                </li>
                <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                  <span className="ant-menu-title-content">
                    <NavLink
                      className=" "
                      to="/direct-payment"
                      activeClassName="active"
                    >
                      <i className="bi bi-credit-card"></i>
                      <span className="menu-text">Direct Payment </span>
                    </NavLink>
                  </span>
                </li>
                <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                  <span className="ant-menu-title-content">
                    <NavLink
                      className=" "
                      to="/account-summary"
                      activeClassName="active"
                    >
                      <i className="bi bi-clock-history"></i>
                      <span className="menu-text">Account Summary</span>
                    </NavLink>
                  </span>
                </li>
              </>
            ) : (
              <>
                {isOrganizationView && (
                  <>
                    {/* <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                      <span className="ant-menu-title-content">
                        <NavLink
                          className=" "
                          to="/social-organizations/account-summary"
                          activeClassName="active"
                        >
                          <i className="bi bi-people-fill"></i>
                          <span className="menu-text">Account Summary</span>
                        </NavLink>
                      </span>
                    </li> */}
                    <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                      <span className="ant-menu-title-content">
                        <NavLink
                          className=" "
                          to={`/organizations/${selectedOrganization?.organization?.id}/payroll-batch`}
                          activeClassName="active"
                        >
                          <i className="bi bi-people-fill"></i>
                          <span className="menu-text">Payroll Batch</span>
                        </NavLink>
                      </span>
                    </li>
                    <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                      <span className="ant-menu-title-content">
                        <NavLink
                          className=" "
                          to={`/organization-account-summary`}
                          activeClassName="active"
                        >
                          <i className="bi bi-clock-history"></i>
                          <span className="menu-text">Account Summary</span>
                        </NavLink>
                      </span>
                    </li>
                  </>
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
                          <img
                            height="20"
                            src="/assets/img/dashboard.png"
                            alt="Dashboard"
                          />
                          <span className="menu-text">Dashboard</span>
                        </NavLink>
                      </span>
                    </li>

                    <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                      <span className="ant-menu-title-content">
                        <NavLink
                          className=" "
                          to="/social-organizations"
                          activeClassName="active"
                        >
                          <img
                            height="16"
                            src="/assets/img/case.png"
                            alt="Case"
                          />
                          <span className="menu-text">Programs</span>
                        </NavLink>
                      </span>
                    </li>
                    {corporateLoggedinUser && (
                      <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                        <span className="ant-menu-title-content">
                          <NavLink
                            className=" "
                            to={`/employee/${user?.userId}/account-summary`}
                            activeClassName="active"
                          >
                            <i className="bi bi-clock-history"></i>
                            <span className="menu-text">Account Summary</span>
                          </NavLink>
                        </span>
                      </li>
                    )}
                    {!corporateLoggedinUser && (
                      <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                        <span className="ant-menu-title-content">
                          <NavLink
                            className=" "
                            to={`/employee/${user?.uuid}/account-summary`}
                            activeClassName="active"
                          >
                            <i className="bi bi-clock-history"></i>
                            <span className="menu-text">Account Summary</span>
                          </NavLink>
                        </span>
                      </li>
                    )}
                    {!corporateLoggedinUser &&
                      loggedInUser?.loggedinUserType !==
                        userConstants.INDIVIDUAL && (
                        <li className="ant-menu-item ant-menu-item-only-child ant-menu-item-inactive">
                          <span className="ant-menu-title-content">
                            <NavLink
                              className=" "
                              to="/donation-preferences"
                              activeClassName="active"
                            >
                              <i className="bi bi-handbag"></i>
                              <span className="menu-text">
                                Donation Preferences
                              </span>
                            </NavLink>
                          </span>
                        </li>
                      )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </ul>
      {/* <div className="left-img">
        <img src="/assets/img/left-img.png" alt="Left Image" />
      </div> */}
    </aside>
  );
};
export default Sidebar;
