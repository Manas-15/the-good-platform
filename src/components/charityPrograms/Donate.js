import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DonateAmount from "./DonateAmount";
import {
  donationPreferenceActions,
  selectedCharityActions
} from "../../actions";
import { charityProgramActions } from "../../actions";
import {
  donationPreferenceConstants,
  viewPortalConstants,
  userConstants
} from "../../constants";
import DonationConsent from "../Shared/DonationConsent";
import { charityProgramConstants } from "../../constants";
import DonateSecondStep from "./DonateSecondStep";
import donationsConsent from "../../config/donationsConsent.json";
import { history } from "../../helpers";
import AddedDonationFromDetail from "./AddedDonationFromDetail";
const preferenceForm = {
  corporateId: "",
  employeeId: "",
  charityProgramId: "",
  socialOrganizationId: "",
  donationAmount: "",
  frequency: "",
  isConsentCheck: "",
  donationConsent: "",
  repeat: ""
};
const Donate = ({
  frequency,
  selectedCharity,
  tabType,
  from,
  currentPortal,
  repeatPreference,
  customProgram
}) => {
  const employee = useSelector((state) => state.employee.user);
  const currentView = useSelector((state) => state.currentView);
  const otherUser = useSelector((state) => state.user);
  const loggedInUserType = useSelector(
    (state) => state?.user?.loggedinUserType
  );
  const [selectedAmount, setSelectedAmount] = useState();
  const [val, setVal] = useState();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showNextStep, setShowNextStep] = useState(false);
  const [addedFromProgramDetail, setAddedFromProgramDetail] = useState(false);
  // const [customProgramDonate, setCustomProgramDonate] = useState();
  const isCorporatePortal = employee?.user_type === userConstants.CORPORATE;
  const charityProgram = useSelector((state) => state?.charityPrograms);
  const charityReducer = useSelector((state) => state?.selectedCharity);
  // const isEmployeePortal = employee?.user_type === userConstants.EMPLOYEE;
  // const isProgramDetail = history.location.pathname.includes("/programs/");
  const selectedOrganization = useSelector(
    (state) => state.selectedOrganization
  );
  useEffect(() => {
    if (selectedCharity) {
      // dispatch(
      //   charityProgramActions.fetchProgramPrice({
      //     programId: selectedOrganization?.organization?.id
      //   })
      // );
      setSelectedAmount(
        charityReducer?.fetchedPrice?.msg
          ? selectedCharity?.unitPrice * 1
          : charityReducer?.fetchedPrice?.unit_price_box1
          ? charityReducer?.fetchedPrice?.unit_price_box1
          : selectedCharity?.employeePreferenceId
          ? selectedCharity?.donationAmount
            ? selectedCharity?.donationAmount
            : selectedCharity?.unitPrice
          : selectedCharity?.unitPrice
      );
    } else {
      setShowNextStep(false);
    }
    if (selectedCharity?.donated && from) {
      setAddedFromProgramDetail(true);
    }
  }, [selectedCharity]);
  useEffect(() => {
    dispatch(
      selectedCharityActions.fetchProgramPrice({
        programId: charityReducer?.charity?.id
      })
    );
  }, [selectedCharity]);
  const handleCheck = () => {
    setChecked(true);
    setOpen(false);
  };
  const closeCheck = () => {
    setChecked(false);
    setOpen(false);
  };
  const setAmount = (amount) => {
    setSelectedAmount(amount);
  };
  const dispatch = useDispatch();
  const saveDonationPreference = () => {
    preferenceForm.corporateId = repeatPreference
      ? selectedCharity?.corporateId
      : employee?.corporateId
      ? employee?.corporateId
      : null;
    preferenceForm.corporateName = repeatPreference
      ? selectedCharity?.corporateName
      : employee?.corporateName
      ? employee?.corporateName
      : null;
    preferenceForm.employeeId = employee?.emp_id;
    preferenceForm.charityProgramId = repeatPreference
      ? selectedCharity?.charityProgramId
      : selectedCharity?.charityId
      ? selectedCharity?.charityId
      : selectedCharity?.id;
    preferenceForm.charityProgramName = repeatPreference
      ? selectedCharity?.charityProgram
      : selectedCharity?.charityName
      ? selectedCharity?.charityName
      : null;
    preferenceForm.socialOrganizationId = repeatPreference
      ? selectedCharity?.socialOrganizationId
      : selectedCharity?.soicalId
      ? selectedCharity?.soicalId
      : selectedCharity?.organisationId;
    preferenceForm.socialOrganizationName = repeatPreference
      ? selectedCharity?.socialOrganization
      : selectedCharity?.soicalName
      ? selectedCharity?.soicalName
      : null;
    preferenceForm.donationAmount = selectedAmount;
    preferenceForm.frequency =
      frequency === donationPreferenceConstants.MONTHLY ? 2 : 1;
    preferenceForm.isConsentCheck = true;
    preferenceForm.donationConsent = `${donationsConsent?.consent} [Frequency: ${frequency}]`;
    if (repeatPreference) {
      preferenceForm.repeat = true;
    }
    if (selectedCharity?.employeePreferenceId && !repeatPreference) {
      preferenceForm.employeePreferenceId =
        selectedCharity?.employeePreferenceId;
      preferenceForm.type = null;
      dispatch(
        donationPreferenceActions.updateDonationPreference(preferenceForm)
      );
    } else {
      dispatch(charityProgramActions.saveDonationPreference(preferenceForm));
    }
    const sidepanel = document.getElementById("sidepanel");
    if (sidepanel) {
      document.getElementById("sidepanel").classList.remove("is-open");
    }
    setChecked(false);
    if (from) {
      setAddedFromProgramDetail(true);
      selectedCharity.donated = true;
    }
  };
  const nextStep = () => {
    setShowNextStep(!showNextStep);
  };
  return (
    <>
      {addedFromProgramDetail ? (
        <AddedDonationFromDetail
          charity={selectedCharity}
          selectedAmount={selectedAmount}
          frequency={frequency}
        />
      ) : (
        !showNextStep && (
          <>
            <div className="row mb-4">
              <div className="col-md-12">
                <span className="bi-lock-fill fs-5 text-success"></span>
                Choose an amount to donate
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 text-right pl-0">
                <DonateAmount
                  isActive={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedAmount === selectedCharity?.unitPrice * 1
                      : selectedAmount ===
                        charityReducer?.fetchedPrice?.unit_price_box1
                  }
                  amount={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedCharity?.unitPrice * 1
                      : charityReducer?.fetchedPrice?.unit_price_box1
                  }
                  setSelectedAmount={setAmount}
                />
              </div>
              <div className="col-md-6 pr-0">
                <DonateAmount
                  isActive={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedAmount === selectedCharity?.unitPrice * 2
                      : selectedAmount ===
                        charityReducer?.fetchedPrice?.unit_price_box2
                  }
                  amount={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedCharity?.unitPrice * 2
                      : charityReducer?.fetchedPrice?.unit_price_box2 === 0
                      ? charityReducer?.fetchedPrice?.unit_price_box1 * 2
                      : charityReducer?.fetchedPrice?.unit_price_box2
                  }
                  setSelectedAmount={setAmount}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 text-right pl-0">
                <DonateAmount
                  isActive={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedAmount === selectedCharity?.unitPrice * 3
                      : selectedAmount ===
                        charityReducer?.fetchedPrice?.unit_price_box3
                  }
                  amount={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedCharity?.unitPrice * 3
                      : charityReducer?.fetchedPrice?.unit_price_box3 === 0
                      ? charityReducer?.fetchedPrice?.unit_price_box1 * 3
                      : charityReducer?.fetchedPrice?.unit_price_box3
                  }
                  setSelectedAmount={setAmount}
                />
              </div>
              <div className="col-md-6 pr-0">
                <DonateAmount
                  isActive={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedAmount === selectedCharity?.unitPrice * 4
                      : selectedAmount ===
                        charityReducer?.fetchedPrice?.unit_price_box4
                  }
                  amount={
                    charityReducer?.fetchedPrice?.msg
                      ? selectedCharity?.unitPrice * 4
                      : charityReducer?.fetchedPrice?.unit_price_box4 === 0
                      ? charityReducer?.fetchedPrice?.unit_price_box1 * 4
                      : charityReducer?.fetchedPrice?.unit_price_box4
                  }
                  setSelectedAmount={setAmount}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-10 offset-md-1">
                <input
                  type="text"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={val}
                  onChange={(e) =>
                    setVal((v) =>
                      e.target.validity.valid
                        ? setSelectedAmount(e.target.value)
                        : v
                    )
                  }
                  className="form-control"
                  placeholder="Other Amount"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 text-center offset-md-1">
                <p className="mb-2">
                  <span className="bi-heart-fill fs-6 ml-2 cursor-pointer text-danger"></span>
                  &nbsp;How will my donation help?
                </p>
                <p className="mb-2">
                  Your contribution will used towards giving India's
                  underprevileged children happier childhoods.
                </p>
                <p className="mb-0">
                  Your dontaions are tax excepted under 80G of the Indian Income
                  Tax Act.
                </p>
              </div>
            </div>
            {((otherUser?.detail?.userRole !==
              (viewPortalConstants.PAYMENT_ADMIN ||
                viewPortalConstants.FO_ADMIN) &&
              tabType === charityProgramConstants.SPONSOR &&
              !isCorporatePortal &&
              !addedFromProgramDetail &&
              loggedInUserType !== userConstants.INDIVIDUAL) ||
              repeatPreference) && (
              <div className="row">
                <div className="col-md-12">
                  <label className="m-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setOpen(true)}
                    />
                    <Link
                      className="text-dark d-inline pl-0"
                      onClick={() => setOpen(true)}
                    >
                      <p className="ml-2 d-inline-block text-decoration-underline">
                        Please select the checkbox to your consents
                      </p>
                    </Link>
                  </label>
                </div>
              </div>
            )}
            <div
              className={
                "row mb-4 " +
                ((otherUser?.detail?.userRole !==
                  (viewPortalConstants.PAYMENT_ADMIN ||
                    viewPortalConstants.FO_ADMIN) &&
                  tabType === charityProgramConstants.SPONSOR &&
                  !isCorporatePortal &&
                  loggedInUserType !== userConstants.INDIVIDUAL) ||
                repeatPreference
                  ? ""
                  : "mt-4")
              }
            >
              <div className="col-md-12 text-center">
                <button
                  className="btn btn-custom w-100 rounded-pill"
                  disabled={
                    (otherUser?.detail?.userRole !==
                      (viewPortalConstants.PAYMENT_ADMIN ||
                        viewPortalConstants.FO_ADMIN) &&
                      tabType === charityProgramConstants.SPONSOR &&
                      !isCorporatePortal &&
                      loggedInUserType !== userConstants.INDIVIDUAL) ||
                    repeatPreference
                      ? addedFromProgramDetail || !checked
                      : false
                  }
                  onClick={
                    (otherUser?.detail?.userRole !==
                      (viewPortalConstants.PAYMENT_ADMIN ||
                        viewPortalConstants.FO_ADMIN) &&
                      tabType === charityProgramConstants.SPONSOR &&
                      !isCorporatePortal &&
                      loggedInUserType !== userConstants.INDIVIDUAL) ||
                    repeatPreference
                      ? saveDonationPreference
                      : nextStep
                  }
                >
                  <span className="fs-6 ml-2">
                    {(otherUser?.detail?.userRole !==
                      (viewPortalConstants.PAYMENT_ADMIN ||
                        viewPortalConstants.FO_ADMIN) &&
                      tabType === charityProgramConstants.SPONSOR &&
                      !isCorporatePortal &&
                      loggedInUserType !== userConstants.INDIVIDUAL) ||
                    repeatPreference ? (
                      <>
                        <span
                          className={`${
                            addedFromProgramDetail
                              ? "text-danger"
                              : "text-white"
                          } bi-heart-fill fs-6 ml-2`}
                        ></span>
                        &nbsp;{selectedCharity?.donated ? "Update" : "Add"}{" "}
                        Donation Preference {selectedCharity?.donated}
                      </>
                    ) : (
                      "Next"
                    )}
                  </span>
                </button>
              </div>
            </div>
            {open && (
              <DonationConsent
                open={open}
                amount={selectedAmount?.toLocaleString()}
                selectedCharity={selectedCharity}
                employee={employee}
                frequency={frequency}
                handleCheck={handleCheck}
                closeCheck={closeCheck}
              />
            )}
          </>
        )
      )}
      {showNextStep && (
        <DonateSecondStep
          frequency={frequency}
          selectedCharity={selectedCharity}
          selectedAmount={selectedAmount}
          employee={employee}
          donateFor={customProgram}
        />
      )}
    </>
  );
};
export default Donate;
