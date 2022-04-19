import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="text-center">
      <h1 className="display-4">Thank You!</h1>
      <p>
        Thank you for registering with our platform. Your application is
        currently in review. <br />
        You will soon receive an email with a link to set your password.
      </p>
      <hr />
      <p>
        <Link to="/">Go to Login</Link>
      </p>
    </div>
  );
};
export default ThankYou;
