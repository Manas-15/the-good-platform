import React from "react";
import { useLocation } from "react-router-dom";
import { history } from "../../helpers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const logout = () => {
    // localStorage.removeItem("user");
    localStorage.clear();
    history.push("/");
  };
  const user = useSelector((state) => state.employee.user);
  const showHideLeftSidebar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };  
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img
            src="/assets/img/logo.png"
            alt="The Good Platform Logo"
            height={30}
          />
        </a>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={showHideLeftSidebar}
        ></i>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>
          <li className="nav-item d-block mr-4">
            <img src="/assets/img/help.png" alt="Help"/>
          </li>
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="/assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {user?.name}
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user?.name}</h6>
                <span>{user?.email}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/profile"
                >
                  <i className="bi bi-person"></i>
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/corporates"
                >
                  <i className="bi bi-bookshelf"></i>
                  <span>Corporate Portal</span>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/transactions-history"
                >
                  <i className="bi bi-person-circle"></i>
                  <span>Superadmin Portal</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="javascript:;"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
