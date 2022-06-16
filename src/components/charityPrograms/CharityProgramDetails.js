import React, { useEffect, useRef, useState } from "react";
import "./../../assets/css/charityProgramsList.scss";
import {
  donationPreferenceConstants,
  viewPortalConstants,
  userConstants
} from "../../constants";
import { Progress, Tooltip, Tabs } from "antd";
import users from "../../config/users.json";
import { useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import Donate from "./Donate";
import DonateHeader from "./DonateHeader";
import { Link } from "react-router-dom";
import { charityProgramConstants } from "../../constants";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import donationsConsent from "./../../config/donationsConsent.json";
import selectedCharity from "./../../config/selectedCharity.json";
import ProgramDetailsIndividual from "./ProgramDetailsIndividual";
const TabPane = Tabs.TabPane;
Chart.register(ArcElement);

const CharityProgramDetails = (props) => {
  let charityFirstTwoChar, employeeFirstTwoChar;
  // const [tabType, setTabType] = useState(charityProgramConstants.SPONSOR);
  const selectedCharity = useSelector((state) => state.selectedCharity);
  const tabType = useSelector((state) => state.selectedCharityTab.tab);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const listInnerRef = useRef();
  // const openNav = () => {
  //   // document.getElementById("sidepanel").classList.add("is-open");
  //   // setCharity(charity);
  // };
  const loggedInUserType = useSelector(
    (state) => state?.user?.loggedinUserType
  );
  const user = useSelector((state) => state.employee.user);
  if (selectedCharity) {
    charityFirstTwoChar = selectedCharity?.charityName
      ?.slice(0, 2)
      ?.toLowerCase();
    employeeFirstTwoChar = user?.name?.slice(0, 2)?.toLowerCase();
  }
  // const programName = props?.location?.programName;
  const imgUrl = props?.location?.imgUrl;
  const initialValues = {
    orderId: selectedCharity
      ? charityFirstTwoChar + employeeFirstTwoChar + Date.now()
      : Math.random().toString(36).slice(2),
    orderExpiryTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    donationAmount: selectedCharity?.charity?.donationAmount,
    customerId: user?.uuid.toString(),
    customerName: user?.name,
    customerEmail: user?.email,
    customerPhone: user?.phone,
    customerDob: user?.dob,
    customerPan: user?.pan,
    charity: selectedCharity?.charity,
    employee: user,
    corporateId: isCorporatePortal
      ? selectedCorporate?.corporate?.corporateId
      : user?.corporateId,
    orderPaymentStatus: 1,
    orderNote: `Donated to ${selectedCharity?.charityName}`,
    donationConsent: `${donationsConsent?.consent} [Frequency: ${selectedCharity?.charity?.frequency}]`
  };
  const onScroll = () => {
    // if (listInnerRef.current) {
    //   const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    //   if (window.scrollY > listInnerRef.current.clientHeight) {
    //     document
    //       .getElementById("payment-section")
    //       .classList.add("detail-payment");
    //   } else {
    //     document
    //       .getElementById("payment-section")
    //       .classList.remove("detail-payment");
    //   }
    // }
  };
  useEffect(() => {
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => onScroll();
  }, []);
  const data1 = {
    labels: ["Operations", "Communication", "Travel", "Administrative"],
    datasets: [
      {
        data: [30, 30, 5, 15],
        backgroundColor: [
          "rgb(242,165,152)",
          "rgb(255,232,157)",
          "rgb(236,107,109)",
          "rgb(122,231,125)"
        ]
      }
    ]
  };
  const data2 = {
    labels: ["Operations", "Communication", "Travel", "Administrative"],
    datasets: [
      {
        data: [30, 30, 5, 15],
        backgroundColor: [
          "rgb(242,165,152)",
          "rgb(255,232,157)",
          "rgb(236,107,109)",
          "rgb(122,231,125)"
        ]
      }
    ]
  };
  return (
    <>
      {loggedInUserType === userConstants.INDIVIDUAL && (
        <ProgramDetailsIndividual
          programId={selectedCharity?.charity?.id.toString()}
        />
      )}
      {loggedInUserType !== userConstants.INDIVIDUAL && (
        <div className="ant-row">
          <div className="ant-col ant-col-24 mt-2">
            {/* {items?.length === 0 && ( */}
            <div className="row">
              <div className="col-md-12">
                {tabType === "Sponsor" &&
                  loggedInUserType !== userConstants.INDIVIDUAL && (
                    <div>
                      <i className="bi-heart-fill fs-6 custom-color mr-1"></i>{" "}
                      <span className="display-flex fs-6"> Promoted</span>
                    </div>
                  )}
                <h1 className="ant-typography customHeading">
                  {selectedCharity?.charity?.charityName}
                </h1>
                <h6 className="mb-3">
                  by {selectedCharity?.charity?.soicalName}
                </h6>
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
                  <img
                    src={
                      selectedCharity?.charity?.imgUrl
                        ? selectedCharity?.charity?.imgUrl
                        : "/assets/img/charity3.jpg"
                    }
                    alt="image"
                  />
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <Progress
                        type="circle"
                        percent={75}
                        format={() => (
                          <span className="fs-6">75% Completed</span>
                        )}
                      />
                    </div>
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
                  <div className="row mt-3">
                    <div className="col-md-12 text-center">
                      <b>Each share brings us closer to our goal</b>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-md-12">
                      <Link>
                        <i className="bi-facebook fs-3 mr-3 custom-color"></i>
                      </Link>
                      <Link>
                        <i className="bi-twitter fs-3 mr-3 custom-color"></i>
                      </Link>
                      <Link>
                        <i className="bi-linkedin fs-3 mr-3 custom-color"></i>
                      </Link>
                      <Link>
                        <i className="bi-envelope fs-3 mr-3 custom-color"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-7 program-list detail-tab">
                <Tabs defaultActiveKey={"details"}>
                  <TabPane tab={"Detail"} key={"details"}>
                    <div className="row mt-4 program-list">
                      <div className="col-md-12">
                        <strong>Description</strong>
                        <p>
                          Distribute ration at the identified cluster of
                          villages to the BPL beneficiaries holding valid
                          identify proof and ration card. Ration Kits will be
                          provided to the family of more than one member.
                        </p>
                        What is the duration for this program?
                        <p>2022-04-19 - 2022-08-31</p>
                        Who do you aim to benefit with this program?
                        <p>Beneficiary</p>
                        <div className="row">
                          <div className="col-md-6">
                            <div className={`categotyButton`}>
                              <label
                                className={`active ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
                              >
                                <span>
                                  <img src="/assets/img/elderly.png" />{" "}
                                  {"People"}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4">Target Category</p>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className={`categotyButton`}>
                              <label
                                className={`active ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
                              >
                                <span>
                                  <img src="/assets/img/women.png" />{" "}
                                  {charityProgramConstants.WOMEN_CATEGORY}
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className={`categotyButton`}>
                              <label
                                className={`active ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
                              >
                                <span>
                                  <img src="/assets/img/youth.png" />{" "}
                                  {charityProgramConstants.YOUTH_CATEGORY}
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className={`categotyButton`}>
                              <label
                                className={`active ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
                              >
                                <span>
                                  <img src="/assets/img/elderly.png" />{" "}
                                  {charityProgramConstants.ELDERLY_CATEGORY}
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className={`categotyButton`}>
                              <label
                                className={`active ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
                              >
                                <span>
                                  <img src="/assets/img/children.png" />{" "}
                                  {charityProgramConstants.CHILDREN_CATEGORY}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={"Team"} key={"team"}>
                    <div className="row mt-4 program-list">
                      <h6 className="mb-0">Peer Team</h6>
                      <div className="row mt-3">
                        <div className="col-md-1 pr-0">
                          <i className="bi-envelope fs-6"></i>
                        </div>
                        <div className="col-md-10 pl-0">
                          peerreview2022@gmail.com
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-1 pr-0">
                          <i className="bi-telephone fs-6"></i>
                        </div>
                        <div className="col-md-10 pl-0">xxxxxxx151</div>
                      </div>
                      <div className="row">
                        <div className="col-md-1 pr-0">
                          <i className="bi-person-bounding-box fs-6"></i>
                        </div>
                        <div className="col-md-10 pl-0">Primary Contact</div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={"Our Plan"} key={"pur_plan"}>
                    <div className="row mt-4 program-list">
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <strong>
                            Here are the problems faced by the
                            community/individual targetted and their needs
                          </strong>
                          <p>
                            These are the families falling in the below poverty
                            line and cannot afford to provide the bare minimum
                            requirement of nutrition to their family
                          </p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <strong>
                            These are our unique points,with regards to this
                            program
                          </strong>
                          <p>
                            Our volunteers reach out to them to collect their
                            data, door to door program, provide ration bags post
                            verification of their identification.
                          </p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <strong>Key Highlights</strong>
                          <p>
                            Providing food security to the poor and deprived
                            community to meet their basic survival need and good
                            health leading Independent lifestyle
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={"Budget"} key={"budget"}>
                    <div className="row mt-4 program-list">
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <Doughnut
                            data={data1}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  display: true,
                                  position: "right"
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={"Faq"} key={"faq"}>
                    <div className="row">
                      <div className="col-md-12">
                        <h4>FAQ</h4>
                        <Accordion defaultActiveKey={0} className="Payroll">
                          <Accordion.Item eventKey={0}>
                            <Accordion.Header>
                              What is The Good Platform?
                            </Accordion.Header>
                            <Accordion.Body>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey={1}>
                            <Accordion.Header>
                              How to claim Tax-Exemption for my contributions on
                              The Good Platform?
                            </Accordion.Header>
                            <Accordion.Body>
                              It was popularised in the 1960s with the release
                              of Letraset sheets containing Lorem Ipsum
                              passages, and more recently with desktop
                              publishing software like Aldus PageMaker including
                              versions of Lorem Ipsum.
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey={2}>
                            <Accordion.Header>
                              How to claim Tax-Exemption for my contributions on
                              The Good Platform?
                            </Accordion.Header>
                            <Accordion.Body>
                              Contrary to popular belief, Lorem Ipsum is not
                              simply random text. It has roots in a piece of
                              classical Latin literature from 45 BC, making it
                              over 2000 years old. Richard McClintock.
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey={3}>
                            <Accordion.Header>
                              Why do we collect a tip amount?
                            </Accordion.Header>
                            <Accordion.Body>
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which don't look even slightly
                              believable.
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey={4}>
                            <Accordion.Header>
                              Are these NGOs verified?
                            </Accordion.Header>
                            <Accordion.Body>
                              If you are going to use a passage of Lorem Ipsum,
                              you need to be sure there isn't anything
                              embarrassing hidden in the middle of text.
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey={5}>
                            <Accordion.Header>
                              How do I know these products have reached the
                              right beneficiary?
                            </Accordion.Header>
                            <Accordion.Body>
                              If you are going to use a passage of Lorem Ipsum,
                              you need to be sure there isn't anything
                              embarrassing hidden in the middle of text.
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey={6}>
                            <Accordion.Header>How to Donate?</Accordion.Header>
                            <Accordion.Body>
                              All the Lorem Ipsum generators on the Internet
                              tend to repeat predefined chunks as necessary,
                              making this the first true generator on the
                              Internet.
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={"Donors"} key={"donors"}>
                    <div className="row mt-4 program-list">
                      <h4 className="mb-0">Donors (1985)</h4>
                      <div className="col-md-12">
                        <Tabs defaultActiveKey={0}>
                          <TabPane tab={<span>Most Generious</span>} key={0}>
                            {users?.slice(0, 4).map((user) => (
                              <div className="donor">
                                <div className="section">
                                  {/* <img src="/assets/img/no-image.png" /> */}
                                  <div class="name-circle">
                                    {user?.name?.split(" ")?.[0]?.charAt(0)}
                                    {user?.name?.split(" ")?.pop()?.charAt(0)}
                                  </div>
                                  <div className="content">
                                    <h5>{user?.name}</h5>
                                    <p className="donated">
                                      Donated ₹{user?.donatedAmount}
                                    </p>
                                    <p className="timeline">
                                      {user?.donatedOn}
                                    </p>
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
                                    <p className="timeline">
                                      {user?.donatedOn}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </TabPane>
                        </Tabs>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
              <div className="col-md-5 mt-4 pl-0 pr-0" id="payment-section">
                {/* <Payment selectedAmount={"200"} paymentValues={initialValues} /> */}
                {/* <div className="sidepanel is-open" id="sidepanel"> */}
                <DonateHeader selectedCharity={selectedCharity} />
                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active give-once"
                    id="give-once"
                    tabType={tabType}
                  >
                    <Donate
                      frequency={donationPreferenceConstants.ONCE}
                      selectedCharity={initialValues.charity}
                      tabType={tabType}
                      from={"ProgramDetail"}
                    />
                  </div>
                  <div
                    className="tab-pane fade show give-monthly"
                    id="give-monthly"
                  >
                    <Donate
                      frequency={donationPreferenceConstants.MONTHLY}
                      selectedCharity={initialValues.charity}
                      tabType={tabType}
                      from={"ProgramDetail"}
                    />
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
};
export default CharityProgramDetails;
