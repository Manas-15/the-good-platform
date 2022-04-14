import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import { EmployeeSchema } from "./../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "./../../actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  name: "",
  email: "",
  empId: "",
  pan: "",
  corporateId: 1,
  organizationJoiningDate: "",
  gender: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  userType: 3,
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
// const FormDatePicker = (props) => {
//   console.log("FormDatePicker >>>>>>>>>>>>>>>>>", props)
//   return (
//     <Field name="organizationJoiningDate" className="form-control">
//       {({ field, meta, form: { setFieldValue } }) => {
//         return (
//           <DatePicker
//             {...field}
//             selected={field.value || null}
//             onChange={(val) => {
//               setFieldValue(field.name, val);
//             }}
//           />
//         );
//       }}
//     </Field>
//   );
// };
const EmployeeForm = ({ type }) => {
  let history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const addingEmployee = useSelector((state) => state.employees.addingEmployee);
  // if(type==='corporate'){
  //   initialValues.userType = 2
  // }else if(type==='corporate'){
  //   initialValues.userType = 3
  // }
  const dispatch = useDispatch();
  const employeeRegister = (values) => {
    setSubmitted(true);
    if (values.name && values.email && values.corporateId) {
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
            <h3>
              {type === "corporate" ? "Add Employee" : "Employee Register"}
            </h3>
            <hr />
            <h6>Basic Information</h6>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Employee Name</label>
              </div>
              <div className="col-md-8 form-group col">
                <Field
                  name="name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Employee Email</label>
              </div>
              <div className="col-md-8">
                <Field
                  name="email"
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
                <label className="mt-1">Employee ID</label>
              </div>
              <div className="col-md-8">
                <Field
                  name="empId"
                  type="text"
                  className={
                    "form-control" +
                    (errors.empId && touched.empId ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="empId"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">PAN Number</label>
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
                <Field
                  name="organizationJoiningDate"
                  type="text"
                  className={
                    "form-control" +
                    (errors.organizationJoiningDate &&
                    touched.organizationJoiningDate
                      ? " is-invalid"
                      : "")
                  }
                />
                {/* <FormDatePicker /> */}
                <ErrorMessage
                  name="organizationJoiningDate"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Corporate</label>
              </div>
              <div className="col-md-8">
                <Field
                  name="corporateId"
                  as="select"
                  className={
                    "form-control" +
                    (errors.corporateId && touched.corporateId
                      ? " is-invalid"
                      : "")
                  }
                >
                  <option value="none">Select Corporate</option>
                  {organizationOptions.map((corporate, index) => (
                    <option value={corporate.value} key={index}>
                      {corporate.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="corporateId"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="mt-1">Gender</label>
              </div>
              <div className="col-md-8">
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
              <div className="col-md-4">
                <label className="mt-1">Contact Number</label>
              </div>
              <div className="col-md-8">
                <Field
                  name="contactNumber"
                  type="text"
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
                <Field
                  name="state"
                  type="text"
                  className={
                    "form-control" +
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
