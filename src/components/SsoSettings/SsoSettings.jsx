import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SsoSchema } from "./../Validations";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { corporateActions } from "./../../actions";
import { FileOutlined } from "@ant-design/icons";
const initialValues = {
  issueUrl: "",
  loginUrl: "",
  logoutUrl: "",
  securityCertificate: "",
  metaData: "",
  issuerID: "",
  acsUrl: "",
  corporateId: "",
  corporateName: "",
};
const SsoSettings = () => {
  let history = useHistory();
  const corporates = useSelector((state) => state.corporates);
  const selectedCorporate = useSelector(
    (state) => state?.selectedCorporate?.corporate
  );
  const addingCorporate = useSelector(
    (state) => state?.corporates?.addingCorporate
  );
  initialValues.corporateId = selectedCorporate.id;
  initialValues.corporateName = selectedCorporate.name;
  const dispatch = useDispatch();
  const samlRegister = (values) => {
    dispatch(corporateActions.samlConfigure(values));
  };
  return (
    <div className="customContainer">
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="d-flex justify-content-center">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={SsoSchema}
              onSubmit={(values, { resetForm }) => {
                samlRegister(values);
                resetForm({ values: "" });
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
                  <div className="row">
                    <h1 className="ant-typography customHeading text-center">
                      OIDC configuration
                    </h1>
                  </div>
                  <hr />
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <label className="mt-1">IDP Entity ID (Issue URL) </label>
                      <Field
                        name="issueUrl"
                        type="text"
                        className={
                          "form-control" +
                          (errors.issueUrl && touched.issueUrl
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="issueUrl"
                        component="div"
                        className="invalid-feedback"
                      />
                      <span>
                        Goodfirm Will Use This Identity User. You Can Get This
                        From Your OIDC.Identity Provider.
                      </span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <label className="mt-1">
                        OIDC Login URL(OIDC Endpoint)
                      </label>
                      <Field
                        name="loginUrl"
                        type="text"
                        className={
                          "form-control" +
                          (errors.loginUrl && touched.loginUrl
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="loginUrl"
                        component="div"
                        className="invalid-feedback"
                      />
                      <span>
                        Goodfirm Will Redirect User To This URL Login. You Can
                        Get This From Your OIDC Identity Provider.
                      </span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <label className="mt-1">Logout URL(SLO Endpoint) </label>
                      <Field
                        name="logoutUrl"
                        type="text"
                        className={
                          "form-control" +
                          (errors.logoutUrl && touched.logoutUrl
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="logoutUrl"
                        component="div"
                        className="invalid-feedback"
                      />
                      <span>
                        Logout Url To Which User Will Be Sent To When The Log
                        Out From GoodFirm.
                      </span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <label className="mt-1">Security Certificate</label>
                      <Field
                        name="securityCertificate"
                        type="text"
                        className={
                          "form-control" +
                          (errors.securityCertificate &&
                          touched.securityCertificate
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="securityCertificate"
                        component="div"
                        className="invalid-feedback"
                      />
                      <span>
                        The OIDC Certificate Provider By Your OIDC Provider.This
                        Will Be Used For Encryption And
                        <br />
                        <strong>
                          OIDC Configuration For Your Identity Provider (IDP)
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label className="mt-1">Metadata URL</label>
                    <div className="col-md-10">
                      <Field
                        name="metaData"
                        type="text"
                        placeholder="https://goodfirm.com/sso/metadata"
                        className={
                          "form-control" +
                          (errors.metaData && touched.metaData
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="metadata"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-primary">
                        <FileOutlined className="fs-5 me-1" />
                        <span className="fw-normal">Copy</span>
                      </button>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label className="mt-1">
                      Issuer/Service Provider Issuer ID
                    </label>
                    <div className="col-md-10">
                      <Field
                        name="issuerID"
                        type="text"
                        placeholder="https://goodfirm.com/sso/metadata"
                        className={
                          "form-control" +
                          (errors.issuerID && touched.issuerID
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="issuerID"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-primary">
                        <FileOutlined className="fs-5 me-1" />
                        Copy
                      </button>
                    </div>
                  </div>
                  {/* <div className="row mb-4">
                    <label className="mt-1">
                      Service Provider Assertion Consumer Services Url(ACS_URl)
                    </label>
                    <div className="col-md-10">
                      <Field
                        name="acsUrl"
                        type="text"
                        placeholder="https://goodfirm.com/sso/metadata"
                        className={
                          "form-control" +
                          (errors.acsUrl && touched.acsUrl ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="acsUrl"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-primary">
                        <FileOutlined className="fs-5 me-1" />
                        Copy
                      </button>
                    </div>
                  </div> */}
                  <div className="row my-5">
                    <div className="col-md-12 d-flex  justify-content-center ">
                      <button
                        type="button"
                        class="btn btn-light btn-outline-secondary me-3 "
                      >
                        Cancel
                      </button>
                      <button type="submit" class="btn btn-primary">
                        {/* <span className="spinner-border spinner-border-sm mr-1"></span> */}
                        Save and Verify
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SsoSettings;
