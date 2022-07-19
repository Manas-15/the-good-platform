import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { corporateActions } from "../../actions";
import { Link } from "react-router-dom";
import { EmployeeSchema } from "../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../actions";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./../../assets/css/loginForm.scss";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
import { userConstants } from "../../constants";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  employeeId: "",
  pan: "",
  corporateProfileId: "",
  gender: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  userType: 3,
  password: ""
};
const organizationOptions = [
  { value: "1", label: "Workout Donar" },
  { value: "2", label: "Help Donar" },
  { value: "3", label: "Universe Donar" }
];
const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Transgender", label: "Transgender" }
];
const FormDatePicker = ({ errors, touched }) => {
  return (
    <>
      <Field name="organizationJoiningDate">
        {({ field, meta, form: { setFieldValue } }) => {
          return (
            <DatePicker
              {...field}
              className={
                "form-control" +
                (errors.organizationJoiningDate &&
                touched.organizationJoiningDate
                  ? " is-invalid"
                  : "")
              }
              autoComplete="none"
              placeholderText="Organization Joining Date"
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
        name="organizationJoiningDate"
        component="div"
        className="invalid-feedback d-inline-block"
      />
    </>
  );
};
const EmployeeForm = ({ type }) => {
  let history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const addinguser = useSelector((state) => state.employee.addinguser);
  const corporates = useSelector((state) => state.corporates);
  const selectedCorporate = useSelector(
    (state) => state.selectedCorporate.corporate
  );
  const dispatch = useDispatch();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState("false");
  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    dispatch(corporateActions.getCorporates());
  }, []);
  const employeeRegister = (values) => {
    values.state = state;
    values.country = country;
    console.log(values);
    setSubmitted(true);
    if (values.firstName && values.email && values.corporateProfileId) {
      values.email = values.email.toLowerCase();
      console.log(values.email);
      dispatch(employeeActions.register(values, userConstants.EMPLOYEE));
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
            <img
              height="350"
              src="/assets/img/smartphone2.png"
              alt="SmartPhone"
            />
          </div>
        </div>
        <div className="col-md-5 formStyles">
          <div className="registrationContent ">
            <Formik
              initialValues={initialValues}
              validationSchema={EmployeeSchema}
              onSubmit={(values, { setSubmitting }) => {
                values.organizationJoiningDate = moment(
                  values.organizationJoiningDate
                ).format("YYYY-MM-DD");
                employeeRegister(values);
                console.log(values);
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
                <Form autoComplete="false">
                  <h5 className="text-center cardHeading">
                    Create your account
                  </h5>
                  <hr />
                  <h6>Basic Information</h6>
                  <div className="row mb-4">
                    {/* <div className="col-md-4">
                <label className="mt-1">Employee Name</label>
              </div> */}
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
                    {/* <div className="col-md-4">
                <label className="mt-1">Employee Email</label>
              </div> */}
                    <div className="col-md-12">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Employee Email*"
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
                    {/* <div className="col-md-4">
                <label className="mt-1">Employee ID</label>
              </div> */}
                    <div className="col-md-12">
                      <Field
                        name="employeeId"
                        type="text"
                        placeholder="Employee ID*"
                        maxLength={20}
                        className={
                          "form-control" +
                          (errors.employeeId && touched.employeeId
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="employeeId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Field
                        name="password"
                        // disabled={id}
                        placeholder="Password"
                        type={showPassword ? "password" : "text"}
                        className={
                          "form-control" +
                          (errors.password && touched.password
                            ? " is-invalid"
                            : "")
                        }
                      />
                      {showPassword ? (
                        <div onClick={(e) => toggleShowPassword(e)}>
                          <i class="bi bi-eye-slash"></i>
                        </div>
                      ) : (
                        <div onClick={(e) => toggleShowPassword(e)}>
                          <i class="bi bi-eye"></i>
                        </div>
                      )}
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="row mb-4"></div>
                    {/* <div className="col-md-4">
                <label className="mt-1">PAN Number</label>
              </div> */}
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
                    <div className="col-md-12">
                      <Field
                        name="corporateProfileId"
                        as="select"
                        className={
                          "form-select" +
                          (errors.corporateProfileId &&
                          touched.corporateProfileId
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Corporate</option>
                        {corporates?.items?.data?.map((corporate, index) => (
                          <option value={corporate?.id} key={index}>
                            {corporate?.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="corporateProfileId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {errors.color && (
                      <div className="input-feedback">{errors.color}</div>
                    )}
                  </div>
                  {/* <div className="row mb-4">
                    <div className="col-md-12">
                      <FormDatePicker errors={errors} touched={touched} />
                    </div>
                  </div> */}
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
                    {/* <div className="col-md-4">
                <label className="mt-1">Contact Number</label>
              </div> */}
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
                    {/* <div className="col-md-4">
                <label className="mt-1">Address</label>
              </div> */}
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
                    {/* <div className="col-md-4">
                <label className="mt-1">City</label>
              </div> */}
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
                      // placeholder="Select State"
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
                  {type === "employee" && (
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
export default EmployeeForm;
