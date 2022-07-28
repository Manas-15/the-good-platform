import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { LoginSchema } from "../Validations";
import { Button } from "react-bootstrap";
import "./../../assets/css/loginForm.scss";
import { useLocation } from "react-router-dom";
import { history } from "../../helpers";
import CryptoJS from "crypto-js";

const LoginForm = ({ submit, disable }) => {
  const location = useLocation();
  const str = location?.search;

  //log decrypted Data

  useEffect(() => {
    console.log("11111111111111111111");
    const newStr = str.split("?token=");
    const newData = newStr[1];
    console.log(newData);
    if (newData) {
      var bytes = CryptoJS.AES.decrypt(newData, "my-secret-key@123");
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData, "decrypted Data -");

      localStorage.setItem("user", JSON.stringify(decryptedData));
      localStorage.setItem("otpVerified", true);
      console.log(decryptedData.corporateId);
    }
  }, [str]);

  const [category, setCategory] = useState("Employee");
  const [showPassword, setShowPassword] = useState("false");

  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="row align-items-center authFormMargin">
        <div className="col-md-6">
          <div className="authForm">
            <h1 className="textHeading">Welcome back to The Good Platform!</h1>
            <p className="textParagraph">
              Enter your registered details here to get started
            </p>
            <img
              height="350"
              src="/assets/img/smartphone2.png"
              alt="SmartPhone"
            />
          </div>
        </div>
        <div className="col-md-5 formStyles">
          <div className="registrationContent ">
            <Formik
              enableReinitialize
              initialValues={{ email: "", password: "", loginType: category }}
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
                      <Field
                        type="radio"
                        name="employee"
                        value="Employee"
                        checked={category === "Employee"}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <strong>
                        <span className="ml-2">Employee</span>
                      </strong>
                    </label>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="others"
                        value="Others"
                        checked={category === "Others"}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <strong>
                        <span className="ml-2">Others</span>
                      </strong>
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="individual"
                        value="Individual"
                        checked={category === "Individual"}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <strong>
                        <span className="ml-2">Individual</span>
                      </strong>
                    </label>
                  </div>
                  <div className="form-group m-0">
                    <label htmlFor="email" className="has-float-label">
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
                    <label htmlFor="password" className="has-float-label">
                      <Field
                        name="password"
                        id="password"
                        type={showPassword ? "password" : "text"}
                        placeholder=" "
                        className={
                          "form-control" +
                          (errors.password && touched.password
                            ? " is-invalid"
                            : "")
                        }
                      />

                      {showPassword ? (
                        <div onClick={(e) => toggleShowPassword(e)}>
                          <i className="bi bi-eye-slash"></i>
                        </div>
                      ) : (
                        <div onClick={(e) => toggleShowPassword(e)}>
                          <i className="bi bi-eye"></i>
                        </div>
                      )}

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
                    A new user?&nbsp;
                    {(() => {
                      if (category === "Employee") {
                        return (
                          <Link
                            to={{
                              pathname: "/employees/sign-up",
                              state: category,
                            }}
                            className="loginhere-link"
                          >
                            Create an account
                          </Link>
                        );
                      } else if (category === "Others") {
                        return (
                          <Link
                            to={{
                              pathname: "/others/sign-up",
                              state: category,
                            }}
                            className="loginhere-link"
                          >
                            Create an account
                          </Link>
                        );
                      } else if (category === "Individual") {
                        return (
                          <Link
                            to={{
                              pathname: "/individual/sign-up",
                              state: category,
                            }}
                            className="loginhere-link"
                          >
                            Create an account
                          </Link>
                        );
                      }

                      return null;
                    })()}
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
