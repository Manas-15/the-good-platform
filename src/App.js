import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect } from 'react';
import { alertActions } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { history } from '../src/helpers';
import Header from "./components/layouts/Header";
import Sidebar from "./components/layouts/Sidebar";
import CreateAuthRoutes from "./config/authRoute";
import CreateNonAuthRoutes from "./config/nonAuthRoute";
import { Link } from 'react-router-dom';

const App = () => {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  }, []);
  return (
    <div className="App">
      {
        localStorage.getItem('user')
        ?
          <main id="main" className="main">
            <section className="section dashboard">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Header />
              <Sidebar />
              <CreateAuthRoutes />
            </section>
          </main>
        :
        <>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router>
              <Link className="navbar-brand" to={"/sign-in"}>
                <img src="/assets/img/logo.png" alt="The Good Platform Logo" height={35} style={{float: 'left'}}/>
                <h4 className='mb-0 logo-style'>The Good Platform</h4>
              </Link>
              </Router>
              
            </div>
          </nav>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <CreateNonAuthRoutes />
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
