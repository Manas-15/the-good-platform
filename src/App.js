import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect } from "react";
import CreateRoutes from "./config/Route";

const App = () => {
  useEffect(() => {
    console.log("cccccccccccccccccc after success")
    // history.push('/dashboard');
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <div className="App">
        <CreateRoutes />
    </div>
  );
};

export default App;
