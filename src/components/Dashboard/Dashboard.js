import React from "react";
import { useSelector } from "react-redux";
import  SuperAdminDashboard  from "./SuperAdminDashboard";
import CorporateDashboard  from "./CorporateDashboard";

const Dashboard = () => {
  const user = useSelector((state) => state.authentication.user);
  return user?.user_type === 1 ? <SuperAdminDashboard /> : <CorporateDashboard />;
};
export default Dashboard;
