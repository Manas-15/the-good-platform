import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DonationConsent from "../Shared/DonationConsent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PaymentSchema } from "../Validations";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Payment from "../Payment/Payment";
import ReviewAmountBox from "../Shared/ReviewAmountBox";
import donationsConsent from "../../config/donationsConsent.json";
import {
  viewPortalConstants,
  payrollConstants,
  userConstants
} from "../../constants";

const FormDatePicker = ({ errors, touched }) => {
  return (
    <>
      <Field name="customerDob" placeholder="Date of Birth*" className="ml-3">
        {({ field, meta, form: { setFieldValue } }) => {
          return (
            <DatePicker
              {...field}
              className={
                "form-control" +
                (errors.customerDob && touched.customerDob ? " is-invalid" : "")
              }
              autoComplete="none"
              maxDate={new Date()}
              showMonthDropdown={true}
              showYearDropdown={true}
              dropdownMode="select"
              selected={(field.value && new Date(field.value)) || null}
              dateFormat="MM-dd-yyyy"
              onChange={(val) => {
                setFieldValue(field.name, val);
                // setFieldValue(field.name, moment(val).format("YYYY-MM-DD"));
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage
        name="customerDob"
        component="div"
        className="invalid-feedback d-inline-block"
      />
    </>
  );
};
const DonateSecondStep = ({
  frequency,
  selectedCharity,
  selectedAmount,
  employee
}) => {
  // Math.random().toString(36).slice(2)
  let charityFirstTwoChar, employeeFirstTwoChar;
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const selectedOrganization = useSelector(
    (state) => state?.selectedOrganization?.organization
  );
  const individualSelectedCharity = useSelector(
    (state) => state?.selectedCharity?.charity
  );
  const loggedInUserType = useSelector(
    (state) => state?.user?.loggedinUserType
  );
  if (selectedCharity) {
    charityFirstTwoChar = selectedCharity?.charityName
      ?.slice(0, 2)
      ?.toLowerCase();
    employeeFirstTwoChar = employee?.name?.slice(0, 2)?.toLowerCase();
  }
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const initialValues = {
    orderId: selectedCharity
      ? charityFirstTwoChar + employeeFirstTwoChar + Date.now()
      : Math.random().toString(36).slice(2),
    orderExpiryTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    donationAmount: selectedAmount,
    customerId:
      loggedInUserType === userConstants.INDIVIDUAL
        ? employee?.individual_id.toString()
        : isCorporatePortal
        ? selectedCorporate?.corporate?.corporateId
          ? selectedCorporate?.corporate?.corporateId?.toString()
          : selectedCorporate?.corporate?.id?.toString()
        : employee?.uuid?.toString(),
    customerName: isCorporatePortal
      ? selectedCorporate?.corporate?.organizationName
      : employee?.name,
    customerEmail: isCorporatePortal
      ? selectedCorporate?.corporate?.email
      : employee?.email,
    customerPhone: isCorporatePortal
      ? selectedCorporate?.corporate?.contactNumber
      : employee?.phone,
    customerDob: isCorporatePortal ? "" : employee?.dob,
    customerPan: isCorporatePortal ? "" : employee?.pan,
    charity:
      loggedInUserType === userConstants.INDIVIDUAL
        ? {
            charityName: selectedCharity?.charityName,
            id: selectedCharity?.id,
            organisationId: selectedCharity?.organisationId,
            soicalName: selectedCharity?.soicalName,
            status: selectedCharity?.status,
            unitPrice: 500
          }
        : selectedCharity,
    //employee: isCorporatePortal ? null : employee,
    // corporate: isCorporatePortal ? selectedCorporate : null,
    corporateId:
      loggedInUserType === userConstants.INDIVIDUAL
        ? null
        : isCorporatePortal
        ? selectedCorporate?.corporate?.corporateId
          ? selectedCorporate?.corporate?.corporateId
          : selectedCorporate?.corporate?.id
        : employee?.corporateId,
    userId:
      loggedInUserType === userConstants.INDIVIDUAL
        ? employee?.individual_id
        : isCorporatePortal
        ? selectedCorporate?.corporate?.corporateId
          ? selectedCorporate?.corporate?.corporateId?.toString()
          : selectedCorporate?.corporate?.id?.toString()
        : employee?.emp_id?.toString(),
    userType:
      loggedInUserType === userConstants.INDIVIDUAL
        ? "Individual"
        : isCorporatePortal
        ? payrollConstants.CORPORATE_VIEW
        : payrollConstants.EMPLOYEE_VIEW,
    orderPaymentStatus: 1,
    orderNote: `Donated to ${selectedCharity?.charityName}`
  };
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentValues, setPaymentValues] = useState();
  const handleCheck = () => {
    setChecked(true);
    setOpen(false);
  };
  const closeCheck = () => {
    setChecked(false);
    setOpen(false);
  };
  const goToPayment = (data) => {
    data.donationConsent = `${donationsConsent?.consent} [Frequency: ${frequency}]`;
    setPaymentValues(data);
    setPaymentStep(true);
  };
  // const dispatch = useDispatch();
  return (
    <div>
      {paymentStep ? (
        <Payment
          selectedAmount={selectedAmount}
          paymentValues={paymentValues}
        />
      ) : (
        <div className="second-step">
          <ReviewAmountBox selectedAmount={selectedAmount} />
          <div className="row">
            <div className="col-md-12">
              <span className="bi-lock-fill fs-5 text-success"></span>
              <strong>Enter Your Details</strong>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={PaymentSchema}
            onSubmit={(values, { setSubmitting }) => {
              values.customerDob =
                values.customerDob &&
                moment(values.customerDob).format("YYYY-MM-DD");
              // values.customerPan = values?.customerPan?.toUpperCase();
              goToPayment(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
              /* and other goodies */
            }) => (
              <Form>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1">Name*</label>
                    <Field
                      name="customerName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.customerName && touched.customerName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="customerName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1">Email*</label>
                    <Field
                      name="customerEmail"
                      type="text"
                      className={
                        "form-control" +
                        (errors.customerEmail && touched.customerEmail
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="customerEmail"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1">Phone*</label>
                    <Field
                      name="customerPhone"
                      type="text"
                      maxLength={10}
                      className={
                        "form-control" +
                        (errors.customerPhone && touched.customerPhone
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="customerPhone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1 ml-1">Date of Birth</label>
                    <FormDatePicker errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1">PAN*</label>
                    <Field
                      name="customerPan"
                      type="text"
                      maxLength={10}
                      className={
                        "form-control text-uppercase" +
                        (errors.customerPan && touched.customerPan
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="customerPan"
                      component="div"
                      className="invalid-feedback"
                    />
                    <span className="blink_text">
                      Please note that if you do not provide your PAN Number,
                      you will not be able to claim 50% tax exemption u/s 80G in
                      India
                    </span>
                  </div>
                </div>
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
                          Please select the checkbox to your consent
                        </p>
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12 text-center">
                    <Button
                      className="btn btn-custom w-100 rounded-pill"
                      type="submit"
                      disabled={!checked}
                    >
                      <span className="fs-6 ml-2">Continue to Payment</span>
                    </Button>{" "}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {open && (
            <DonationConsent
              open={open}
              amount={selectedAmount}
              selectedCharity={selectedCharity}
              employee={employee}
              frequency={frequency}
              handleCheck={handleCheck}
              closeCheck={closeCheck}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default DonateSecondStep;
