import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "./../Validations";

const ForgotPassword = ({ submit, disable, type }) => {
  return (
    <>
      <div class="row align-items-center authFormMargin">
        <div class="col-md-6">
          <div class="authForm">
            <h1 class="textHeading">Welcome back to The Good Platform!</h1>
            <p class="textParagraph">
              Enter your registered details here to get started
            </p>
            <img height="350" src="/assets/img/smartphone2.png" />
          </div>
        </div>
        <div class="col-md-5 formStyles">
          <div class="registrationContent forgotRightContent">
            <Formik
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
              }) => (
                <Form>
                  <h5 className="text-center cardHeading">Forgot Password</h5>
                  <p class="authForm text-inverse text-center registartionText">
                    It happens to the best of us, we'll send you a link to reset
                    your password
                  </p>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="form-control"
                      placeholder="Enter email"
                    />
                    <span className="error">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>
                  <div className="text-center m-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn forgotPasswordSubmitButton"
                    >
                      Reset My Password
                    </button>
                  </div>
                  <p className="forgot-password text-center">
                    Don't have an account? <Link to="/sign-up">Sign Up</Link>
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
export default ForgotPassword;
