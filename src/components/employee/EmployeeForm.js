import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { EmployeeSchema } from "./../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "./../../actions";

const initialValues = {
  name: "",
  email: "",
  empId: "",
  pan: "",
  corporateId: "",
  organizationJoiningDate: "",
  gender: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
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
const EmployeeForm = ({ type }) => {
  let history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const addingEmployee = useSelector(
    (state) => state.employees.addingEmployee
  );
  // if(type==='corporate'){
  //   initialValues.userType = 2
  // }else if(type==='corporate'){
  //   initialValues.userType = 3
  // }
  const dispatch = useDispatch();
  const employeeRegister = (values) => {
    setSubmitted(true);
    if (values.organizationName && values.email && values.corporateId) {
      dispatch(employeeActions.registerEmployee(values, type));
    }
  };

  return (
    <div style={{ width: "650px" }}>
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
            <h3>{type === "corporate" ? "Add Employee" : "Employee Register"}</h3>
            <hr />
            <h6>Basic Information</h6>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Employee Name</label>
              </div>
              <div className="col-md-8 form-group col">
                {/* <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="form-control"
                  placeholder="Enter employee name"
                />
                <span className="error">
                  {errors.name && touched.name && errors.name}
                </span> */}
                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Employee ID</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  name="empId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.empId}
                  className="form-control"
                  placeholder="Enter employee ID"
                />
                <span className="error">
                  {errors.empId && touched.empId && errors.empId}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Employee Email</label>
              </div>
              <div className="col-md-8">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="form-control"
                  placeholder="Enter email"
                />
                <span className="error">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">PAN Number</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  name="pan"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pan}
                  className="form-control"
                  placeholder="Enter pan"
                />
                <span className="error">
                  {errors.pan && touched.pan && errors.pan}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Organization Joining Date</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  name="organizationJoiningDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organizationJoiningDate}
                  className="form-control"
                  placeholder="Enter regd number"
                />
                <span className="error">
                  {errors.organizationJoiningDate &&
                    touched.organizationJoiningDate &&
                    errors.organizationJoiningDate}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Select Organization</label>
              </div>
              <div className="col-md-8">
                <select
                  name="corporateId"
                  className="form-select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="none">Select Organization</option>
                  {organizationOptions.map((corporate, index) => (
                    <option value={corporate.value} key={index}>
                      {corporate.label}
                    </option>
                  ))}
                </select>
                <span className="error">
                  {errors.corporateId &&
                    touched.corporateId &&
                    errors.corporateId}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Gender</label>
              </div>
              <div className="col-md-8">
                <select
                  name="gender"
                  className="form-select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="none">Select Gender</option>
                  {genderOptions.map((gender, index) => (
                    <option value={gender.value} key={index}>
                      {gender.label}
                    </option>
                  ))}
                </select>
                <span className="error">
                  {errors.gender && touched.gender && errors.gender}
                </span>
              </div>
            </div>
            <hr />
            <h6>Communication Details</h6>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Contact Number</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="contactNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactNumber}
                  placeholder="Enter contact number"
                />
                <span className="error">
                  {errors.contactNumber &&
                    touched.contactNumber &&
                    errors.contactNumber}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Address</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">City</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  placeholder="Enter city"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">State</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  placeholder="Enter state"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Country</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={addingEmployee}
                  >
                    {addingEmployee && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    {type === "corporate" ? "Add" : "Register"}
                  </button>
                </div>
              </div>
            </div>
            {type === "employee" && (
              <div className="forgot-password text-center">
                Already registered? <Link to="/sign-in">Sign In</Link>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default EmployeeForm;
