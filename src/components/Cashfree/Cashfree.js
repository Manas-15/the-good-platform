import React, { useState, useEffect } from "react";
import { cashfreeSandbox, cashfreeProd } from 'cashfree-dropjs';

const Cashfree = () => {
  const [orderToken, setOrderToken] = useState('7RyleyCOzRftapYCmSDb');
  const [style, setStyle] = useState({color: "#2e66cd"}
  );
  const [isProd, setIsProd] = useState(false);
  const [components, setComponents] = useState(["order-details", "card", "upi", "app", "netbanking", "paylater", "credicardemi"]);
  const cbs = (data) => {
    if (data.order && data.order.status === 'PAID') {
      alert('order is paid. Call api to verify');
    }
  };
  const cbf = (data) => {
    alert(data.order.errorText);
  };
  useEffect(() => {
    renderDropin();
  }, []);
  const renderDropin = () => {
    if (orderToken === '') {
      alert('Order Token is empty');
      return;
    }
    let parent = document.getElementById('drop_in_container');
    parent.innerHTML = '';
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
    } else {
      cashfree = new cashfreeSandbox.Cashfree();
    }
    console.log('before Initialisation');
    cashfree.initialiseDropin(parent, {
      orderToken,
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style
    });
    console.log('after Initialisation');
  };
  return (
    <div
      className="dropin-parent"
      id="drop_in_container"
    >
      Your component will come here
    </div>
  );
}

export default Cashfree;
