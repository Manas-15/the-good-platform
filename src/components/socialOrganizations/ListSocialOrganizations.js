import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import socialOrganizations from "./../../config/socialOrganizations.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import urlSlug from "url-slug";
import {
  socialOrganizationConstants,
  paginationConstants,
} from "../../constants";
import {
  selectedOrganizationActions,
  socialOrganizationActions,
} from "../../actions";
import Pagination from "./../Shared/Pagination";
import * as moment from "moment";
import { selectedOrganization } from "../../reducers/selectedOrganization.reducer";
import Loader from "../Shared/Loader";
import { Tooltip } from "antd";
// import Donate from "./../";
let pageSize = paginationConstants?.PAGE_SIZE;
const ListCharityPrograms = () => {
  let history = useHistory();
  const socialOrganizations = useSelector((state) => state.socialOrganizations);

  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      socialOrganizationActions.getSocialOrganizations({
        pageSize: pageSize,
        offset: currentPage >= 2 ? currentPage * pageSize - pageSize : 0,
      })
    );
  }, [currentPage]);
  const setPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setTotalCount(socialOrganizations?.totalCount);
  }, [socialOrganizations?.totalCount]);
  const setOrganization = (organizationId) => {
    dispatch(selectedOrganizationActions.selectedOrganization(organizationId));
  };
  const renderClass = (param) => {
    switch (param) {
      case socialOrganizationConstants.APPROVED:
        return "text-success";
      case socialOrganizationConstants.REJECTED:
        return "text-danger";
      case socialOrganizationConstants.PENDING:
        return "text-warning";
      default:
        return "text-warning";
    }
  };
  return (
    <div className="customContainer">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="ant-typography customHeading">Social Organizations</h1>
        </div>
      </div>
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
      {socialOrganizations.loading && <Loader />}
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">SR NO.</th>
                    <th className="ant-table-cell">Name</th>
                    <th className="ant-table-cell text-center">
                      Total Programs
                    </th>
                    <th className="ant-table-cell">Created On</th>
                    {/* <th className="ant-table-cell">Status</th> */}
                    <th className="ant-table-cell text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {socialOrganizations?.items ? (
                    socialOrganizations?.items.map(
                      (socialOrganization, index) => (
                        <tr
                          key={index + 1}
                          className="ant-table-row ant-table-row-level-0"
                        >
                          <td className="ant-table-cell">{index + 1}</td>
                          <td className="ant-table-cell">
                            <span className="ant-typography font-weight-bold">
                              <Link
                                to={{
                                  pathname: `/social-organizations/${urlSlug(
                                    socialOrganization?.name
                                  )}`,
                                }}
                                onClick={() =>
                                  setOrganization(socialOrganization?.id)
                                }
                              >
                                <span className="custom-color">
                                  {socialOrganization?.name}
                                </span>
                              </Link>
                            </span>
                          </td>
                          <td className="ant-table-cell text-center">
                            {socialOrganization?.total_program}
                          </td>
                          <td className="ant-table-cell">
                            {moment(socialOrganization?.created_date).format(
                              "LL"
                            )}
                          </td>
                          <td className="ant-table-cell text-center">
                          
                            </td>
                          {/* <td className="ant-table-cell">
                          <span
                            className={renderClass(
                              socialOrganization?.approvalStatus
                            )}
                          >
                            {socialOrganization?.approvalStatus}
                          </span>
                        </td> */}
                          {/* <td className="ant-table-cell text-center">
                          <Link>
                            <span
                              className="bi-check-circle fs-5"
                              title="Confirm"
                            ></span>
                          </Link>
                        </td> */}
                        
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No organizations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              className="pagination-bar mt-4"
              currentPage={currentPage}
              totalCount={totalCount ? totalCount : 0}
              pageSize={pageSize}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCharityPrograms;
