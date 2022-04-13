import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { corporateActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
import { Link, useLocation } from "react-router-dom";
// import corporates from "./../../config/corporates.json";

const ListCorporates = () => {
  let history = useHistory();
  const corporates = useSelector((state) => state.corporates);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionType, setActionType] = useState("");
  const handleOpen = (title, content) => {
    setOpen(true);
    setActionType(title);
    if (title === "approve") {
      setActionTitle("Approve Confirmation");
    } else {
      setActionTitle("Reject Confirmation");
    }
    setActionContent(content);
  };
  const handleClose = () => setOpen(false);
  console.log("initialize open", open);
  useEffect(() => {
    dispatch(corporateActions.getCorporates());
  }, []);
  // const test = corporates.items.data.message.corporates

  return (
    <div>      
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Corporates</h4>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push("/corporates/add")}
          >
            Add Corporate
          </button>
        </div>
      </div>
      {corporates.loading && <em>Loading corporates...</em>}
      <table className="table table-striped">
        <thead>
          <tr className="table-active">
            <th scope="col">Sl#</th>
            <th scope="col">Name</th>
            <th>Size</th>
            <th>Type</th>
            <th scope="col">Address</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {corporates?.items?.data?.corporates &&
          corporates?.items?.data?.corporates.length > 0 ? (
            corporates?.items?.data?.corporates.map((corporate, index) => (
              <tr key={index + 1}>
                <td scope="row">{index + 1}</td>
                <td>{corporate.organization_name}</td>
                <td>{corporate.organization_size}</td>
                <td>{corporate.organization_type}</td>
                <td>
                  {/* {corporate.address
                    .split(",")
                    .reduce((all, cur) => [...all, <br />, cur])} */}
                </td>
                <td className="text-center">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <span className="bi-three-dots"></span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <a
                        className="bi-check-circle cursor-pointer"
                        onClick={() =>
                          handleOpen(
                            "approve",
                            `Are you sure to approve "${corporate.organization_name}"?`
                          )
                        }
                      >
                        {" "}
                        Approve
                      </a>
                    </li>
                    <li className="dropdown-header text-start">
                      <a
                        className="bi-x-circle cursor-pointer"
                        onClick={() =>
                          handleOpen(
                            "reject",
                            `Are you sure to reject "${corporate.organization_name}"?`
                          )
                        }
                      >
                        {" "}
                        Reject
                      </a>
                    </li>
                  </ul>
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
      {open && (
        <ConfirmationDialog
          open={true}
          title={actionTitle}
          content={actionContent}
          handleOK={() => {
            handleClose();
            alert("yeah");
          }}
          handleCancel={() => {
            handleClose();
            alert("cancel");
          }}
        />
      )}
    </div>
  );
};
export default ListCorporates;
