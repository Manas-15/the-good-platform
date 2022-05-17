import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { donationPreferenceConstants } from "../../constants";
import ReactHtmlParser from "react-html-parser";

const DonateAmount = ({ isActive, amount, setSelectedAmount }) => {
  const employee = useSelector((state) => state.employee.user);
  const [val, setVal] = useState();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(true);
    setOpen(false);
  };
  const closeCheck = () => {
    setChecked(false);
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="outline-primary w-75 font-weight-bold"
        className={`btn-outline-custom ${isActive ? "active" : ""}`}
        onClick={() => setSelectedAmount(amount)}
      >
        {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
        {amount}
      </Button>{" "}
    </>
  );
};
export default DonateAmount;
