import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { EmployeeSchema } from "./../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { corporateActions } from "./../../actions";

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
  const addingCorporate = useSelector(
    (state) => state.corporates.addingCorporate
  );
  if(type==='corporate'){
    initialValues.userType = 2
  }else if(type==='corporate'){
    initialValues.userType = 3
  }
  const dispatch = useDispatch();
  const corporateRegister = (values) => {
    console.log("create coming", values);
    setSubmitted(true);
    if (values.organizationName && values.email && values.regdNumber) {
      dispatch(corporateActions.registerCorporate(values, type));
    }
    // axios({
    //   'url': API.login,
    //   'headers': {
    //       'content-type':'application/octet-stream',
    //       'x-rapidapi-host':'example.com',
    //       // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
    //   },
    //   'params': {
    //       'search':'parameter',
    //   },
    // })
  };

  return (
    <div style={{ width: "650px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeSchema}
        onSubmit={(values, { setSubmitting }) => {
          corporateRegister(values);
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
          <form>
            <h3>Employee Register</h3>
            <hr />
            <h6>Basic Information</h6>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Employee Name</label>
              </div>
              <div className="col-md-8">
                <input
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
                </span>
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
                    <option value={corporate.value} key={index}>{corporate.label}</option>
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
                    <option value={gender.value} key={index}>{gender.label}</option>
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
                  placeholder="Enter country"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block">
                {addingCorporate && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Register
              </button>
            </div>
            <div className="forgot-password text-center">
              Already registered? <Link to="/sign-in">Sign In</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default EmployeeForm;
