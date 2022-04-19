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
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] = useState(false);
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
  const toggleShowPassword = (type) => {
    if(type === "password"){
      setPasswordShown(!passwordShown)
    }else{
      setPasswordConfirmationShown(!passwordConfirmationShown)
    }
  }
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
          <Form autoComplete="nope">
            <h3>Set Password</h3>
            <div className="form-group">
              
                <div className="row">
                  <div className="col-md-10">
                  <label><strong>Create your password</strong></label>
                  </div>
                  <div className="col-md-2 text-right mt-4">
                    <Link onClick={() => toggleShowPassword('password')}>
                      <span className={passwordShown ? "bi-eye-fill fs-5" : "bi-eye-slash-fill fs-5"} ></span>
                    </Link>
                  </div>
                </div>
                
                
              <Field
                name="password"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="off"
                onFocus={() => setPasswordFocused(true)}
                onKeyUp={(e) => onChangePassword(e.target.value, "password")}
                className={"form-control"}
              />
              {passwordFocused && password.length > 2 && (
                <PasswordStrengthIndicator
                  validity={passwordValidity}
                  isComplete={() => handlePasswordValid("password")}
                  type="password"
                />
              )}
            </div>
            <div className="form-group">
            <div className="row">
                  <div className="col-md-10">
                  <label><strong>Confirm your password</strong></label>
                  </div>
                  <div className="col-md-2 text-right mt-4">
                    <Link onClick={() => toggleShowPassword('confirm')}>
                      <span className={passwordConfirmationShown ? "bi-eye-fill fs-5" : "bi-eye-slash-fill fs-5"} ></span>
                    </Link>
                  </div>
                </div>
              <Field
                name="passwordConfirmation"
                type={passwordConfirmationShown ? "text" : "password"}
                placeholder="Enter confirm password"
                autoComplete="off"
                onFocus={() => setPasswordConfirmationFocused(true)}
                onKeyUp={(e) => onChangePassword(e.target.value, "confirm")}
                className={"form-control"}
              />
              {passwordConfirmationFocused &&
                passwordConfirmation.length > 2 && (
                  <PasswordStrengthIndicator
                    validity={passwordConfirmationValidity}                    
                    isComplete={() => handlePasswordValid("confirm")}
                    type="confirm"
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
            <div className="text-center mt-5">
              <button
                type="submit"
                disabled={isSubmitting || !passwordConfirmationValid || !passwordValid || errors.passwordConfirmation || errors.password}
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
