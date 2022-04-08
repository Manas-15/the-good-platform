import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => (
    <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <Link className="nav-link " to="/dashboard">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/corporates">
          <i className="bi bi-building"></i>
          <span>Corporates</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/charity-programs">
          <i className="bi bi-heart"></i>
          <span>Charity Programs</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/social-organizations">
          <i className="bi bi-people-fill"></i>
          <span>Social Organization</span>
        </Link>
      </li>
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
)
export default Sidebar;