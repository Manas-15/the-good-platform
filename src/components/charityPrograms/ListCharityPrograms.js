import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import charityPrograms from "../../config/charityPrograms.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ListCharityPrograms = () => {
  let history = useHistory();
  // const corporates = useSelector(state => state.corporates);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const openNav = () => {
    console.log("2222222222222222222222");
    document.getElementById("mySidepanel").style.width = "450px";
  };
  const closeNav = () => {
    console.log("2222222222222222222222 111");
    document.getElementById("mySidepanel").style.width = "0";
  };

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
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={openNav}
                  >
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
      <div id="mySidepanel" className="sidepanel">
        <div className="donate-header">
          <div className="row">
            <div className="col-md-10 p-3">
              <span className="pl-3">
                You can make a big difference to their lives?
              </span>
            </div>
            <div className="col-md-2">
              <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
                ×
              </a>
            </div>
          </div>

          <ul className="nav nav-tabs nav-tabs-bordered">
            <li className="nav-item">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#give-once"
              >
                Give Once
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#give-monthly"
              >
                Give monthly
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content pt-2">
          <div className="tab-pane fade show active give-once" id="give-once">
            ssssss
          </div>
          <div className="tab-pane fade show give-monthly" id="give-monthly">
            <div className="row mb-4">
              <div className="col-md-12">Choose an amount to donate</div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 text-right">
                <Button variant="outline-secondary w-50">800</Button>{" "}
              </div>
              <div className="col-md-6">
                <Button variant="outline-secondary w-50">1000</Button>{" "}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 text-right">
                <Button variant="outline-secondary w-50">1500</Button>{" "}
              </div>
              <div className="col-md-6">
                <Button variant="outline-secondary w-50">2000</Button>{" "}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Other Amount"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-12 text-center">
                <p>
                  <span className="bi-heart-fill fs-5 ml-2 cursor-pointer text-danger"></span> How will my donation help?
                </p>
                <p>Your contribution will used towards giving India's underprevileged children happier childhoods.</p>
                <p>Your dontaions are tax excepted under 80G of the Indian Income Tax Act.</p>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-12 text-center">
                <Button className="btn btn-secondary w-100 rounded-pill"><span className="bi-heart-fill fs-5 ml-2 cursor-pointer text-danger"></span> Donate</Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCharityPrograms;
