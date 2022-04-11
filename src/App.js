import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect } from "react";
import CreateAuthRoutes from "./config/authRoute";
import CreateNonAuthRoutes from "./config/nonAuthRoute";

const App = () => {
  useEffect(() => {
    console.log("cccccccccccccccccc after success")
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <div className="App">
      {localStorage.getItem("user") ? (
        <CreateAuthRoutes />
      ) : (
        <CreateNonAuthRoutes />
      )}
    </div>
  );
};

export default App;
