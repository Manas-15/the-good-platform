import React, { useState, useEffect } from "react";
import { cashfreeSandbox, cashfreeProd } from "cashfree-dropjs";
import ReviewAmountBox from "./../Shared/ReviewAmountBox";
import { paymentActions } from "./../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Shared/Loader";
import PaymentSuccessError from "./PaymentSuccessError";
import { paymentConstants } from "../../constants";

const Payment = ({ paymentValues }) => {
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment);
  const [orderToken, setOrderToken] = useState("");
  const [style, setStyle] = useState({ color: "#2e66cd" });
  const [isProd, setIsProd] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentSuccessErrorData, setPaymentSuccessErrorData] = useState();
  const [components, setComponents] = useState([
    // "order-details",
    "card",
    "upi",
    "app",
    "netbanking",
    // "paylater",
    // "credicardemi",
  ]);
  const cbs = (data) => {
    if (data?.order && data?.order?.status === paymentConstants.PAID) {
      // alert("order is paid. Call api to verify");
      setPaymentStatus(paymentConstants.PAID);
      setPaymentSuccessErrorData(data);
    }
  };
  const cbf = (data) => {
    setPaymentStatus(paymentConstants.ERROR);
    setPaymentSuccessErrorData(data);
    dispatch(
      paymentActions.savePaymentFailureData({ ...data, ...paymentValues })
    );
  };
  useEffect(() => {
    console.log(
      "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
      paymentValues
    );
    dispatch(paymentActions.getOrderToken(paymentValues));
  }, []);
  useEffect(() => {
    if (payment?.orderDetails?.order_token) {
      // alert(payment?.orderDetails?.order_token);
      // setOrderToken(payment?.orderDetails?.order_token)
      renderDropin(payment?.orderDetails?.order_token);
    }
  }, [payment?.orderDetails?.order_token]);
  const renderDropin = (orderToken) => {
    if (orderToken === "") {
      // alert("Order Token is empty");
      return;
    }
    // alert(orderToken);
    let parent = document.getElementById("drop_in_container");
    parent.innerHTML = "";
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
    } else {
      cashfree = new cashfreeSandbox.Cashfree();
    }
    cashfree.initialiseDropin(parent, {
      orderToken,
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style,
    });
  };
  return (
    <>
      {paymentStatus === "" && (
        <>
          <ReviewAmountBox selectedAmount={paymentValues?.donationAmount} />
          {payment?.loading && (
            <div className="pt-4">
              <Loader style={{ top: "60px" }} />
            </div>
          )}
          <div className="dropin-parent" id="drop_in_container">
            {payment?.error && (
              <strong>
                Currently unable to process your request. Please try again
                later.
              </strong>
            )}
          </div>
        </>
      )}
      {paymentStatus && (
        <>
          <PaymentSuccessError
            paymentValues={paymentValues}
            paymentSuccessErrorData={paymentSuccessErrorData}
          />
        </>
      )}
    </>
  );
};

export default Payment;
