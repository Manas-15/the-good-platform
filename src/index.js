import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { store } from "./helpers";
import App from "./App";
import { Provider } from "react-redux";
// setup fake backend
import { configureFakeBackend } from "./helpers";
configureFakeBackend();
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
