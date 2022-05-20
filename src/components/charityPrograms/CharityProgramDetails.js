import React, { useEffect, useRef } from "react";
import "./../../assets/css/charityProgramsList.scss";
import { donationPreferenceConstants } from "../../constants";
import ReactHtmlParser from "react-html-parser";
import { Progress, Tooltip, Tabs } from "antd";
import users from "./../../config/users.json";
import Payment from "./../Payment/Payment";
import { useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
const TabPane = Tabs.TabPane;

const CharityProgramDetails = (props, { items, setCharity }) => {
  console.log("props?.location?.query?.batchId", props?.location);
  const listInnerRef = useRef();
  const openNav = (charity) => {
    document.getElementById("sidepanel").classList.add("is-open");
    setCharity(charity);
  };
  const user = useSelector((state) => state.employee.user);
  const programName = props?.location?.programName;
  const initialValues = {
    orderId: Math.random().toString(36).slice(2),
    orderExpiryTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    donationAmount: "200",
    customerId: user?.uuid.toString(),
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerDob: user?.dob,
    customerPan: user?.pan,
    charity: {
      category: "Diaster",
      charityId: 8,
      charityName: "Kerela flood",
      donated: false,
      soicalId: 6,
      soicalName: "Kokatta Rescue",
      unitPrice: "200",
    },
    employee: user,
    corporateId: 1,
    orderPaymentStatus: 1,
    orderNote: `Donated to ${"test"}`,
    donationConsent: "Test",
  };
  const onScroll = () => {
    console.log("listInnerRef.current", listInnerRef.current, window.scrollY);
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (window.scrollY > clientHeight) {
        document
          .getElementById("payment-section")
          .classList.add("detail-payment");
        console.log(
          "333333333333333333",
          clientHeight,
          scrollHeight,
          scrollTop
        );
        // alert("reached bottom");
      } else {
        document
          .getElementById("payment-section")
          .classList.remove("detail-payment");
      }
    }
  };
  useEffect(() => {
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => onScroll();
  }, []);
  return (
    <>
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          {/* {items?.length === 0 && ( */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="ant-typography customHeading">{programName}</h1>
            </div>
          </div>
          <div className="card w-100" onScroll={onScroll} ref={listInnerRef}>
            <div className="row  w-100">
              <div className="col-md-8 img-sec p-0 height-100">
                <Tooltip title="80G Tax benefits available for INR donations">
                  <span className="tax-benefit corner">
                    Tax Benefit <i className="bi-info-circle-fill fs-6"></i>
                  </span>
                </Tooltip>
                <img src="/assets/img/dummy.png" alt="image" />
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6  p-1">
                        <span className="detail-label">1985</span>
                        <span className="detail-content">Donors</span>
                      </div>
                      <div className="col-md-6 p-1">
                        <span className="detail-label">15</span>
                        <span className="detail-content">Days</span>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12 p-1">
                        <span className="detail-label">₹ 17,96,476</span>
                        <span className="detail-content">
                          Worth Material Raised
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 text-justify">
                    Distribute ration at the identified cluster of villages to
                    the BPL beneficiaries holding valid identify proof and
                    ration card. Ration Kits will be provided to the family of
                    more than one member.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <h4>FAQs</h4>
                  <Accordion defaultActiveKey={0} className="Payroll">
                    <Accordion.Item eventKey={0}>
                      <Accordion.Header>
                        What is The Good Platform?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={1}>
                      <Accordion.Header>
                        How to claim Tax-Exemption for my contributions on The
                        Good Platform?
                      </Accordion.Header>
                      <Accordion.Body>
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={2}>
                      <Accordion.Header>
                        How to claim Tax-Exemption for my contributions on The
                        Good Platform?
                      </Accordion.Header>
                      <Accordion.Body>
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old.
                        Richard McClintock.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={3}>
                      <Accordion.Header>
                        Why do we collect a tip amount?
                      </Accordion.Header>
                      <Accordion.Body>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={4}>
                      <Accordion.Header>
                        Are these NGOs verified?
                      </Accordion.Header>
                      <Accordion.Body>
                        If you are going to use a passage of Lorem Ipsum, you
                        need to be sure there isn't anything embarrassing hidden
                        in the middle of text.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={5}>
                      <Accordion.Header>
                        How do I know these products have reached the right
                        beneficiary?
                      </Accordion.Header>
                      <Accordion.Body>
                        If you are going to use a passage of Lorem Ipsum, you
                        need to be sure there isn't anything embarrassing hidden
                        in the middle of text.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={6}>
                      <Accordion.Header>How to Donate?</Accordion.Header>
                      <Accordion.Body>
                        All the Lorem Ipsum generators on the Internet tend to
                        repeat predefined chunks as necessary, making this the
                        first true generator on the Internet.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
              <div className="row mt-4 program-list">
                <h4 className="mb-0">Donors (1985)</h4>
                <div className="col-md-12">
                  <Tabs defaultActiveKey={0}>
                    <TabPane tab={<span>Most Generious</span>} key={0}>
                      {users?.slice(0, 4).map((user) => (
                        <div className="donor">
                          <div className="section">
                            <img src="/assets/img/no-image.png" />
                            <div className="content">
                              <h5>{user?.name}</h5>
                              <p className="donated">
                                Donated ₹{user?.donatedAmount}
                              </p>
                              <p className="timeline">{user?.donatedOn}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabPane>
                    <TabPane tab={<span>Recent</span>} key={1}>
                      {users?.slice(4, 8).map((user) => (
                        <div className="donor">
                          <div className="section">
                            <img src="/assets/img/no-image.png" />
                            <div className="content">
                              <h5>{user?.name}</h5>
                              <p className="donated">
                                Donated ₹{user?.donatedAmount}
                              </p>
                              <p className="timeline">{user?.donatedOn}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="col-md-4" id="payment-section">
              <Payment selectedAmount={"200"} paymentValues={initialValues} />
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};
export default CharityProgramDetails;
