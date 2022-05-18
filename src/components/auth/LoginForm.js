import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "./../Validations";
import { Button } from "react-bootstrap";
import "./../../assets/css/loginForm.scss";
// import { Form, Input, Button, Checkbox } from 'antd';

const LoginForm = ({ submit, disable }) => {
  return (
    <>
      <div className="row align-items-center authFormMargin">
        <div className="col-md-6">
          <div className="authForm">
            <h1 className="textHeading">Welcome back to The Good Platform!</h1>
            <p className="textParagraph">
              Enter your registered details here to get started
            </p>
            <img height="350" src="/assets/img/smartphone2.png" />
          </div>
        </div>
        <div className="col-md-5 formStyles">
          <div className="registrationContent ">
            <Formik
              enableReinitialize
              initialValues={{ email: "", password: "", loginType: "Employee" }}
              validationSchema={LoginSchema}
              onSubmit={(values, event) => {
                submit(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form autoComplete="false">
                  <h5 className="text-center cardHeading mb-0">
                    Login to your account
                  </h5>
                  <div
                    className="text-center"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <label className="mr-4">
                      <Field type="radio" name="loginType" value="Employee" />
                      <strong>
                        <span className="ml-2">Employee</span>
                      </strong>
                    </label>
                    <label>
                      <Field type="radio" name="loginType" value="Others" />
                      <strong>
                        <span className="ml-2">Others</span>
                      </strong>
                    </label>
                  </div>
                  <div className="form-group m-0">
                    <label for="email" className="has-float-label">
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      placeholder=" "
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                      <span>Registered Email ID</span>
                    </label>                    
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group m-0">
                    <label for="password" className="has-float-label">
                    <Field
                      name="password"
                      id="password"
                      type="password"
                      placeholder=" "
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    {/* <i class="bi bi-eye-slash fs-5" id="togglePassword"></i> */}
                    <span>Password</span>
                    </label>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        &nbsp;Remember me
                      </label>
                    </div>
                  </div>
                  <div className="text-center m-3">
                    <Button
                      type="submit"
                      disabled={disable}
                      className="btn loginButton"
                    >
                      {disable && (
                        <span className="spinner-border spinner-border-sm disable-login"></span>
                      )}
                      Login
                    </Button>
                  </div>
                  <div className="mt-2 text-center">
                    <Link
                      to="/forgot-password"
                      className="forgotPasswordButton"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <p className="mt-3 text-center">
                    A new user?{" "}
                    <Link to="/sign-up" className="loginhere-link">
                      Create an account
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
