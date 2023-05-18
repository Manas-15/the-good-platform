import React from "react";
import { useLocation, withRouter } from "react-router-dom";

const OthersSignUp = () => {
  const location = useLocation();
  const type = location.state;

  return (
    <>
      <div type={type}>Others Signup</div>
    </>
  );
};

export default OthersSignUp;
