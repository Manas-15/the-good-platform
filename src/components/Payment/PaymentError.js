import React from "react";

const PaymentError = ({ paymentErrorData }) => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <h4 className="text-danger">{paymentErrorData?.order?.errorText}</h4>
        </div>
      </div>
    </>
  );
};

export default PaymentError;
