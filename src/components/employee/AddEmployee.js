import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  CountryRegionData,
} from "react-country-region-selector";
import { userConstants } from "../../constants";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  employeeId: "",
  pan: "",
  corporateProfileId: "7",
  corporateId: "",
  organizationJoiningDate: "",
  gender: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  userType: 3,
  password: "test@%^@#1023",
};
const organizationOptions = [
  { value: "1", label: "Workout Donar" },
  { value: "2", label: "Help Donar" },
  { value: "3", label: "Universe Donar" },
];
const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Transgender", label: "Transgender" },
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

const AddEmployee = () => {
  let history = useHistory();
  const corporateId = useSelector(
    (state) => state?.selectedCorporate?.corporate?.corporateId
  );
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const addinguser = useSelector((state) => state.employee.addinguser);
  const dispatch = useDispatch();
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const addEmployeeRegister = (values) => {
    values.state = state;
    values.country = country;
    values.corporateId = corporateId;
    console.log(values);
    setSubmitted(true);
    if (values.firstName && values.email && values.corporateProfileId) {
      values.email = values.email.toLowerCase();
      console.log(values.email);
      dispatch(employeeActions.addEmployee(values));
    }
  };

  console.log(country, state);

  const selectCountry = (country) => {
    setCountry(country);
  };
  const selectState = (state) => {
    setState(state);
  };
  return (
    <>
      <div style={{ width: "650px" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={EmployeeSchema}
          onSubmit={(values, { setSubmitting }) => {
            values.organizationJoiningDate = moment(
              values.organizationJoiningDate
            ).format("YYYY-MM-DD");
            addEmployeeRegister(values);
            // console.log(values);
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
              <h3>Add Employee</h3>
              <hr />
              <h6>Basic Information</h6>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">
                    First Name<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-md-8">
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
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">
                    Last Name<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="lastName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.lastName && touched.lastName ? " is-invalid" : "")
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
                <div className="col-md-4">
                  <label className="mt-1">
                    Employee Email<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="email"
                    // disabled={id}
                    type="email"
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
                <div className="col-md-4">
                  <label className="mt-1">
                    Employee ID<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="employeeId"
                    type="text"
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
                <div className="col-md-4">
                  <label className="mt-1">
                    PAN<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="pan"
                    type="text"
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
                <div className="col-md-4">
                  <label className="mt-1">Organization Joining Date</label>
                </div>
                <div className="col-md-8">
                  <FormDatePicker errors={errors} touched={touched} />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Select Gender</label>
                </div>
                <div className="col-md-8">
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
                <div className="col-md-4">
                  <label className="mt-1">Contact Number</label>
                </div>
                <div className="col-md-8">
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
                <div className="col-md-4">
                  <label className="mt-1">Address</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="address"
                    type="text"
                    className={
                      "form-control" +
                      (errors.address && touched.address ? " is-invalid" : "")
                    }
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">City</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="city"
                    type="text"
                    className={
                      "form-control" +
                      (errors.city && touched.city ? " is-invalid" : "")
                    }
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">State</label>
                </div>
                <div className="col-md-8">
                  <RegionDropdown
                    name="state"
                    country={country}
                    value={state}
                    onChange={(val) => selectState(val)}
                    className={
                      "form-select" +
                      (errors.state && touched.state ? " is-invalid" : "")
                    }
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Country</label>
                </div>
                <div className="col-md-8">
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
              </div>

              <div className="text-center">
                <div className="row">
                  <div className="col-md-4 offset-md-4 ">
                    <button
                      type="submit"
                      className="btn btn-custom btn-block"
                      //   disabled={addingCorporate}
                    >
                      {/* {addingCorporate && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )} */}

                      {/* <span className="spinner-border spinner-border-sm mr-1"></span> */}
                      {"Add"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddEmployee;
