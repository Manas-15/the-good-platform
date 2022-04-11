import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";
import { userActions } from "../../actions";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Otp = () => {
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const handleChange = (code) => setCode(code);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClick = () => {
    //desired function to be performed on clicking resend button
  };
  function handleSubmit(e) {
    console.log(">>>>>>>>>>>>>>>>>>>> login");
    e.preventDefault();
    setSubmitted(true);
    // if (email && password) {
    // get return url from location state or default to home page
    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName: "Ansuman",
        lastName: "Ansuman",
        username: "Ansuman",
        password: "test1234",
        token: "fake-jwt-token",
      })
    );
    const { from } = location.state || { from: { pathname: "/" } };
    dispatch(userActions.login("Ansuman", "test1234", from));
    // }
  }
  // reset login status
  // useEffect(() => {
  //   dispatch(userActions.logout());
  // }, []);
  return (
    <div className="text-center" style={{ width: "550px" }}>
      <h3 className="mb-4">Enter one time password (OTP)</h3>
      <p>
        One time password has been sent to your email id ****2006@gmail.com.
        Please enter the same here to login.
      </p>
      <form name="form" onSubmit={handleSubmit}>
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
              fontSize: "12px",
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
            >
              Validate
            </button>
          </div>
        </div>
      </form>
      <div className="row text-center mt-4">
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
      </div>
    </div>
  );
};
export default Otp;
