import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { CorporateSchema } from "./../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { corporateActions } from "./../../actions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

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
const CorporateForm = ({ type, id }) => {
  // console.log(type, id, "mmmmmmmmm");
  let history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [editCorpData, setEditCorpData] = useState();
  const corporates = useSelector((state) => state.corporates);
  console.log(corporates);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editState, setEditState] = useState("");

  const addingCorporate = useSelector(
    (state) => state?.corporates?.addingCorporate
  );

  initialValues.userType = 2;

  const dispatch = useDispatch();

  const corporateRegister = (values) => {
    values.state = id ? editState : state;
    values.country = id ? editCountry : country;

    console.log(country, state); // passed
    console.log(editCountry, editState);
    console.log(values.country, values.state); // passed

    console.log(values);
    setSubmitted(true);
    if (
      values.organizationName &&
      values.email &&
      values.regdNumber &&
      values.country &&
      values.state
    ) {
      id
        ? dispatch(corporateActions.updateCorporate(values, type))
        : // console.log(values, "edit apiiiiiiiiiii")
          dispatch(corporateActions.addCorporate(values, type));
    }
  };

  const filteredCorporateData = (id) => {
    const filteredCorpData = corporates?.items?.filter((val) => {
      return val.corporateId === id;
    });
    // console.log(filteredCorpData[0]);
    setEditCorpData(filteredCorpData?.[0]);
  };

  useEffect(() => {
    if (id) {
      filteredCorporateData(id);
    }
  }, []);

  if (id) {
    // console.log(id, "iddddddddddddddd");
    initialValues.corporateId = id;
    initialValues.organizationName = editCorpData?.organizationName;
    initialValues.email = editCorpData?.email;
    initialValues.website = editCorpData?.website;
    initialValues.regdNumber = editCorpData?.regdNumber;
    initialValues.organizationSize = editCorpData?.organizationSize;
    initialValues.organizationType = editCorpData?.organizationType;
    initialValues.corporatePan = editCorpData?.corporatePan;
    initialValues.gstn = editCorpData?.gstn;
    initialValues.contactNumber = editCorpData?.contactNumber;
    initialValues.contactPerson = editCorpData?.contactPerson;
    initialValues.address = editCorpData?.address;
    initialValues.city = editCorpData?.city;
  } else {
    initialValues.organizationName = "";
    initialValues.email = "";
    initialValues.website = "";
    initialValues.regdNumber = "";
    initialValues.organizationSize = "";
    initialValues.organizationType = "";
    initialValues.corporatePan = "";
    initialValues.gstn = "";
    initialValues.contactNumber = "";
    initialValues.contactPerson = "";
    initialValues.address = "";
    initialValues.city = "";
    initialValues.state = "";
    initialValues.country = "";
    initialValues.city = "";
  }
  useEffect(
    (id) => {
      setEditState(editCorpData?.state);
      setEditCountry(editCorpData?.country);
    },
    [editCorpData?.state, editCorpData?.country]
  );

  const selectCountry = (country) => {
    console.log(country);
    setCountry(country);
  };

  const selectEditCountry = (country) => {
    console.log(country);
    setEditCountry(country);
  };

  const selectState = (state) => {
    console.log(state);
    setState(state);
  };
  const selectEditState = (state) => {
    console.log(state);
    setEditState(state);
  };

  return (
    <div style={{ width: "650px" }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={CorporateSchema}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values);
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
            <h3>
              {id
                ? "Edit Corporate"
                : type === "admin"
                ? "Add Corporate"
                : "Corporate Register"}
            </h3>
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
                  disabled={id}
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
                  style={{ textTransform: "uppercase" }}
                  maxLength={10}
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
                <RegionDropdown
                  name="state"
                  country={id ? editCountry : country}
                  // value={
                  //   id ? console.log("editSantosh") : console.log("santosh")
                  // }
                  value={id ? editState : state}
                  onChange={(val) =>
                    id ? selectEditState(val) : selectState(val)
                  }
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
                  value={id ? editCountry : country}
                  onChange={(val) =>
                    id ? selectEditCountry(val) : selectCountry(val)
                  }
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
                    disabled={addingCorporate}
                  >
                    {addingCorporate && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    {id ? "Update" : type === "admin" ? "Add" : "Register"}
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
