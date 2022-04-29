import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "./../Validations";
import { Button } from "react-bootstrap";
import "./../../assets/css/loginForm.scss";

const LoginForm = ({ submit, disable }) => {
  // localStorage.clear();
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
              initialValues={{ email: "", password: "" }}
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
                <Form>
                  <h5 className="text-center cardHeading">
                    Login to your account
                  </h5>
                  <div className="form-group m-0">
                    <label>Registered Email ID</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Please enter your registered email"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group m-0">
                    <label>Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
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
