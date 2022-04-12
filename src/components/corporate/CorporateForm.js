import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { CorporateSchema } from "./../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { corporateActions } from "./../../actions";

const initialValues = {
  organizationName: "",
  email: "",
  password: "test@123",
  website: "",
  regdNumber: "",
  organizationSize: "",
  organizationType: "",
  corporatePan: "",
  gstn: "",
  contactNumber: "",
  contactPerson: "",
  address: "",
  city: "",
  state: "",
  country: "",
  user_type: "",
};
const sizeOptions = [
  { value: "1-50", label: "1-50" },
  { value: "50-100", label: "50-100" },
  { value: "100-500", label: "100-500" },
  { value: "500-1000", label: "500-1000" },
  { value: ">1000", label: ">1000" },
];
const CorporateForm = ({ type }) => {
  let history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const addingCorporate = useSelector(
    (state) => state.corporates.addingCorporate
  );
  if(type==='admin'){
    initialValues.user_type = 1
  }else if(type==='corporate'){
    initialValues.user_type = 2
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
        enableReinitialize
        initialValues={initialValues}
        validationSchema={CorporateSchema}
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
          <Form>
            <h3>{type === "admin" ? "Add Corporate" : "Corporate Register"}</h3>
            <hr />
            <h6>Basic Information</h6>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Organization Name</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  name="organizationName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organizationName}
                  className="form-control"
                  placeholder="Organization Name"
                />
                <span className="error">
                  {errors.organizationName &&
                    touched.organizationName &&
                    errors.organizationName}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Organization Email</label>
              </div>
              <div className="col-md-8">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="form-control"
                  placeholder="Organization Email"
                />
                <span className="error">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Website</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  name="website"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.website}
                  className="form-control"
                  placeholder="Enter website"
                />
                <span className="error">
                  {errors.website && touched.website && errors.website}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Regd Number</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  name="regdNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.regdNumber}
                  className="form-control"
                  placeholder="Enter regd number"
                />
                <span className="error">
                  {errors.regdNumber && touched.regdNumber && errors.regdNumber}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Size</label>
              </div>
              <div className="col-md-8">
                <select
                  name="organizationSize"
                  className="form-select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="none">Select Corporate Size</option>
                  {sizeOptions.map((size, index) => (
                    <option value={size.value} key={index}>
                      {size.label}
                    </option>
                  ))}
                </select>
                <span className="error">
                  {errors.organizationSize &&
                    touched.organizationSize &&
                    errors.organizationSize}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Type</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="organizationType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organizationType}
                  placeholder="Enter type"
                />
                <span className="error">
                  {errors.organizationType &&
                    touched.organizationType &&
                    errors.organizationType}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Corporate PAN</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="corporatePan"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.corporatePan}
                  placeholder="Enter PAN"
                />
                <span className="error">
                  {errors.corporatePan &&
                    touched.corporatePan &&
                    errors.corporatePan}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">GSTN</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="gstn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gstn}
                  placeholder="Enter GSTN"
                />
                <span className="error">
                  {errors.gstn &&
                    touched.gstn &&
                    errors.gstn}
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
                  placeholder="Contact Number"
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
                <label className="mt-1">Contact Person</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="contactPerson"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactPerson}
                  placeholder="Contact Person"
                />
                <span className="error">
                  {errors.contactPerson &&
                    touched.contactPerson &&
                    errors.contactPerson}
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
                  placeholder="Address"
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
                  placeholder="City"
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
                  placeholder="State"
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
                    disabled={addingCorporate}
                  >
                    {addingCorporate && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    {type === "admin" ? "Add" : "Register"}
                  </button>
                </div>
              </div>
            </div>
            {type === "corporate" && (
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
export default CorporateForm;
