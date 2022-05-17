import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../actions";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
import Loader from "./../Shared/Loader";
import { alertActions } from "./../../actions";
import Pagination from "./../Shared/Pagination";
import { paginationConstants } from "../../constants";
const actionInitialValues = {
  userId: "",
  requestType: "",
};
let goodplatformFields = [
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Employee ID", value: "employeeId" },
  { label: "Gender", value: "gender" },
  { label: "PAN", value: "pan" },
  { label: "Joining Date", value: "joiningDate" },
  { label: "Country", value: "country" },
  { label: "Status", value: "status" },
];
let pageSize = paginationConstants?.PAGE_SIZE;
const ListEmployees = (props) => {
  const corporateId = props?.match?.params?.corporateId;
  const employees = useSelector((state) => state.employee);
  const hiddenFileInput = useRef(null);
  // const user = useSelector((state) => state.employee.user);
  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const [isImportNextStep, setIsImportNextStep] = useState(false);
  const [formatBulkData, setFormatBulkData] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionType, setActionType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(Object);
  const [importHeader, setImportHeader] = useState();
  const [importFirstRecord, setImportFirstRecord] = useState([]);
  const [selectedFieldTypes, setSelectedFieldTypes] = useState([]);
  const [finalData, setFinalData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      employeeActions.getEmployees({
        corporateId: corporateId,
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
      })
    );
  }, [currentPage]);
  const setPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setTotalCount(employees?.totalCount);
  }, [employees?.totalCount]);
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedEmployee(item);
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${item.name}"</strong>?`
    );
  };
  const confirm = () => {
    handleClose();
    actionInitialValues.userId = selectedEmployee.id;
    actionInitialValues.requestType = actionType;
    dispatch(employeeActions.employeeAccountRequest(actionInitialValues));
  };
  const handleClose = () => setOpen(false);
  const chooseFile = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  const handleFile = (file) => {
    const fileExtension = file?.name?.split(".")?.pop();
    if (
      fileExtension !== "csv" &&
      fileExtension !== "xlsx" &&
      fileExtension !== "xls"
    ) {
      dispatch(alertActions.error("Only csv or excel file format allowed."));
    } else {
      const reader = new FileReader();
      reader.readAsText(file);
      let finalData = [];
      reader.onload = () => {
        const allTextLines = reader?.result?.split(/\n/);
        setImportHeader(allTextLines[0].split(","));
        setImportFirstRecord(allTextLines[1].split(","));
        let fieldType = [];
        for (let i = 0; i < allTextLines[0].split(",")?.length; i++) {
          if (goodplatformFields[i]) {
            fieldType.push(goodplatformFields[i].value);
            // setSelectedFieldTypes(...selectedFieldTypes, goodplatformFields[i].value)
          } else {
            fieldType.push("select_field");
            // setSelectedFieldTypes(...selectedFieldTypes, {"select_field":"select_field"})
            goodplatformFields = [
              ...goodplatformFields,
              { label: "Select Field", value: "select_field" },
            ];
          }
        }
        setSelectedFieldTypes(fieldType);
        for (let i = 1; i < allTextLines.length; i++) {
          const data = allTextLines[i].split(",");
          if (data.length === allTextLines[0].split(",")?.length) {
            const tarr = [];
            for (let j = 0; j < allTextLines[0].split(",")?.length; j++) {
              tarr.push(data[j]);
            }
            finalData.push(tarr);
          }
        }

        setFinalData(finalData);
        // this.uploadedRecords = this.csvData.length;
        // this.csvPaginator.currentPage = 1;
        // this.csvPaginator.totalItems = this.uploadedRecords;
        // this.csvPaginator = this.baseService.calculatePaginator(this.csvPaginator);
      };
      setIsBulkUpload(true);
    }
  };
  const addSelectedField = (event, index) => {
    selectedFieldTypes[index] = event;
    setSelectedFieldTypes(selectedFieldTypes);
  };
  const confimUpload = () => {
    console.log(
      "setSelectedFieldTypes confirm >>>>>>>>>>>>>>>>>>",
      selectedFieldTypes
    );
  };
  const goNext = () => {
    setIsImportNextStep(true);
    setIsBulkUpload(false);
  };
  return (
    <div className="customContainer">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">
            <Link to="/corporates" className="text-decoration-underline">
              Corporates
            </Link>{" "}
            / Employees
          </h1>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          {!isBulkUpload && !isImportNextStep && (
            <>
              <button
                type="button"
                className="btn btn-custom"
                onClick={chooseFile}
              >
                <i className="bi bi-file-earmark-arrow-up mr-2"></i>
                Import Bulk Employee
              </button>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </>
          )}
          {/* <button
            type="button"
            className="btn"
            onClick={() => history.push("/employees/add")}
          >
            Add Employee
          </button> */}
        </div>
      </div>
      {!isBulkUpload && !isImportNextStep && (
        <>
          <div className="ant-row searchContainer mt-3 py-4 px-4 align-center">
            <div className="ant-col ant-col-24  searchContainer">
              <div className="ant-col ant-col-8">
                <div className="ant-input-affix-wrapper inputFilterInput">
                  <span className="ant-input-prefix">
                    <i className="bi bi-search"></i>
                    <input
                      placeholder="Search by Name"
                      className="ant-input-search"
                      type="text"
                      value=""
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {employees.actionRequest && <Loader />}
          <div className="ant-row">
            <div className="ant-col ant-col-24 mt-2">
              <div className="ant-table-wrapper">
                <div className="ant-table">
                  <table>
                    <thead className="ant-table-thead">
                      <tr>
                        <th className="ant-table-cell">Sr No.</th>
                        <th className="ant-table-cell">Name</th>
                        <th className="ant-table-cell">Email</th>
                        <th className="ant-table-cell">Phone</th>
                        <th className="ant-table-cell">Status</th>
                        <th className="ant-table-cell">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {employees?.items?.length > 0 ? (
                        employees?.items.map((employee, index) => (
                          <tr
                            key={index + 1}
                            className="ant-table-row ant-table-row-level-0"
                          >
                            <td className="ant-table-cell">
                              {currentPage >= 2
                                ? currentPage * pageSize - pageSize + index + 1
                                : index + 1}
                            </td>
                            <td className="ant-table-cell">
                              <span className="ant-typography font-weight-bold">
                                {employee?.name}
                              </span>
                            </td>
                            <td className="ant-table-cell">
                              {employee?.email}
                            </td>
                            <td className="ant-table-cell">
                              {employee?.contact_number}
                              {/* {employee.address
                    .split(",")
                    .reduce((all, cur) => [...all, <br />, cur])} */}
                            </td>
                            <td className="ant-table-cell text-uppercase">
                              {employee?.isApprove && (
                                <span className="text-success">Approved</span>
                              )}

                              {employee?.isApprove === null && (
                                <span className="text-warning">Pending</span>
                              )}

                              {!employee?.isApprove &&
                                employee?.isApprove !== null && (
                                  <span className="text-danger">Rejected</span>
                                )}
                            </td>
                            <td className="ant-table-cell">
                              <a
                                className="icon"
                                href="#"
                                data-bs-toggle="dropdown"
                              >
                                <span className="bi-three-dots"></span>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow actions">
                                {!employee?.isApprove ? (
                                  <li
                                    className="dropdown-header text-start"
                                    onClick={() =>
                                      handleOpen("Approve", employee)
                                    }
                                  >
                                    <span className="bi-check-circle">
                                      {" "}
                                      Approve
                                    </span>
                                  </li>
                                ) : null}
                                {employee?.isApprove ||
                                employee?.isApprove === null ? (
                                  <li
                                    className="dropdown-header text-start"
                                    onClick={() =>
                                      handleOpen("Reject", employee)
                                    }
                                  >
                                    <span className="bi-x-circle"> Reject</span>
                                  </li>
                                ) : null}
                              </ul>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No employees found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            className="pagination-bar mt-4"
            currentPage={currentPage}
            totalCount={totalCount ? totalCount : 0}
            pageSize={pageSize}
            onPageChange={(page) => setPage(page)}
          />
          {open && (
            <ConfirmationDialog
              open={true}
              title={actionTitle}
              content={actionContent}
              handleConfirm={() => {
                confirm();
              }}
              handleCancel={() => {
                handleClose();
              }}
            />
          )}
        </>
      )}
      {isBulkUpload && (
        <div className="mt-4">
          <div className="row mt-4">
            <div className="col-md-6">
              <h5>Map columns with fields</h5>
            </div>
            <div className="col-md-6 text-right">
              <Link onClick={() => isBulkUpload(false)} className="mr-3">
                Cancel
              </Link>
              <button
                type="button"
                className="btn btn-custom btn-sm"
                onClick={goNext}
              >
                Next
              </button>
            </div>
          </div>
          <table className="table preview_csv_table mt-4">
            <thead>
              <tr>
                <th>FILE COLUMNS</th>
                <th>GOOD PLATFORM FIELDS</th>
              </tr>
            </thead>
            <tbody className="scrollbar scrollbar-black bordered-black thin square">
              {importHeader?.map((header, index) => (
                <tr>
                  <td className="ellipsis-div">
                    <strong>{header.replace("_", " ")}</strong>
                    <div>{importFirstRecord[index]}</div>
                  </td>
                  <td>
                    <select
                      className="form-control col-md-6"
                      onChange={(event) =>
                        addSelectedField(event.target.value, index)
                      }
                      value={selectedFieldTypes[index]}
                    >
                      {goodplatformFields.map((field, ind) => (
                        <option value={field.value} key={ind + 1}>
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isImportNextStep && (
        <div className="mt-4">
          <div className="row mt-4">
            <div className="col-md-6">
              <h5>Customized Fields</h5>
            </div>
            <div className="col-md-6 text-right">
              <Link onClick={() => isBulkUpload(false)} className="mr-3">
                Cancel
              </Link>
              <button
                type="button"
                className="btn btn-custom btn-sm"
                onClick={confimUpload}
              >
                Confirm
              </button>
            </div>
          </div>
          <table className="table preview_csv_table mt-4">
            <thead>
              <tr>
                {selectedFieldTypes?.map((header, index) => (
                  <td className="ellipsis-div">
                    <strong>{header.replace("_", " ")}</strong>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="scrollbar scrollbar-black bordered-black thin square">
              {finalData?.map((data, index) => (
                <tr key={index + 1}>
                  {data?.map((item, i) => (
                    <td className="ellipsis-div">
                      <div>{item}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ListEmployees;
