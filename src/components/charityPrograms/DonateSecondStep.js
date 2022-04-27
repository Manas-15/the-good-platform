import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DonateAmount from "./DonateAmount";
import { donationPreferenceActions } from "./../../actions";
import { donationPreferenceConstants } from "./../../constants";
import DonationConsent from "./../Shared/DonationConsent";
import { charityProgramConstants } from "./../../constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PaymentSchema } from "./../Validations";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Cashfree from "./../Cashfree/Cashfree"

const initialValues = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  mobile: "",
  address: "",
  city: "",
  state: "",
  pin: "",
  country: "",
};
const FormDatePicker = ({ errors, touched }) => {
  return (
    <>
      <Field
        name="dob"
        placeholder="Date of Birth*"
        className="ml-3"
      >
        {({ field, meta, form: { setFieldValue } }) => {
          return (
            <DatePicker
              {...field}
              className={
                "form-control" +
                (errors.dob &&
                touched.dob
                  ? " is-invalid"
                  : "")
              }
              autoComplete="none"
              maxDate={new Date()}
              selected={(field.value && new Date(field.value)) || null}
              dateFormat="yyyy-MM-dd"
              onChange={(val) => {
                setFieldValue(field.name, moment(val).format("YYYY-MM-DD"));
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage
        name="dob"
        component="div"
        className="invalid-feedback d-inline-block"
      />
    </>
  );
};
const DonateSecondStep = ({ frequency, selectedCharity, selectedAmount, employee }) => {
  const [val, setVal] = useState();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const handleCheck = () => {
    setChecked(true);
    setOpen(false);
  };
  const closeCheck = () => {
    setChecked(false);
    setOpen(false);
  };
  const dispatch = useDispatch();
  return (
    <div>      
        {paymentStep ? <Cashfree /> : 
        <div class="second-step">
          <div className="row">
            <div className="col-md-12">
              <span className="bi-lock-fill fs-5 text-success"></span>Enter Your
              Details
            </div>
          </div>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={PaymentSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("coming to submit here")
              setPaymentStep(true);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1">Title</label>                
                    <Field
                      name="title"
                      type="text"
                      className={
                        "form-control" +
                        (errors.title && touched.title
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label className="mt-1">First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.firstName && touched.firstName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col-md-6">
                  <label className="mt-1">Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.lastName && touched.lastName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1">Email</label>                
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="mt-1 ml-1">Date of Birth</label>
                    <FormDatePicker errors={errors} touched={touched} />
                  </div>
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
                      className="btn btn-primary w-100 rounded-pill"
                      type="submit"
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
        }
    </div>
  );
};
export default DonateSecondStep;
