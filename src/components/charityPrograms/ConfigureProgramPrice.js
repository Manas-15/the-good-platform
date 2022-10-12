import React, { useEffect, useRef } from "react";
import "./../../assets/css/charityProgramsList.scss";
import { viewPortalConstants } from "../../constants";
import { selectedCharityActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { configUnitPriceSchema } from "../Validations";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ConfigureProgramPrice = () => {
  const dispatch = useDispatch();
  const listInnerRef = useRef();
  const selectedCharity = useSelector(
    (state) => state.selectedCharity?.charity
  );
  const selectedOrganization = useSelector(
    (state) => state.selectedOrganization
  );
  const fetchedPrice = useSelector(
    (state) => state?.selectedCharity?.fetchedPrice
  );
  const tabType = useSelector((state) => state.selectedCharityTab.tab);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const charityPrograms = useSelector((state) => state.charityPrograms);
  const urlParameter = window.location.pathname.split("/");
  const configInitialValues = {
    price1: fetchedPrice?.unit_price_box1 || "",
    price2: fetchedPrice?.unit_price_box2 || "",
    price3: fetchedPrice?.unit_price_box3 || "",
    price4: fetchedPrice?.unit_price_box4 || "",
    charityId: selectedCharity?.id,
    charityName: selectedCharity?.charityName
  };
  const saveProgramPrice = (values) => {
    values.price1 = Number(values.price1);
    values.price2 = Number(values.price2);
    values.price3 = Number(values.price3);
    values.price4 = Number(values.price4);
    dispatch(selectedCharityActions.saveProgramPrice(values));
  };
  useEffect(() => {
    dispatch(
      selectedCharityActions.fetchProgramPrice({
        programId: selectedCharity?.id
      })
    );
  }, [selectedCharity]);
  return (
    <Formik
      enableReinitialize
      initialValues={configInitialValues}
      validationSchema={configUnitPriceSchema}
      onSubmit={(values) => {
        saveProgramPrice(values);
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
      }) => (
        <Form>
          <>
            <div className="row m-4">
              <div className="col-md-12">
                <h4>
                  Configure program price for - {selectedCharity?.charityName}
                </h4>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="price1" className="has-float-label">
                    <Field
                      name="price1"
                      id="price1"
                      type="text"
                      placeholder=" "
                      className={
                        "form-control w-75" +
                        (errors.price1 && touched.price1 ? " is-invalid" : "")
                      }
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxLength={6}
                    />
                    <span>Amount</span>
                  </label>
                  <ErrorMessage
                    name="price1"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="price2" className="has-float-label">
                    <Field
                      name="price2"
                      id="price2"
                      type="text"
                      placeholder=" "
                      className={
                        "form-control w-75" +
                        (errors.price2 && touched.price2 ? " is-invalid" : "")
                      }
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxLength={6}
                    />
                    <span>Amount</span>
                  </label>
                  <ErrorMessage
                    name="price2"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="price3" className="has-float-label">
                    <Field
                      name="price3"
                      id="price3"
                      type="text"
                      placeholder=" "
                      className={
                        "form-control w-75" +
                        (errors.price3 && touched.price3 ? " is-invalid" : "")
                      }
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxLength={6}
                    />
                    <span>Amount</span>
                  </label>
                  <ErrorMessage
                    name="price3"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="price4" className="has-float-label">
                    <Field
                      name="price4"
                      id="price4"
                      type="text"
                      placeholder=" "
                      className={
                        "form-control w-75" +
                        (errors.price4 && touched.price4 ? " is-invalid" : "")
                      }
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxLength={6}
                    />
                    <span>Amount</span>
                  </label>
                  <ErrorMessage
                    name="price4"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
          </>
          <div className="row">
            <div className="col-md-12 text-center">
              <Button
                className="btn btn-custom mr-3"
                type="submit"
                disabled={charityPrograms?.saveProgramPrice}
              >
                Save
              </Button>
              <Link
                to={{
                  pathname: `/social-organizations/${selectedCharity?.organisationId}`
                }}
              >
                <Button variant="danger">Cancel</Button>
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default ConfigureProgramPrice;
