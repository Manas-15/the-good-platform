import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import charityPrograms from "../../config/charityPrograms.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";

const Donate = ({type}) => {
  const [selectedAmount, setSelectedAmount] = useState("amount1");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    console.log("coming here ------------------", open, checked);
    setChecked(!checked);
    setOpen(!checked);
  }
  return (
    <>
      <div className="row mb-4">
        <div className="col-md-12"><span className="bi-lock-fill fs-5 text-success"></span>Choose an amount to donate</div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 text-right pl-0">
          <Button variant="outline-primary w-75 font-weight-bold" className={selectedAmount === 'amount1' && 'active'} onClick={()=>setSelectedAmount('amount1')}>&#8377;800</Button>{" "}
        </div>
        <div className="col-md-6 pr-0">
          <Button variant="outline-primary w-75 font-weight-bold" className={selectedAmount === 'amount2' && 'active'} onClick={()=>setSelectedAmount('amount2')}>&#8377;1000</Button>{" "}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 text-right pl-0">
          <Button variant="outline-primary w-75 font-weight-bold" className={selectedAmount === 'amount3' && 'active'} onClick={()=>setSelectedAmount('amount3')}>&#8377;1500</Button>{" "}
        </div>
        <div className="col-md-6 pr-0">
          <Button variant="outline-primary w-75 font-weight-bold" className={selectedAmount === 'amount4' && 'active'} onClick={()=>setSelectedAmount('amount4')}>&#8377;2000</Button>{" "}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-10 offset-md-1">
          <input
            type="text"
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
            <input type="checkbox"
              checked={checked}
              onChange={handleCheck}
            />
            <p className="ml-2 d-inline-block">Please select the checkbox to your consent</p>
          </label>
          </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <Button className="btn btn-primary w-100 rounded-pill" disabled={!checked}>
            <span className="bi-heart-fill fs-6 ml-2 text-white"></span> 
            <span className="fs-6 ml-2">Donate</span>
          </Button>{" "}
        </div>
      </div>
      {open &&
        <Modal show={open} onHide={() => setOpen(false)} size="lg" backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Donation Consent</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <table width={'100%'}>
              <tr>
                <th width={'40%'}><span className="text-primary">Donor Name:</span></th>
                <th width={'30%'}><span className="text-primary">DD Plan ID:</span></th>
                <th width={'30%'}><span className="text-primary">Donation Amount:</span></th>
              </tr>
              <tr>
                <td>Amit Gupta</td>
                <td>7750214</td>
                <td>500</td>
              </tr>
            </table>
            <div className="row mt-4">
              <div className="col-md-12">
                <p>
                I authorize you to debit my account with the amounts of direct debits, with this welfare association in accordance with this authority until further notice. I agree that this authority is subject to my bank's terms and conditions that relate to my account. The specific terms and conditions are listed on the donation form. I acknowledge my first credit card donation will be debited immediately and my regular donation will be debited on or around my selected date of each month. I also confirm that I am at least 18 years of age and that I look forward to supporting this welfare association ongoing monthly donations for two years or longer. [Frequency: Monthly]
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="default" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
};
export default Donate;
