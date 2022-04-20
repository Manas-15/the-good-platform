import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "./../Validations";
import { Button } from "react-bootstrap";

const LoginForm = ({ submit, disable }) => {
  return (
    <div style={{ width: "350px" }}>
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
            <h3>Sign In</h3>
            <div className="form-group m-0">
              <label>Email address</label>
              <Field
                  name="email"
                  type="email"
                  className={
                    "form-control" +
                    (errors.email && touched.email
                      ? " is-invalid"
                      : "")
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
                <label className="custom-control-label" htmlFor="customCheck1">
                  &nbsp;Remember me
                </label>
              </div>
            </div>
            <div className="text-center m-3">
              <Button
                type="submit"
                disabled={disable}
                className="btn btn-primary btn-block"
              >
                Submit
              </Button>
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
};
export default LoginForm;
