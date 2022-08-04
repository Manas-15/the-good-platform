import React from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import { currentViewActions } from "../../actions";
import { userConstants, viewPortalConstants } from "../../constants";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const loggedInUser = useSelector(
    (state) => state?.employee?.loggedinUserType
  );
  const loggedUser = useSelector((state) => state?.employee?.user);
  console.log(loggedInUser);

  const dispatch = useDispatch();

  {
    (() => {
      if (loggedInUser === userConstants.INDIVIDUAL) {
        return dispatch(
          currentViewActions.currentView(viewPortalConstants.INDIVIDUAL_PORTAL)
        );
      } else if (loggedInUser === userConstants.CORPORATE) {
        dispatch(
          currentViewActions.currentView(viewPortalConstants.OTHERS_PORTAL)
        );
      } else {
        dispatch(
          currentViewActions.currentView(viewPortalConstants.EMPLOYEE_PORTAL)
        );
      }
      // return null;
    })();
  }
  return <EmployeeDashboard />;
};
export default Dashboard;
