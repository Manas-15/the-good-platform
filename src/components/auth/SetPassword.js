import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { SetPasswordSchema } from "./../Validations";
import PasswordField from "./../Shared/PasswordField";
import { employeeActions } from "./../../actions";
import { useDispatch } from "react-redux";

const SetPassword = ({ submit, disable, type }) => {
  const dispatch = useDispatch();
  const [passwordValid, setIsPasswordValid] = useState(false);
  const [passwordConfirmationValid, setIsPasswordConfirmationValid] =
    useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);
  const handlePasswordValid = (type) => {
    type === "password"
      ? setIsPasswordValid(true)
      : setIsPasswordConfirmationValid(true);
  };
  const toggleShowPassword = (type) => {
    if (type === "password") {
      setPasswordShown(!passwordShown);
    } else {
      setPasswordConfirmationShown(!passwordConfirmationShown);
    }
  };
  const setPassword = (values) => {
    console.log(
      "<<<<<<<<<<< Setting employee password >>>>>>>>>>>>>>>",
      values
    );
    if (values.password && values.passwordConfirmation) {
      console.log("create coming corporate", values);
      dispatch(employeeActions.setEmployeePassword(values));
    }
  };
  return (
    <div style={{ width: "350px" }}>
      <Formik
        initialValues={{ password: "", passwordConfirmation: "" }}
        validationSchema={SetPasswordSchema}
        onSubmit={(values, event) => {
          setPassword(values);
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
          <Form autoComplete="nope">
            <h3>Set Password</h3>
            <div className="form-group">
              <div className="row">
                <div className="col-md-10">
                  <label>
                    <strong>Create your password</strong>
                  </label>
                </div>
                <div className="col-md-2 text-right mt-4">
                  <Link onClick={() => toggleShowPassword("password")}>
                    <span
                      className={
                        passwordShown
                          ? "bi-eye-fill fs-5"
                          : "bi-eye-slash-fill fs-5"
                      }
                    ></span>
                  </Link>
                </div>
              </div>
              <PasswordField
                name="password"
                placeholder="Enter your password"
                passwordShown={passwordShown}
                isComplete={() => handlePasswordValid("password")}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-10">
                  <label>
                    <strong>Confirm your password</strong>
                  </label>
                </div>
                <div className="col-md-2 text-right mt-4">
                  <Link onClick={() => toggleShowPassword("confirm")}>
                    <span
                      className={
                        passwordConfirmationShown
                          ? "bi-eye-fill fs-5"
                          : "bi-eye-slash-fill fs-5"
                      }
                    ></span>
                  </Link>
                </div>
              </div>
              <PasswordField
                name="passwordConfirmation"
                placeholder="Enter confirm password"
                passwordShown={passwordConfirmationShown}
                isComplete={() => handlePasswordValid("confirm")}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                disabled={
                  isSubmitting || errors.passwordConfirmation || errors.password
                }
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SetPassword;
