// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { userActions } from "../../actions";
import { userConstants } from "../../constants";
import { useLocation } from "react-router-dom";
import { history } from "../../helpers";

const Header = () => {
  // let history = useHistory();
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem("user");
    history.push("/superadmin/sign-in");
    // location.reload(true);
    console.log(".......................", history);
    // return { type: userConstants.LOGOUT };
  };
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img
            src="/assets/img/logo.png"
            alt="The Good Platform Logo"
            height={35}
          />
          <h4 className="mb-0 logo-color">The Good Platform</h4>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>
      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
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
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
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
