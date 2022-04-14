import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import charityPrograms from "../../config/charityPrograms.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListCharityPrograms = () => {
  let history = useHistory();
  // const corporates = useSelector(state => state.corporates);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Charity Programs</h4>
        </div>
      </div>
      {/* {corporates.loading && <em>Loading charity programs...</em>} */}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th scope="col">Sl#</th>
            <th scope="col">Cause</th>
            <th>Social Organization</th>
            <th>Category</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {charityPrograms ? (
            charityPrograms.map((charityProgram, index) => (
              <tr key={index + 1}>
                <td scope="row">{index + 1}</td>
                <td>{charityProgram.cause}</td>
                <td>{charityProgram.socialOrganization}</td>
                <td>{charityProgram.category}</td>
                <td className="text-center">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Donate
                  </button>
                  <Link>
                    <span className="bi-gear fs-5 ml-2 cursor-pointer"></span>
                  </Link>
                  <Link>
                    <span className="bi-suit-heart fs-5 ml-2 cursor-pointer text-danger"></span>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
