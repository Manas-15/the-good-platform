import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "./../Validations";
import { userActions } from "./../../actions";

const Login = () => (
  <div style={{ width: "350px" }}>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (values.email && values.password) {
          dispatch(userActions.login(values));
        }
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
          <p className="forgot-password text-center">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
          <p className="forgot-password text-center">
            Forgot <Link to="/forgot-password">Password?</Link>
          </p>
        </Form>
      )}
    </Formik>
  </div>
);
export default Login;
