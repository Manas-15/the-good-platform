import React, { useState } from "react";
import { Field } from "formik";
import PasswordStrengthIndicator from "./../PasswordStrengthIndicator";
const validateRegx = {
  minChar: null,
  upperChar: null,
  number: null,
  specialChar: null,
};
const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const upperCharacterRegx = /[A-Z]/;
const PasswordField = ({
  name,
  placeholder,
  passwordShown,
  errors,
  touched,
}) => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [password, setPasswordField] = useState("");
  const [passwordValidity, setPasswordValidity] = useState(validateRegx);
  const onChangePassword = (password, type) => {
    setPasswordField(password);
    setPasswordValidity({
      minChar: password.length >= 8,
      upperChar: upperCharacterRegx.test(password),
      number: isNumberRegx.test(password),
      specialChar: specialCharacterRegx.test(password),
    });
  };
  const handlePasswordValid = (type) => {
    setPasswordValid(true);
  };
  return (
    <>
      <Field
        name={name}
        type={passwordShown ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setPasswordFocused(true)}
        onKeyUp={(e) => onChangePassword(e.target.value)}
        className={"form-control"}
      />
      {passwordFocused && password.length > 2 && (
        <PasswordStrengthIndicator
          validity={passwordValidity}
          isComplete={handlePasswordValid}
          name={name}
        />
      )}
      {name === "passwordConfirmation" && (
        <span className="error">
          {errors.passwordConfirmation &&
            touched.passwordConfirmation &&
            errors.passwordConfirmation}
        </span>
      )}
    </>
  );
};
export default PasswordField;
