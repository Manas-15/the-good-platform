import React from "react";
import { useSelector } from "react-redux";
import  SuperAdminDashboard  from "./SuperAdminDashboard";
import CorporateDashboard  from "./CorporateDashboard";

const Dashboard = () => {
  const user1 = useSelector((state) => state.authentication.user);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("dashboard usersssssssssss", user)
  console.log("dashboard user1aaaaaaaaaaaaa", user1)
  return user?.user_type === 1 ? <SuperAdminDashboard /> : <CorporateDashboard />;
};
export default Dashboard;
