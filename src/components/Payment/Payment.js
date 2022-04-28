import React, { useState, useEffect } from "react";
import { cashfreeSandbox, cashfreeProd } from "cashfree-dropjs";
import ReviewAmountBox from "./../Shared/ReviewAmountBox";
import { paymentActions } from "./../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Shared/Loader";

const Payment = ({ paymentValues }) => {
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment);
  const [orderToken, setOrderToken] = useState("");
  const [style, setStyle] = useState({ color: "#2e66cd" });
  const [isProd, setIsProd] = useState(false);
  const [components, setComponents] = useState([
    // "order-details",
    "card",
    "upi",
    "app",
    "netbanking",
    "paylater",
    "credicardemi",
  ]);
  const cbs = (data) => {
    if (data.order && data.order.status === "PAID") {
      alert("order is paid. Call api to verify");
      console.log("after paid received data >>>>>>>>>>>>>>>>", data)
    }
  };
  const cbf = (data) => {
    alert("cbf: "+data.order.errorText);
  };
  useEffect(() => {
    dispatch(paymentActions.getOrderToken(paymentValues));
    // renderDropin();
  }, []);
  console.log("fetch and load >>>>>>>>>>>>>>>>", payment);
  // if (payment?.orderDetails?.order_token) {
  //   setOrderToken(payment?.orderDetails?.order_token);
  //   renderDropin;
  // }
  useEffect(() => {
    if(payment?.orderDetails?.order_token){
      alert(payment?.orderDetails?.order_token);
      // setOrderToken(payment?.orderDetails?.order_token)
      renderDropin(payment?.orderDetails?.order_token);
    }   
  }, [payment?.orderDetails?.order_token]);
  const renderDropin = (orderToken) => {
    if (orderToken === "") {
      alert("Order Token is empty");
      return;
    }
    alert(orderToken)
    let parent = document.getElementById("drop_in_container");
    parent.innerHTML = "";
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
    } else {
      cashfree = new cashfreeSandbox.Cashfree();
    }
    console.log("before Initialisation");
    cashfree.initialiseDropin(parent, {
      orderToken,
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style,
    });
    console.log("after Initialisation");
  };
  return (
    <>
      <ReviewAmountBox selectedAmount={paymentValues?.donationAmount} />
      {payment?.loading && (
        <div className="pt-4">
          <Loader />
        </div>
      )}
      <div className="dropin-parent" id="drop_in_container">
        {payment?.error && (
          <strong>
            Currently unable to process your request. Please try again later.
          </strong>
        )}
      </div>
    </>
  );
};

export default Payment;
