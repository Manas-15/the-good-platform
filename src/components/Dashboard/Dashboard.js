import React from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import { currentViewActions } from "../../actions";
import { useDispatch } from "react-redux";
import {
  viewPortalConstants,
} from "../../constants";

const Dashboard = () => {
  const dispatch = useDispatch();
  dispatch(currentViewActions.currentView(viewPortalConstants.EMPLOYEE_PORTAL));
  return <EmployeeDashboard />;
};
export default Dashboard;
