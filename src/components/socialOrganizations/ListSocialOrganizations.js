import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import socialOrganizations from "./../../config/socialOrganizations.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListCharityPrograms = () => {
  let history = useHistory();
  // const corporates = useSelector(state => state.corporates);
  // const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

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
      {/* {corporates.loading && <em>Loading charity programs...</em>} */}
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">Sl#</th>
                    <th className="ant-table-cell">Name</th>
                    <th className="ant-table-cell">Date Added</th>
                    <th className="ant-table-cell text-center">Programs</th>
                    <th className="ant-table-cell text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {socialOrganizations ? (
                    socialOrganizations.map((socialOrganization, index) => (
                      <tr
                        key={index + 1}
                        className="ant-table-row ant-table-row-level-0"
                      >
                        <td className="ant-table-cell">{index + 1}</td>
                        <td className="ant-table-cell">
                          <span className="ant-typography font-weight-bold">
                            {socialOrganization.name}
                          </span>
                        </td>
                        <td className="ant-table-cell">
                          {socialOrganization.dateAdded}
                        </td>
                        <td className="ant-table-cell text-center">
                          {socialOrganization.charityPrograms}
                        </td>
                        <td className="ant-table-cell text-center">
                          <Link><span className="bi-check-circle fs-5" title="Confirm"></span></Link>
                        </td>
                      </tr>
                    ))
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCharityPrograms;
