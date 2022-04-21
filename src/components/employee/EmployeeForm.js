import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { EmployeeSchema } from "./../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "./../../actions";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./../../assets/css/loginForm.scss";

const initialValues = {
  employeeName: "",
  email: "",
  employeeId: "",
  pan: "",
  corporateProfileId: 1,
  organizationJoiningDate: "",
  gender: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  userType: 3,
  password: "test@123",
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
      <Field
        name="organizationJoiningDate"
        placeholder="Organization Joining Date*"
      >
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

  const addingEmployee = useSelector((state) => state.employee.addingEmployee);
  const dispatch = useDispatch();
  const employeeRegister = (values) => {
    setSubmitted(true);
    if (values.employeeName && values.email && values.corporateProfileId) {
      dispatch(employeeActions.registerEmployee(values, type));
    }
  };

  return (
    <>
      <div class="row align-items-center authFormMargin">
        <div class="col-md-6">
          <div class="authForm registerLeftContent">
            <h1 class="textHeading">Welcome to The Good Platform!</h1>
            <p class="textParagraph">
              Before we get started, let's quickly set up your account
            </p>
            <img height="350" src="/assets/img/smartphone2.png" />
          </div>
        </div>
        <div class="col-md-5 formStyles">
          <div class="registrationContent ">
            <Formik
              initialValues={initialValues}
              validationSchema={EmployeeSchema}
              onSubmit={(values, { setSubmitting }) => {
                employeeRegister(values);
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
                    Create your account
                  </h5>
                  <hr />
                  <h6>Basic Information</h6>
                  <div className="row mb-4">
                    {/* <div className="col-md-4">
                <label className="mt-1">Employee Name</label>
              </div> */}
                    <div className="col-md-12">
                      <Field
                        name="employeeName"
                        type="text"
                        placeholder="Employee Name*"
                        className={
                          "form-control" +
                          (errors.employeeName && touched.employeeName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="employeeName"
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
                    {/* <div className="col-md-4">
                <label className="mt-1">PAN Number</label>
              </div> */}
                    <div className="col-md-12">
                      <Field
                        name="pan"
                        type="text"
                        placeholder="PAN*"
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
                <label className="mt-1">Organization Joining Date</label>
              </div> */}
                    <div className="col-md-12">
                      <FormDatePicker errors={errors} touched={touched} />
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
                          "form-control" +
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
                        className={
                          "form-control" +
                          (errors.city && touched.city ? " is-invalid" : "")
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    {/* <div className="col-md-4">
                <label className="mt-1">State</label>
              </div> */}
                    <div className="col-md-12">
                      <Field
                        name="state"
                        type="text"
                        placeholder="State"
                        className={
                          "form-control" +
                          (errors.state && touched.state ? " is-invalid" : "")
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    {/* <div className="col-md-4">
                <label className="mt-1">Country</label>
              </div> */}
                    <div className="col-md-12">
                      <Field
                        name="country"
                        type="text"
                        placeholder="Country"
                        className={
                          "form-control" +
                          (errors.country && touched.country
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn registrationButton"
                      disabled={addingEmployee}
                    >
                      {addingEmployee && (
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
