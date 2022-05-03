import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

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
        className={isActive ? "active" : ""}
        onClick={() => setSelectedAmount(amount)}
      >
        &#8377;{amount}
      </Button>{" "}
    </>
  );
};
export default DonateAmount;
