import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "./../../actions";

const Donate = ({ frequency, selectedCharity }) => {
  const employee = useSelector((state) => state.employee.user);
  const [selectedAmount, setSelectedAmount] = useState("amount1");
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
      <div className="row mb-4">
        <div className="col-md-12">
          <span className="bi-lock-fill fs-5 text-success"></span>Choose an
          amount to donate
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 text-right pl-0">
          <Button
            variant="outline-primary w-75 font-weight-bold"
            className={selectedAmount === "amount1" && "active"}
            onClick={() => setSelectedAmount("amount1")}
          >
            &#8377;{selectedCharity?.unitPrice * 1}
          </Button>{" "}
        </div>
        <div className="col-md-6 pr-0">
          <Button
            variant="outline-primary w-75 font-weight-bold"
            className={selectedAmount === "amount2" && "active"}
            onClick={() => setSelectedAmount("amount2")}
          >
            &#8377;{selectedCharity?.unitPrice * 2}
          </Button>{" "}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 text-right pl-0">
          <Button
            variant="outline-primary w-75 font-weight-bold"
            className={selectedAmount === "amount3" && "active"}
            onClick={() => setSelectedAmount("amount3")}
          >
            &#8377;{selectedCharity?.unitPrice * 3}
          </Button>{" "}
        </div>
        <div className="col-md-6 pr-0">
          <Button
            variant="outline-primary w-75 font-weight-bold"
            className={selectedAmount === "amount4" && "active"}
            onClick={() => setSelectedAmount("amount4")}
          >
            &#8377;{selectedCharity?.unitPrice * 4}
          </Button>{" "}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-10 offset-md-1">
          <input
            type="text"
            pattern="[0-9]*"
            maxLength={10}
            value={val}
            onChange={(e) =>
              setVal((v) => (e.target.validity.valid ? e.target.value : v))
            }
            className="form-control"
            placeholder="Other Amount"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 text-center offset-md-1">
          <p className="mb-2">
            <span className="bi-heart-fill fs-6 ml-2 cursor-pointer text-danger"></span>{" "}
            How will my donation help?
          </p>
          <p className="mb-2">
            Your contribution will used towards giving India's underprevileged
            children happier childhoods.
          </p>
          <p className="mb-0">
            Your dontaions are tax excepted under 80G of the Indian Income Tax
            Act.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <label className="m-2">
            <input type="checkbox" checked={checked} onChange={() => setOpen(true)} />
            <Link className="text-dark d-inline pl-0" onClick={() => setOpen(true)}>
              <p className="ml-2 d-inline-block text-decoration-underline">
                Please select the checkbox to your consent
              </p>
            </Link>
          </label>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <Button
            className="btn btn-primary w-100 rounded-pill"
            disabled={!checked}
          >
            <span className="bi-heart-fill fs-6 ml-2 text-white"></span>
            <span className="fs-6 ml-2">Donation Preference</span>
          </Button>{" "}
        </div>
      </div>
      {open && 
        <Modal
          show={open}
          onHide={closeCheck}
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton className="fs-2">
            <Modal.Title>Donation Consent</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <table width={"100%"}>
              <tr>
                <th width={"30%"}>
                  <span className="text-primary">Donor Name:</span>
                </th>
                <th width={"30%"}>
                  <span className="text-primary">Charity Program:</span>
                </th>
                <th width={"20%"} className="text-right">
                  <span className="text-primary">Donation Amount:</span>
                </th>
                <th width={"20%"} className="text-center">
                  <span className="text-primary">Frequency:</span>
                </th>
              </tr>
              <tr>
                <td>{employee?.name}</td>
                <td>{selectedCharity?.charityName}</td>
                <td className="text-right">{selectedCharity?.unitPrice}</td>
                <td className="text-center">{frequency}</td>
              </tr>
            </table>
            <div className="row mt-5">
              <div className="col-md-12">
                <p>
                  I authorize you to debit my account with the amounts of direct
                  debits, with this welfare association in accordance with this
                  authority until further notice. I agree that this authority is
                  subject to my bank's terms and conditions that relate to my
                  account. The specific terms and conditions are listed on the
                  donation form. I acknowledge my first credit card donation
                  will be debited immediately and my regular donation will be
                  debited on or around my selected date of each month. I also
                  confirm that I am at least 18 years of age and that I look
                  forward to supporting this welfare association ongoing monthly
                  donations for two years or longer. [Frequency: {frequency}]
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="default" className="btn btn-primary" onClick={handleCheck}>
              Authorize
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
};
export default Donate;
