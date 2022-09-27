import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { addProgramSchema } from "../Validations";
import { DateRangePicker } from "rsuite";
import * as moment from "moment";

const initialValues = {
  programName: "",
  description: ""
};

const AddProgramme = () => {
  const [page, setPage] = useState(0);
  const [programPage, setProgramPage] = useState(0);
  const pageName = [
    "Impact Category",
    "Impact Priroties",
    "Strategic Goals",
    "Project Name"
  ];
  const programPageName = [
    "Basics",
    "Team",
    "Donor",
    "Organizational Approval"
  ];
  const [selectPrimary, setSelectPrimary] = useState("");
  const [projectName, setProjectName] = useState("");
  const [name, setName] = useState("");
  const [selectedRange, setSelectedRange] = useState([]);

  const [value, setValue] = useState([
    new Date(moment().add(-30, "days").format("YYYY-MM-DD")),
    new Date(moment().format("YYYY-MM-DD"))
  ]);
  const { afterToday } = DateRangePicker;
  const categories = [
    { name: "Agriculture", value: "Agriculture" },
    { name: "Education", value: "Education" },
    { name: "Health", value: "Health" }
    // { name: "Air", value: "Air" },
    // {
    //   name: "Biodiversity and Ecosystems",
    //   value: "Biodiversity and Ecosystems",
    // },
    // { name: "Climate", value: "Climate" },
    // { name: "Diversity and Inclusion", value: "Diversity and Inclusion" },
    // { name: "Employment", value: "Employment" },
    // { name: "Financial Services", value: "Financial Services" },
    // { name: "Infrastructure", value: "Infrastructure" },
    // { name: "Land", value: "Land" },
    // { name: "Oceans & Coastal Zones", value: "Oceans & Coastal Zones" },
    // { name: "Pollution", value: "Pollution" },
    // { name: "RealEstate", value: "RealEstate" },
    // { name: "Waste Management", value: "Waste Management" },
    // { name: "Water Management", value: "Water Management" },
  ];

  const agriculture = ["Food Security"];
  const education = ["Access to Quality Education"];
  const health = ["Access to Quality Health Care"];

  const handlePrimaryChange = (e) => {
    console.log(e);
    const value = e.value;
    console.log(value);
    setSelectPrimary(value);
  };

  console.log(selectPrimary);

  const handleProgrammeChange = (e) => {
    setName(e.target.value);
  };
  const createProgram = () => {
    console.log("submit");
    setProjectName(name);
  };

  const fetchData = (ranges) => {
    setSelectedRange(ranges);
    // fetchResults(ranges);
  };

  return (
    <>
      {!projectName ? (
        <div className="add-programme">
          <div className=" d-flex justify-content-between">
            <div>
              <h4 className="text-success">STEP {page + 1} OF 4</h4>
              <h5> {pageName[page]}</h5>
            </div>
            {(page === 0 || page === 1) && (
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Primary</h6>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => handlePrimaryChange(e)}
                  >
                    <option defaultValue={"Select Category"}>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <>
                        <option value={category.value}>{category.name}</option>
                      </>
                    ))}
                  </select>
                </div>
                {/* <hr /> */}
                <div>
                  <h6 className="text-center">Secondary</h6>
                  <div className="d-flex">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select Category</option>
                      {categories.map((category) => (
                        <>
                          <option value={category.value}>
                            {category.name}
                          </option>
                        </>
                      ))}
                    </select>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select Category</option>
                      {categories.map((category) => (
                        <>
                          <option value={category.value}>
                            {category.name}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ------------------Accordion Start ----------------------------------*/}
          {page === 1 && (
            <>
              <div className="mt-5">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Agriculture
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div class="accordion-body">
                        {agriculture.map((item) => (
                          <div className="d-flex">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="Education"
                                // checked=
                                // onChange={(e) => handleCheck(e, charityProgram)}
                              />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Education
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingTwo"
                    >
                      <div class="accordion-body">
                        {education.map((item) => (
                          <div className="d-flex">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="Education"
                                // checked=
                                // onChange={(e) => handleCheck(e, charityProgram)}
                              />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2
                      class="accordion-header"
                      id="panelsStayOpen-headingThree"
                    >
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        Health
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingThree"
                    >
                      <div class="accordion-body">
                        {health.map((item) => (
                          <div className="d-flex">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="Education"
                                // checked=
                                // onChange={(e) => handleCheck(e, charityProgram)}
                              />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <div className="mt-5">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Select Goals For Food Security
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div class="accordion-body">
                        {agriculture.map((item) => (
                          <div className="d-flex">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="Education"
                                // checked=
                                // onChange={(e) => handleCheck(e, charityProgram)}
                              />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Select Goals For Access To Quality Education
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingTwo"
                    >
                      <div class="accordion-body">
                        {education.map((item) => (
                          <div className="d-flex">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="Education"
                                // checked=
                                // onChange={(e) => handleCheck(e, charityProgram)}
                              />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2
                      class="accordion-header"
                      id="panelsStayOpen-headingThree"
                    >
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        Select Goals For Nutrition
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingThree"
                    >
                      <div class="accordion-body">
                        {health.map((item) => (
                          <div className="d-flex">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="Education"
                                // checked=
                                // onChange={(e) => handleCheck(e, charityProgram)}
                              />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {page === 3 && (
            <div className="mt-5">
              <input
                type="text"
                placeholder="Programme Name"
                onChange={(e) => handleProgrammeChange(e)}
                className="w-75 me-2"
              />
              {/* <button
                className="btn btn-secondary"
                onClick={(e) => createProgram(e)}
              >
                Create Program
              </button> */}
            </div>
          )}

          <div
            className={
              "mt-5 text-end " + ((page === 0 || page === 3) && "floatingBtn")
            }
          >
            <button
              className="btn btn-secondary me-2"
              onClick={() => setPage((curPage) => curPage - 1)}
              disabled={page === 0}
            >
              Prev
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (page === pageName.length - 1) {
                  createProgram();
                } else {
                  setPage((curPage) => curPage + 1);
                }
              }}
              // disabled={page === pageName.length - 1}
            >
              {page === pageName.length - 1 ? (
                "Create Program"
              ) : (
                <>Next : {pageName[page]}</>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <h4 className="mb-4">{programPageName[programPage]}</h4>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={addProgramSchema}
            onSubmit={(values, event) => {
              console.log(values);
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
              /* and other goodies */
            }) => (
              <Form>
                <div className="form-group mt-1">
                  <label htmlFor="programName" className="has-float-label">
                    <Field
                      name="programName"
                      value={projectName}
                      id="programName"
                      type="programName"
                      placeholder=" "
                      className={"form-control"}
                    />
                    <span>Program Name</span>
                  </label>
                  <ErrorMessage
                    name="programName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="description" className="has-float-label">
                    <Field
                      name="description"
                      id="description"
                      type="description"
                      placeholder=" "
                      className={"form-control"}
                    />
                    <span>Description</span>
                  </label>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="col-md-4 text-center">
                  <DateRangePicker
                    appearance="default"
                    value={value}
                    onChange={setValue}
                    onOk={(value) => fetchData(value)}
                    placeholder={`${moment()
                      .add(-30, "days")
                      .format("DD/MM/YYYY")} - ${moment().format(
                      "DD/MM/YYYY"
                    )}`}
                    format={"dd/MM/yyyy"}
                    cleanable={true}
                    disabledDate={afterToday()}
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="beneficiary" className="has-float-label">
                    <Field
                      name="beneficiary"
                      id="beneficiary"
                      type="beneficiary"
                      placeholder=" "
                      className={"form-control"}
                    />
                    <span>Beneficiary Type</span>
                  </label>
                  <ErrorMessage
                    name="beneficiary"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div
                  className={
                    "mt-5 text-end " +
                    ((page === 0 || page === 3) && "floatingBtn")
                  }
                >
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => setProgramPage((curPage) => curPage - 1)}
                    disabled={programPage === 0}
                  >
                    Prev
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      if (programPage === programPageName.length - 1) {
                        createProgram();
                      } else {
                        setProgramPage((curPage) => curPage + 1);
                      }
                    }}
                    // disabled={page === pageName.length - 1}
                  >
                    {programPage === programPageName.length - 1 ? (
                      "Submit"
                    ) : (
                      <>Next : {programPageName[programPage]}</>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default AddProgramme;
