import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { IndividualSchema } from "./../Validations";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "./../../actions";

import "./../../assets/css/loginForm.scss";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { userConstants } from "../../constants";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  pan: "",
  gender: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  userType: 4,
  //   password: "test@%^@#1023",
};

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Transgender", label: "Transgender" },
];

const IndividualForm = ({ type }) => {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState();
  const addinguser = useSelector((state) => state.employee.addinguser);

  const dispatch = useDispatch();
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const individualRegister = (values) => {
    setSubmitted(true);
    if (values.firstName && values.email) {
      values.email = values.email.toLowerCase();
      dispatch(employeeActions.register(values, userConstants.INDIVIDUAL));
    }
  };
  const selectCountry = (country) => {
    setCountry(country);
  };
  const selectState = (state) => {
    setState(state);
  };
  return (
    <>
      <div className="row align-items-center authFormMargin">
        <div className="col-md-6">
          <div className="authForm registerLeftContent">
            <h1 className="textHeading">Welcome to The Good Platform!</h1>
            <p className="textParagraph">
              Before we get started, let's quickly set up your account
            </p>
            <img height="350" src="/assets/img/smartphone2.png" />
          </div>
        </div>
        <div className="col-md-5 formStyles">
          <div className="registrationContent ">
            <Formik
              initialValues={initialValues}
              validationSchema={IndividualSchema}
              onSubmit={(values, { setSubmitting }) => {
                individualRegister(values);
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
                  <h5 className="text-center cardHeading">
                    Create your Individual account
                  </h5>
                  <hr />
                  <h6>Basic Information</h6>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="First Name*"
                        maxLength={50}
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
                      <Field
                        name="lastName"
                        type="text"
                        placeholder="Last Name*"
                        maxLength={50}
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
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email*"
                        className={
                          "form-control" +
                          (errors.email && touched.email ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password*"
                        className={
                          "form-control" +
                          (errors.password && touched.password
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Field
                        name="pan"
                        type="text"
                        placeholder="PAN*"
                        style={{ textTransform: "uppercase" }}
                        maxLength={10}
                        className={
                          "form-control" +
                          (errors.pan && touched.pan ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="pan"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    {/* <div className="col-md-4">
                <label className="mt-1">Gender</label>
              </div> */}
                    <div className="col-md-12">
                      <Field
                        name="gender"
                        as="select"
                        className={
                          "form-select" +
                          (errors.gender && touched.gender ? " is-invalid" : "")
                        }
                      >
                        <option value="none">Select Gender</option>
                        {genderOptions.map((gender, index) => (
                          <option value={gender.value} key={index}>
                            {gender.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <hr />
                  <h6>Communication Details</h6>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Field
                        name="contactNumber"
                        type="text"
                        placeholder="Contact Number"
                        maxLength={10}
                        className={
                          "form-control" +
                          (errors.contactNumber && touched.contactNumber
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="contactNumber"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Field
                        name="address"
                        type="text"
                        placeholder="Address"
                        maxLength={100}
                        className={
                          "form-control" +
                          (errors.address && touched.address
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Field
                        name="city"
                        type="text"
                        placeholder="City"
                        maxLength={50}
                        className={
                          "form-control" +
                          (errors.city && touched.city ? " is-invalid" : "")
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-4  pl-3 pr-3">
                    <RegionDropdown
                      name="state"
                      country={country}
                      value={state}
                      placeholder="Select State"
                      onChange={(val) => selectState(val)}
                      className={
                        "form-select" +
                        (errors.country && touched.country ? " is-invalid" : "")
                      }
                    />
                  </div>
                  <div className="row mb-4 pl-3 pr-3">
                    <CountryDropdown
                      name="country"
                      value={country}
                      onChange={(val) => selectCountry(val)}
                      className={
                        "form-select" +
                        (errors.country && touched.country ? " is-invalid" : "")
                      }
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="termsCheck"
                        onClick={() => setIsTermsChecked(!isTermsChecked)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="termsCheck"
                      >
                        &nbsp;By signing up, I agree to the The Good
                        Platform&nbsp;
                        <Link
                          to="/privacy-policy"
                          target="_blank"
                          className="text-decoration-underline"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/terms-of-service"
                          target="_blank"
                          className="text-decoration-underline"
                        >
                          Terms of Service
                        </Link>
                        .
                      </label>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn registrationButton"
                      disabled={addinguser || !isTermsChecked}
                    >
                      {addinguser && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Create Account
                    </button>
                  </div>
                  {type === "Individual" && (
                    <div className="forgot-password text-center">
                      Already have an account?{" "}
                      <Link to="/sign-in">Sign In</Link>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default IndividualForm;
