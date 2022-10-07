import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { configUnitPriceSchema } from "../Validations";
import { selectedCharityActions } from "../../actions";

const ConfigureAmount = ({ openConfig, closeConfig }) => {
  const dispatch = useDispatch();
  const [selectedAmount, setSelectedAmount] = useState();
  const selectedOrganization = useSelector(
    (state) => state.selectedOrganization?.organization
  );
  const fetchedPrice = useSelector(
    (state) => state?.selectedCharity?.fetchedPrice
  );
  const configInitialValues = {
    price1: fetchedPrice?.unit_price_box1 || "",
    price2: fetchedPrice?.unit_price_box2 || "",
    price3: fetchedPrice?.unit_price_box3 || "",
    price4: fetchedPrice?.unit_price_box4 || "",
    charityId: selectedOrganization?.id,
    charityName: selectedOrganization?.name
  };
  const charityPrograms = useSelector((state) => state.charityPrograms);
  const saveProgramPrice = (values) => {
    values.price1 = Number(values.price1);
    values.price2 = Number(values.price2);
    values.price3 = Number(values.price3);
    values.price4 = Number(values.price4);
    dispatch(selectedCharityActions.saveProgramPrice(values));
    closeConfig(true);
  };
  const handleCloseConfig = () => closeConfig(true);
  return (
    <Modal
      show={openConfig}
      onHide={handleCloseConfig}
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Configure the prices for "{selectedOrganization?.name}"
        </Modal.Title>
      </Modal.Header>
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
            <Modal.Body style={{ fontSize: "18" }}>
              <>
                <div className="row m-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="price1" className="has-float-label">
                        <Field
                          name="price1"
                          id="price1"
                          type="text"
                          placeholder=" "
                          className={
                            "form-control" +
                            (errors.price1 && touched.price1
                              ? " is-invalid"
                              : "")
                          }
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength={10}
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
                            "form-control" +
                            (errors.price2 && touched.price2
                              ? " is-invalid"
                              : "")
                          }
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength={10}
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
                <div className="row m-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="price3" className="has-float-label">
                        <Field
                          name="price3"
                          id="price3"
                          type="text"
                          placeholder=" "
                          className={
                            "form-control" +
                            (errors.price3 && touched.price3
                              ? " is-invalid"
                              : "")
                          }
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength={10}
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
                            "form-control" +
                            (errors.price4 && touched.price4
                              ? " is-invalid"
                              : "")
                          }
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength={10}
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-custom"
                type="submit"
                disabled={charityPrograms?.saveProgramPrice}
              >
                Save
              </Button>
              <Button variant="danger" onClick={handleCloseConfig}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default ConfigureAmount;
