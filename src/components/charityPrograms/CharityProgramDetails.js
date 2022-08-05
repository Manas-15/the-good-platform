import React, { useEffect, useRef, useState } from "react";
import "./../../assets/css/charityProgramsList.scss";
import {
  donationPreferenceConstants,
  viewPortalConstants,
  userConstants,
} from "../../constants";
import { charityProgramActions, selectedCharityActions } from "../../actions";
import { Progress, Tooltip, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import Donate from "./Donate";
import DonateHeader from "./DonateHeader";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js";
import donationsConsent from "../../config/donationsConsent.json";
import ProgramDetailsIndividual from "./ProgramDetailsIndividual";
import * as moment from "moment";
const TabPane = Tabs.TabPane;
Chart.register(ArcElement);

const CharityProgramDetails = (props) => {
  const dispatch = useDispatch();
  let charityFirstTwoChar, employeeFirstTwoChar;
  // const [tabType, setTabType] = useState(charityProgramConstants.SPONSOR);
  const selectedCharity = useSelector((state) => state.selectedCharity);

  const programDetail = useSelector(
    (state) => state?.charityPrograms?.programDetail
  );
  const selectedOrganization = useSelector(
    (state) => state.selectedOrganization
  );
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
  const indivisualLoggedUser =
    loggedInUserType.toString() === userConstants.INDIVIDUAL.toString();
  const corporateLoggedUser =
    loggedInUserType.toString() === userConstants.CORPORATE.toString();

  useEffect(() => {
    dispatch(
      charityProgramActions.getProgramDetail(
        indivisualLoggedUser
          ? {
              socialId: selectedOrganization?.organization?.id,
              programId: selectedCharity?.charity?.id,
              loggedInUserType: loggedInUserType,
            }
          : corporateLoggedUser
          ? {
              programId: selectedCharity?.charity?.id,
              loggedInUserType: loggedInUserType,
            }
          : {
              socialId: selectedOrganization?.organization?.id,
              programId: selectedCharity?.charity?.id,
              loggedInUserType: loggedInUserType,
              userId: user?.user_id,
            }
      )
    );
  }, []);

  if (selectedCharity) {
    charityFirstTwoChar = selectedCharity?.charityName
      ?.slice(0, 2)
      ?.toLowerCase();
    employeeFirstTwoChar = user?.name?.slice(0, 2)?.toLowerCase();
  }

  const initialValues = {
    orderId: selectedCharity
      ? charityFirstTwoChar + employeeFirstTwoChar + Date.now()
      : Math.random().toString(36).slice(2),
    orderExpiryTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    donationAmount: selectedCharity?.charity?.donationAmount,
    customerId: user?.uuid?.toString(),
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
    donationConsent: `${donationsConsent?.consent} [Frequency: ${selectedCharity?.charity?.frequency}]`,
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
          "rgb(122,231,125)",
        ],
      },
    ],
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
          "rgb(122,231,125)",
        ],
      },
    ],
  };
  useEffect(() => {
    dispatch(selectedCharityActions.selectedCharity(programDetail));
  }, [programDetail]);
  return (
    <>
      {loggedInUserType === userConstants.INDIVIDUAL && (
        <ProgramDetailsIndividual
          programId={selectedCharity?.charity?.id?.toString()}
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
                  {programDetail?.name}
                </h1>
                <h6 className="mb-3">
                  by
                  {selectedCharity?.charity?.soicalName
                    ? selectedCharity?.charity?.soicalName
                    : selectedOrganization?.organization?.name}
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
                    alt="Image"
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
                          <span className="detail-label">
                            {programDetail?.donors?.length}
                          </span>
                          <span className="detail-content">Donors</span>
                        </div>
                        <div className="col-md-6 p-1">
                          <span className="detail-label">
                            {programDetail?.duration
                              ? programDetail?.duration
                              : 15}
                          </span>
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
                      {programDetail?.description}
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
                        <p>{programDetail?.description}</p>
                        <div className="mt-3 mb-3">
                          What is the duration for this program?
                          <p>
                            {programDetail?.durationFrom} -{" "}
                            {programDetail?.durationTo}
                          </p>
                        </div>
                        <div className="mt-3 mb-3">
                          <p>
                            Total no. of beneficiaries:{" "}
                            {programDetail?.totalNumberOfBeneficiaries}
                          </p>
                        </div>
                        Who do you aim to benefit with this program?
                        <p className="mt-2">Beneficiary</p>
                        <div className="row mt-2">
                          <div className="col-md-6 pl-0">
                            <div className={`categotyButton`}>
                              <label
                                className={`active ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
                              >
                                <span>
                                  <img
                                    src="/assets/img/elderly.png"
                                    alt="Elderly"
                                  />{" "}
                                  {"People"}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4">Target Category</p>
                        <div className="row">
                          {programDetail?.typesOfBeneficiaries?.map(
                            (beneficiery) => (
                              <div className="col-md-6 mb-4 pl-0">
                                <div className={`categotyButton`}>
                                  <label
                                    className={`active ant-radio-button-wrapper ant-radio-button-wrapper-checked purposePreview`}
                                  >
                                    <span>
                                      <img
                                        src="/assets/img/women.png"
                                        alt="Women"
                                      />{" "}
                                      {beneficiery}
                                    </span>
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                          {/* <div className="col-md-6 mb-4">
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
                          </div> */}
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
                  {/* <TabPane tab={"Our Plan"} key={"pur_plan"}>
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
                  </TabPane> */}
                  {/* <TabPane tab={"Budget"} key={"budget"}>
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
                                  position: "right",
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPane> */}
                  <TabPane tab={"Geography"} key={"geography"}>
                    <div className="row">
                      <div className="row mt-3">
                        <div className="card col-md-6 p-2 mb-3">
                          {programDetail?.geographyModel?.map((item) => (
                            <div>
                              <p>
                                <strong>District:</strong> {item?.district}
                              </p>
                              <p>
                                <strong>City:</strong> {item?.city}
                              </p>
                              <p>
                                <strong>State:</strong> {item?.state}
                              </p>
                              <p>
                                <strong>Taluk:</strong> {item?.taluk}
                              </p>
                              <p>
                                <strong>PostalCode:</strong> {item?.postalCode}
                              </p>
                              <p>
                                <strong>Latitude:</strong> {item?.latitude}
                              </p>
                              <p>
                                <strong>Longitude:</strong> {item?.longitude}
                              </p>
                            </div>
                          ))}
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
                      {programDetail?.donors?.length > 0 && (
                        <h4 className="mb-0">
                          Donors ({programDetail?.donors?.length})
                        </h4>
                      )}
                      <div className="col-md-12">
                        {programDetail?.donors?.length > 0 ? (
                          <Tabs defaultActiveKey={0}>
                            <TabPane tab={<span>Most Generious</span>} key={0}>
                              {programDetail?.donors?.map((user) => (
                                <div className="donor">
                                  <div className="section">
                                    {/* <img src="/assets/img/no-image.png" /> */}
                                    <div className="name-circle">
                                      {user?.name?.split(" ")?.[0]?.charAt(0)}
                                      {user?.name?.split(" ")?.pop()?.charAt(0)}
                                    </div>
                                    <div className="content">
                                      <h5>{user?.name}</h5>
                                      <p className="donated">
                                        Donated ₹{user?.amount}
                                      </p>
                                      <p className="timeline">
                                        {moment(user?.date).fromNow()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </TabPane>
                            <TabPane tab={<span>Recent</span>} key={1}>
                              {programDetail?.donors?.map((user) => (
                                <div className="donor">
                                  <div className="section">
                                    {/* <img src="/assets/img/no-image.png" /> */}
                                    <div className="name-circle">
                                      {user?.name?.split(" ")?.[0]?.charAt(0)}
                                      {user?.name?.split(" ")?.pop()?.charAt(0)}
                                    </div>
                                    <div className="content">
                                      <h5>{user?.name}</h5>
                                      <p className="donated">
                                        Donated ₹{user?.amount}
                                      </p>
                                      <p className="timeline">
                                        {moment(user?.date).fromNow()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </TabPane>
                          </Tabs>
                        ) : (
                          <h6 className="mt-4 text-center">
                            No donation made to this program yet.
                          </h6>
                        )}
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
                      selectedCharity={initialValues?.charity}
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
                      selectedCharity={initialValues?.charity}
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
