import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import CreateRoutes from "./config/Route";
const otpVerified = JSON.parse(localStorage.getItem("otpVerified"));

const App = () => {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <div className={`App ${otpVerified ? "bg-white" : ""}`}>
      <CreateRoutes />
    </div>
  );
};

export default App;
