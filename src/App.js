import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect } from "react";
import { alertActions } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../src/helpers";
import CreateAuthRoutes from "./config/authRoute";
import CreateNonAuthRoutes from "./config/nonAuthRoute";

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
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
