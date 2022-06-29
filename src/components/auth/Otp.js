import React, { useState } from "react";
import OtpInput from "react-otp-input";
// import OtpTimer from "otp-timer";
import { employeeActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Otp = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.employee.user);
  // const user = JSON.parse(localStorage.getItem("user"));
  const [code, setCode] = useState("");
  const handleChange = (code) => setCode(code);
  const dispatch = useDispatch();
  // const handleClick = () => {
  //   //desired function to be performed on clicking resend button
  // };
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    {
      (() => {
        if (code.length === 6 && user?.user_type === 3) {
          return dispatch(
            employeeActions.validateOtp({
              userId: user.user_id,
              otp: code,
              validOtp: user.otp
            })
          );
        } else if (code.length === 6 && user?.user_type === 4) {
          return dispatch(
            employeeActions.validateOtp({
              userId: user.user_id,
              otp: code,
              validOtp: user.otp
            })
          );
        }
        return null;
      })();
    }
  }
  return (
    <div className="text-center card p-4">
      <h3 className="mb-2">
        Enter one time password (OTP)
      </h3>
      <h3>{props?.location?.state?.otp}</h3>
      <p className="mt-2 mb-3">
        One time password has been sent to your email id {user?.email}. Please
        enter the same here to login.
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
              caretColor: "blue"
            }}
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none"
            }}
          />
        </div>
        <div className="row text-center offset-md-4">
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-custom btn-block"
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
            className="btn"
          />
        </div>
      </div> */}
    </div>
  );
};
export default Otp;
