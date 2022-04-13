import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import socialOrganizations from "./../../config/socialOrganizations.json";
import { useDispatch, useSelector } from "react-redux";

const ListCharityPrograms = () => {
  let history = useHistory();
  // const corporates = useSelector(state => state.corporates);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Social Organizations</h4>
        </div>
      </div>
      {/* {corporates.loading && <em>Loading charity programs...</em>} */}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th scope="col">Sl#</th>
            <th scope="col">Name</th>
            <th>Date Added</th>
            <th className="text-center">Charity Programs</th>
            {/* <th className="text-center">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {socialOrganizations ? (
            socialOrganizations.map((socialOrganization, index) => (
              <tr key={index + 1}>
                <td scope="row">{index + 1}</td>
                <td>{socialOrganization.name}</td>
                <td>{socialOrganization.dateAdded}</td>
                <td className="text-center">
                  {socialOrganization.charityPrograms}
                </td>
                {/* <td className="text-center">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Activate
                  </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No corporates found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="row mb-4">
        <div className="col-md-6">
          <p>Showing 1 to 10 of 20 records</p>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <nav aria-label="Page navigation example" className="d-inline-block">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default ListCharityPrograms;
