import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { SetPasswordSchema } from "./../Validations";
import PasswordStrengthIndicator from "./../PasswordStrengthIndicator";
const validateRegx = {
  minChar: null,
  upperChar: null,
  number: null,
  specialChar: null,
}
const SetPassword = ({ submit, disable, type }) => {
  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const upperCharacterRegx = /[A-Z]/;
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPasswordField] = useState("");
  const [passwordValidity, setPasswordValidity] = useState(validateRegx);
  const [passwordConfirmationFocused, setPasswordConfirmationFocused] =
    useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordValid, setIsPasswordValid] = useState(false);
  const [passwordConfirmationValid, setIsPasswordConfirmationValid] =
    useState(false);
  const [passwordConfirmationValidity, setPasswordConfirmationValidity] =
    useState(validateRegx);
  const onChangePassword = (password, type) => {
    if (type === "password") {
      setPasswordField(password);
      setPasswordValidity({
        minChar: password.length >= 8,
        upperChar: upperCharacterRegx.test(password),
        number: isNumberRegx.test(password),
        specialChar: specialCharacterRegx.test(password),
      });
    } else {
      setPasswordConfirmation(password);
      setPasswordConfirmationValidity({
        minChar: password.length >= 8,
        upperChar: upperCharacterRegx.test(password),
        number: isNumberRegx.test(password),
        specialChar: specialCharacterRegx.test(password),
      });
    }
  };
  const handlePasswordValid = (type) => {
    type === "password"
      ? setIsPasswordValid(true)
      : setIsPasswordConfirmationValid(true);
  };
  return (
    <div style={{ width: "350px" }}>
      <Formik
        initialValues={{ password: "", passwordConfirmation: "" }}
        validationSchema={SetPasswordSchema}
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
          <Form autoComplete="off">
            <h3>Set Password</h3>
            <div className="form-group">
              <label>
                <strong>Create your password</strong>
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Enter password"
                autoComplete="nope"
                onFocus={() => setPasswordFocused(true)}
                onKeyUp={(e) => onChangePassword(e.target.value, "password")}
                className={"form-control"}
              />
              {passwordFocused && password.length > 2 && (
                <PasswordStrengthIndicator
                  validity={passwordValidity}
                  isComplete={() => handlePasswordValid("password")}
                />
              )}
            </div>
            <div className="form-group">
              <label>
                <strong>Confirm your password</strong>
              </label>
              <Field
                name="passwordConfirmation"
                type="password"
                placeholder="Enter confirm password"
                autoComplete="nope"
                onFocus={() => setPasswordConfirmationFocused(true)}
                onKeyUp={(e) => onChangePassword(e.target.value, "confirm")}
                className={"form-control"}
              />
              {passwordConfirmationFocused &&
                passwordConfirmation.length > 2 && (
                  <PasswordStrengthIndicator
                    validity={passwordConfirmationValidity}
                    type="confirm"
                    isComplete={() => handlePasswordValid("confirm")}
                  />
                )}
              {passwordValid && passwordConfirmationValid && (
                <span className="error">
                  {errors.passwordConfirmation &&
                    touched.passwordConfirmation &&
                    errors.passwordConfirmation}
                </span>
              )}
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
export default SetPassword;
