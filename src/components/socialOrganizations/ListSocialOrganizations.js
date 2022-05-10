import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import socialOrganizations from "./../../config/socialOrganizations.json";
import { useDispatch, useSelector } from "react-redux";
import "./../../assets/css/socialOrganizations.scss";
import * as moment from "moment";

const ListSocialOrganizations = () => {
  let history = useHistory();
  // const corporates = useSelector(state => state.corporates);
  const user = useSelector((state) => state.employee.user);
  const dispatch = useDispatch();

  return (
    <div className="social-organization">
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Social Organizations</h4>
        </div>
      </div>
      {/* {corporates.loading && <em>Loading charity programs...</em>} */}
      {/* <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th>Sl#</th>
            <th>Name</th>
            <th>Date Added</th>
            <th className="text-center">Charity Programs</th>
            {/* <th className="text-center">Actions</th> 
          </tr>
        </thead>
        <tbody> */}
      {socialOrganizations ? (
        <div className="row">
          {socialOrganizations.map((socialOrganization, index) => (
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body card pt-3 d-flex flex-column align-items-center">
                  <img
                    src="assets/img/profile-img.jpg"
                    alt="Image"
                    className="rounded-circle"
                  />
                  <h2>{socialOrganization.name}</h2>
                  <div className="info">
                    <strong>Established:&nbsp;</strong>
                    {moment(socialOrganization.dateAdded).format("LL")}
                  </div>
                  <div className="info mb-4">
                    <strong>Programs:&nbsp;</strong>
                    {socialOrganization.charityPrograms}
                  </div>
                  <div className="social-links mt-2">
                    <a href="#" className="twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="linkedin">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>No organization found</span>
      )}
      {/* //     ) : (
      //       <tr>
      //         <td colSpan="4" className="text-center">
      //           No corporates found
      //         </td>
      //       </tr>
      //     )}
      //   </tbody> 
      // </table>*/}
      {/* <div className="row mb-4">
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
      </div> */}
    </div>
  );
};
export default ListSocialOrganizations;
