import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { transactionsHistoryActions } from "../../actions";
import Loader from "../Shared/Loader";
import { Mail80GSchema } from "./../Validations";
import * as moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  paymentConstants,
  paginationConstants,
  viewPortalConstants,
} from "../../constants";
import Pagination from "./../Shared/Pagination";
import { Tooltip } from "antd";
import { DateRangePicker } from 'rsuite';
import 'rsuite/styles/index.less';

let charityProgramsOption = [];
const paymentStatusOption = [
  { label: "All", value: 0 },
  { label: "Success", value: paymentConstants.PAYMENT_SUCCESS },
  { label: "Failed", value: paymentConstants.PAYMENT_FAILURE },
];
let pageSize = paginationConstants?.PAGE_SIZE;
const initialValues = {
  email: "",
  transactionId: "",
};
const ListTransactionsHistory = (props) => {
  const [records, setRecords] = useState([]);
  const transactions = useSelector((state) => state.transactionsHistory);
  const charityPrograms = useSelector((state) => state.charityPrograms);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const employeeId = props?.match?.params?.employeeId;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [searchByEmployeeName, setSearchByEmployeeName] = useState("");
  const [searchByProgramName, setSearchByProgramName] = useState("");
  const [searchByAmount, setSearchByAmount] = useState("");
  const [val, setVal] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDateRangeFilter, setIsDateRangeFilter] = useState(false);

  const isOrganizationView =
    currentPortal?.currentView ===
    viewPortalConstants.SOCIAL_ORGANIZATION_PORTAL;
  const isEmployeePortal =
    currentPortal?.currentView === viewPortalConstants.EMPLOYEE_PORTAL;
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const isBluePencilView =
    currentPortal?.currentView ===
    viewPortalConstants.BLUE_PENCEIL_ADMIN_PORTAL;
  useEffect(() => {
    setCurrentPage(1);
    charityPrograms?.items?.sponser?.forEach((e) => {
      charityProgramsOption.push({ label: e.soicalName, value: e.soicalId });
    });
    charityPrograms?.items?.other?.forEach((e) => {
      charityProgramsOption.push({ label: e.soicalName, value: e.soicalId });
    });
  }, [props, charityPrograms?.items?.sponser, charityPrograms?.items?.other]);
  useEffect(() => {
    if (!isFilter) {
      dispatch(
        transactionsHistoryActions.getTransactionsHistory({
          employeeId: employeeId ? employeeId : null,
          corporateId: isCorporatePortal ? selectedCorporate?.corporate?.corporateId : null,
          pageSize: pageSize,
          offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
        })
      );
    }
  }, [currentPage]);
  useEffect(() => {
    setRecords(transactions?.items);
  }, [transactions?.items]);
  useEffect(() => {
    setTotalCount(transactions?.totalCount);
  }, [transactions?.totalCount]);
  const filter = (type, value) => {
    setIsFilter(true);
    if (value && value !== "0") {
      setRecords(
        transactions?.items?.filter(
          (record) => record?.paymentStatus?.toString() === value
        )
      );
    } else {
      setRecords(transactions?.items);
    }
  };
  const downlad = (transactionId) => {
    dispatch(
      transactionsHistoryActions.download80G({
        transactionId: transactionId,
      })
    );
  };
  const setPage = (page) => {
    setCurrentPage(page);
  };
  const confirm = (values) => {
    handleClose();

    dispatch(transactionsHistoryActions.send80GEmail(values));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const setEmailSend = (transactionId) => {
    setOpen(true);
    initialValues.email = isCorporatePortal
      ? selectedCorporate?.corporate?.email
      : employee?.user?.email;
    initialValues.transactionId = transactionId;
  };
  const search = (value, type) => {
    // if (value.length > 3) {
    console.log("----------- search inside", value, type);
    if (type === "employeeName") {
      setSearchByEmployeeName(value);
    } else if (type === "programName") {
      setSearchByProgramName(value);
    } else if (type === "amount") {
      setSearchByAmount(value);
    }

    // }
  };
  const fetchResults = () => {
    dispatch(
      transactionsHistoryActions.getTransactionsHistory({
        employeeId: employeeId ? employeeId : null,
        corporateId: isCorporatePortal
          ? selectedCorporate?.corporate?.corporateId
          : null,
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
        searchByEmployeeName: searchByEmployeeName,
        searchByProgramName: searchByProgramName,
        searchByAmount: searchByAmount,
      })
    );
  };
  useEffect(() => {
    fetchResults();
  }, [searchByProgramName]);
  useEffect(() => {
    fetchResults();
  }, [searchByEmployeeName]);
  useEffect(() => {
    fetchResults();
  }, [searchByAmount]);
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const handleSelect = (ranges) => {
    console.log(ranges);
    // setIsDateRangeFilter(false);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };
  return (
    <div className="customContainer">
      <div className="row mt-3">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">Account Summary</h1>
        </div>
        <div className="col-md-6 text-right">
          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="mt-2">Filter By</h6>
            </div>
            {/* <div className="col-md-4">
              <select className="form-select" aria-label="Select Duration">
                <option selected>Organization</option>
                {charityProgramsOption.map((duration, index) => (
                  <option value={duration.value} key={index}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="col-md-6">
              <select
                className="form-select"
                defaultValue={""}
                onChange={(e) => filter("status", e.target.value)}
              >
                <option value={""} key={"default"} disabled>
                  Payment Status
                </option>
                {paymentStatusOption.map((status, index) => (
                  <option value={status.value} key={index}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-right">
          {/* <button
            className="btn btn-sm btn-custom"
            onClick={() => setIsDateRangeFilter(true)}
          >
            Date range
          </button> */}
          {/* {isDateRangeFilter && ( */}
            <DateRangePicker
            appearance="default"
            />
          {/* )} */}
        </div>
      </div>
      <div className="ant-row searchContainer mt-3 py-4 px-4 align-center">
        <div className="ant-col-6 searchContainer">
          <div className="ant-input-affix-wrapper inputFilterInput">
            <span className="ant-input-prefix">
              <i className="bi bi-search"></i>
              <input
                placeholder="Search by Program Name"
                className="ant-input-search"
                type="text"
                onChange={(e) => search(e.target.value, "programName")}
              />
            </span>
          </div>
        </div>
        <div className="ant-col-6  searchContainer ml-3">
          <div className="ant-input-affix-wrapper inputFilterInput">
            <span className="ant-input-prefix">
              <i className="bi bi-search"></i>
              <input
                placeholder="Search by Employee Name"
                className="ant-input-search"
                type="text"
                onChange={(e) => search(e.target.value, "employeeName")}
              />
            </span>
          </div>
        </div>
        <div className="ant-col-6  searchContainer ml-3">
          <div className="ant-input-affix-wrapper inputFilterInput">
            <span className="ant-input-prefix">
              <i className="bi bi-search"></i>
              <input
                placeholder="Search by Amount"
                className="ant-input-search"
                type="number"
                pattern="[0-9]*"
                maxLength={15}
                onChange={(e) => {
                  search(e.target.value, "amount");
                }}
              />
            </span>
          </div>
        </div>
      </div>
      {transactions.loading && <Loader />}
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">SR No.</th>
                    {isCorporatePortal && (
                      <th className="ant-table-cell">Employee Name</th>
                    )}
                    <th className="ant-table-cell">Program</th>
                    {!isOrganizationView && (
                      <th className="ant-table-cell">Organization</th>
                    )}
                    {!employeeId && !isCorporatePortal && (
                      <th className="ant-table-cell">Corporate</th>
                    )}
                    <th className="ant-table-cell">Transaction ID</th>
                    <th className="ant-table-cell">Donation</th>
                    {/* <th className="ant-table-cell">Donation Type</th> */}
                    <th className="ant-table-cell">Payment Mode</th>
                    <th className="ant-table-cell">Payment Status</th>
                    <th className="ant-table-cell">Payment Date</th>
                    {(employeeId || isCorporatePortal) && (
                      <th className="ant-table-cell">80G</th>
                    )}
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {records?.length > 0 ? (
                    records?.map((transaction, index) => (
                      <tr
                        key={index + 1}
                        className="ant-table-row ant-table-row-level-0"
                      >
                        <td className="ant-table-cell">
                          {currentPage >= 2
                            ? currentPage * pageSize - pageSize + index + 1
                            : index + 1}
                        </td>
                        {isCorporatePortal && (
                          <td className="ant-table-cell">
                            <span className="ant-typography font-weight-bold">
                              {transaction?.employeeName}
                            </span>
                          </td>
                        )}
                        <td className="ant-table-cell">
                          <span className="ant-typography font-weight-bold">
                            {transaction?.charityName}
                          </span>
                        </td>
                        {!isOrganizationView && (
                          <td className="ant-table-cell">
                            <span className="ant-typography font-weight-bold">
                              {transaction?.socialOrg}
                            </span>
                          </td>
                        )}
                        {!employeeId && !isCorporatePortal && (
                          <td className="ant-table-cell">
                            {transaction?.corporateName}
                          </td>
                        )}
                        <td className="ant-table-cell">
                          {transaction?.transactionId}
                        </td>
                        <td className="ant-table-cell">
                          {transaction?.amount}
                        </td>
                        {/* <td className="ant-table-cell">
                          {transaction?.donationType}
                        </td> */}
                        <td className="ant-table-cell">
                          {transaction?.paymentMethod &&
                            transaction?.paymentMethod.replace(/_/g, " ")}
                        </td>
                        <td className="ant-table-cell text-uppercase">
                          {transaction?.paymentStatus ===
                          paymentConstants.PAYMENT_SUCCESS ? (
                            <span className="text-success">Success</span>
                          ) : (
                            <span className="text-danger">Failed</span>
                          )}
                        </td>
                        <td className="ant-table-cell">
                          {transaction?.paymentDate &&
                            transaction?.paymentDate !== "None" &&
                            moment(transaction?.paymentDate).format(
                              "DD/MM/YY, h:mm A"
                            )}
                        </td>
                        {(employeeId || isCorporatePortal) && (
                          <td className="ant-table-cell">
                            {transaction?.paymentStatus ===
                              paymentConstants.PAYMENT_SUCCESS && (
                              <div className="d-flex">
                                <Tooltip title="Download">
                                  <Link
                                    className="text-decoration-underline"
                                    onClick={() =>
                                      downlad(transaction?.transactionId)
                                    }
                                  >
                                    <i className="bi bi-download fs-5 mr-3"></i>
                                  </Link>
                                </Tooltip>
                                <Tooltip title="Email">
                                  <Link
                                    className="text-decoration-underline"
                                    onClick={() =>
                                      setEmailSend(transaction?.transactionId)
                                    }
                                  >
                                    <i className="bi bi-envelope fs-5"></i>
                                  </Link>
                                </Tooltip>
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No transactions found
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
        <Modal show={open} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Send Mail</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={initialValues}
            validationSchema={Mail80GSchema}
            onSubmit={(values) => {
              confirm(values);
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
            }) => (
              <Form>
                <Modal.Body style={{ fontSize: "18" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="mt-1">
                        Email<span className="text-danger">*</span>
                      </label>
                      <Field
                        name="email"
                        type="text"
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
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-custom"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};
export default ListTransactionsHistory;
