import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "./../Validations";

const LoginForm = ({ submit, disable, userType }) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>", userType);
  return (
    <div style={{ width: "350px" }}>
      <Formik
        initialValues={{ email: "", password: "", userType: userType}}
        validationSchema={LoginSchema}
        onSubmit={(values, event) => {
          // storeUser({ ...values });
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
            <h3>Sign In</h3>
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
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="form-control"
                placeholder="Enter password"
              />
              <span className="error">
                {errors.password && touched.password && errors.password}
              </span>
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  &nbsp;Remember me
                </label>
              </div>
            </div>
            <div className="text-center m-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </div>
            {/* {type!=="superadmin" ?  */}
            <p className="forgot-password text-center">
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
            {/* : 
            ''
            }*/}
            <p className="forgot-password text-center">
              Forgot <Link to="/forgot-password">Password?</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
