import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";
import { employeeActions } from "../../actions";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "formik";

const Otp = () => {
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.employee.user);
  // const user = JSON.parse(localStorage.getItem("user"));
  const [code, setCode] = useState("");
  const handleChange = (code) => setCode(code);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClick = () => {
    //desired function to be performed on clicking resend button
  };
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (code.length === 6) {
      dispatch(
        employeeActions.validateOtp({ userId: user.user_id, otp: code })
      );
    }
  }
  return (
    <div className="text-center card p-4">
      <h3 className="mb-4">Enter one time password (OTP)</h3>
      <p>
        One time password has been sent to your email id {user?.email}.
        Please enter the same here to login.
      </p>
      <form name="form">
        <div className="d-inline-block mb-4">
          <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={6}
            separator={<span style={{ width: "8px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
            inputStyle={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "54px",
              height: "54px",
              fontSize: "20px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
            }}
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none",
            }}
          />
        </div>
        <div className="row text-center offset-md-4">
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
              disabled={code.length < 6}
            >
              Validate
            </button>
          </div>
        </div>
      </form>
      {/* <div className="row text-center mt-4">
        <div className="col-md-12 resend">
          <OtpTimer
            seconds={30}
            minutes={0}
            resend={handleClick}
            text="Time Left"
            ButtonText="Resend"
            className="btn btn-primary"
          />
        </div>
      </div> */}
    </div>
  );
};
export default Otp;
