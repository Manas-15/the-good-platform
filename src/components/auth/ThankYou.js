import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { userConstants } from "../../constants";

const ThankYou = () => {
  const location = useLocation();
  return (
    <div className="text-center">
      <span className="bi-check-circle display-4 text-success"></span>
      <h1 className="display-4 text-success">Thank You!</h1>
      <p className="fs-5">
        Thank you for registering with our platform.{" "}
        {location?.state?.userType === userConstants.EMPLOYEE &&
          "Your application is currently in review. <br /> You will soon receive an email with a link to set your password."}
      </p>
      <hr />
      <p>
        <Link to="/">Go to Login</Link>
      </p>
    </div>
  );
};
export default ThankYou;
