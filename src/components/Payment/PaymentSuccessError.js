import React from "react";
import { paymentConstants } from "../../constants";

const PaymentSuccessError = ({ paymentValues, paymentSuccessErrorData }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center">
          {paymentSuccessErrorData?.transaction?.txStatus ===
            paymentConstants.SUCCESS && (
            <>
              <span className="bi-check-circle-fill fs-1 text-success"></span>
              <h3 className="text-success">Payment Done</h3>
            </>
          )}
          {paymentSuccessErrorData?.transaction?.txStatus ===
            paymentConstants.FAILED && (
            <>
              <span className="bi-x-circle-fill fs-1 text-danger"></span>
              <h3 className="text-danger">Payment Failed</h3>
            </>
          )}
        </div>
        <div className="row mt-4">
          <div className="col-md-10 offset-md-2 p-0 fs-6 lh-lg">
            <div className="row">
              <div className="col-md-6">
                <strong>Phone:</strong>
              </div>
              <div className="col-md-6">{paymentValues?.customerName}</div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <strong>Email:</strong>
              </div>
              <div className="col-md-6">{paymentValues?.customerEmail}</div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <strong>Transaction Amount:</strong>
              </div>
              <div className="col-md-6">
                {paymentSuccessErrorData?.transaction?.transactionAmount}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <strong>Transaction Id:</strong>
              </div>
              <div className="col-md-6">
                {paymentSuccessErrorData?.transaction?.transactionId}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <strong>Transaction Status:</strong>
              </div>
              <div className="col-md-6">
                {paymentSuccessErrorData?.transaction?.txMsg}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h6>We'll notify you once transaction will confirm.</h6>
              </div>
            </div>
            {/* <div className="text-center mt-4">
              <Button
                className="btn"
              >
                Close
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessError;
