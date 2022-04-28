import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import { SetPasswordSchema } from "./../Validations";
import PasswordField from "./../Shared/PasswordField";
import { employeeActions } from "./../../actions";
import { useDispatch } from "react-redux";
import "./../../assets/css/loginForm.scss";

const SetPassword = (props) => {
  const userId = props?.match?.params?.uuid;
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
  useEffect(() => {
    dispatch(employeeActions.setPasswordValid({userId: userId}));
  }, []);
  const toggleShowPassword = (type) => {
    if (type === "password") {
      setPasswordShown(!passwordShown);
    } else {
      setPasswordConfirmationShown(!passwordConfirmationShown);
    }
  };
  const setPassword = (values) => {
    console.log("create coming corporate", values, userId);
    if (userId && values.password) {
      console.log("create coming corporate", values);
      dispatch(employeeActions.setEmployeePassword({userId: userId, password: values.password}));
    }
  };
  return (
    <div className="row align-items-center authFormMargin">
        <div className="col-md-6">
          <div className="authForm setPasswordLeftContent">
            <h1 className="textHeading">Welcome back to The Good Platform!</h1>
            <p className="textParagraph">
              Enter your registered details here to get started
            </p>
            <img height="350" src="/assets/img/smartphone2.png" />
          </div>
        </div>
        <div className="col-md-5 formStyles">
          <div className="registrationContent">
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
                className="btn forgotPasswordSubmitButton"
              >
                Save Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
      </div>
    </div>
  );
};
export default SetPassword;
