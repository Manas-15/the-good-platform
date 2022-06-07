import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  userType: "",
};
const sizeOptions = [
  { value: "1-50", label: "1-50" },
  { value: "50-100", label: "50-100" },
  { value: "100-500", label: "100-500" },
  { value: "500-1000", label: "500-1000" },
  { value: ">1000", label: ">1000" },
];

const EditCorporate = () => {
  let history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const corporatesById = useSelector((state) => state.corporates);
  console.log(corporatesById);
  //   const addingCorporate = useSelector(
  //     (state) => state.corporates.addingCorporate
  //   );

  const dispatch = useDispatch();
  const corporateRegister = (values) => {
    setSubmitted(true);
    if (values.organizationName && values.email && values.regdNumber) {
      dispatch(corporateActions.addCorporate(values));
    }
  };
  return (
    <>
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
              <h3>Edit Corporate</h3>
              <hr />
              <h6>Basic Information</h6>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Organization Name</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="organizationName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.organizationName && touched.organizationName
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="organizationName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Organization Email</label>
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
                  <label className="mt-1">Website</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="website"
                    type="text"
                    className={
                      "form-control" +
                      (errors.website && touched.website ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Regd Number</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="regdNumber"
                    type="text"
                    className={
                      "form-control" +
                      (errors.regdNumber && touched.regdNumber
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="regdNumber"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Size</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="organizationSize"
                    as="select"
                    className={
                      "form-select" +
                      (errors.organizationSize && touched.organizationSize
                        ? " is-invalid"
                        : "")
                    }
                  >
                    <option value="none">Select Corporate Size</option>
                    {sizeOptions.map((size, index) => (
                      <option value={size.value} key={index}>
                        {size.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="organizationSize"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Type</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="organizationType"
                    type="text"
                    className={
                      "form-control" +
                      (errors.organizationType && touched.organizationType
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="organizationType"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">Corporate PAN</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="corporatePan"
                    type="text"
                    className={
                      "form-control" +
                      (errors.corporatePan && touched.corporatePan
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="corporatePan"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="mt-1">GSTN</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="gstn"
                    type="text"
                    className={
                      "form-control" +
                      (errors.gstn && touched.gstn ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="gstn"
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
                  <label className="mt-1">Contact Person</label>
                </div>
                <div className="col-md-8">
                  <Field
                    name="contactPerson"
                    type="text"
                    className={
                      "form-control" +
                      (errors.contactPerson && touched.contactPerson
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="contactPerson"
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
                  <Field
                    name="country"
                    type="text"
                    className={
                      "form-control" +
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
                      {/* <span className="spinner-border spinner-border-sm mr-1"></span> */}
                      Update
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

export default EditCorporate;
