import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "./../Validations";

const ForgotPassword = ({ submit, disable, type }) => {
  return (
    <div style={{ width: "350px" }}>
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
            <h3>Forgot Password</h3>
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
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-center">
              Back to Sign In? <Link to="/sign-in">Sign In</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ForgotPassword;
