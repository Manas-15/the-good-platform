import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import charityPrograms from "../../config/charityPrograms.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Donate = ({type}) => {
  const [selectedAmount, setSelectedAmount] = useState("amount1");
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
      <div className="row mb-4">
        <div className="col-md-10 offset-md-1">
          <input
            type="text"
            className="form-control"
            placeholder="Other Amount"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-10 text-center offset-md-1">
          <p>
            <span className="bi-heart-fill fs-6 ml-2 cursor-pointer text-danger"></span>{" "}
            How will my donation help?
          </p>
          <p>
            Your contribution will used towards giving India's underprevileged
            children happier childhoods.
          </p>
          <p>
            Your dontaions are tax excepted under 80G of the Indian Income Tax
            Act.
          </p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <Button className="btn btn-primary w-100 rounded-pill">
            <span className="bi-heart-fill fs-5 ml-2 text-white"></span> 
            <span className="fs-6 ml-2">Donate</span>
          </Button>{" "}
        </div>
      </div>
    </>
  );
};
export default Donate;
