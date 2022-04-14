import React, { useEffect, useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import { corporateActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
// import corporates from "./../../config/corporates.json";
const actionInitialValues = {
  userId: "",
  requestType: "",
};
const ListCorporates = () => {
  let history = useHistory();
  const corporates = useSelector((state) => state.corporates);
  const user = useSelector((state) => state.authentication.user);
  const actionMsg = useSelector((state) => state.corporates.msg);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionType, setActionType] = useState("");
  const [selectedCorporate, setSelectedCorporate] = useState(Object);
  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedCorporate(item);
    // if (action === "approve") {
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${
        item.organizationName
      }"</strong>?`
    );
    // } else {
    //   setActionTitle("Reject Confirmation");
    //   setActionContent(
    //     `Are you sure to reject <strong>"${item.organization_name}"</strong>?`
    //   );
    // }
  };
  const confirm = () => {
    handleClose();
    actionInitialValues.userId = selectedCorporate.userId;
    actionInitialValues.requestType = actionType;
    dispatch(corporateActions.corporateAccountRequest(actionInitialValues));
    // if (actionType === "approve") {
    //   dispatch(corporateActions.approveCorporate(actionInitialValues));
    // } else if (actionType === "reject") {
    //   dispatch(corporateActions.rejectCorporate(actionInitialValues));
    // } else if (actionType === "activate") {
    //   dispatch(corporateActions.activateCorporate(actionInitialValues));
    // } else if (actionType === "deactivate") {
    //   dispatch(corporateActions.deactivateCorporate(actionInitialValues));
    // }
  };
  const handleClose = () => setOpen(false);
  if (actionMsg === "Success") {
    let corporate = corporates?.items.find(
      (item) => item.id == selectedCorporate.id
    );
    if (actionType === "Approve") {
      corporate.isApprove = true;
    } else if (actionType === "Reject") {
      corporate.isApprove = false;
    } else if (actionType === "Activate") {
      corporate.isActive = true;
    } else if (actionType === "Deactivate") {
      corporate.isActive = false;
    }
  }
  useEffect(() => {
    dispatch(corporateActions.getCorporates());
  }, []);

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
          {corporates?.items && corporates?.items.length > 0 ? (
            corporates?.items.map((corporate, index) => {
              const ref = createRef();
              // const handleClick = () =>
              // index > 6 && ref.current.scrollIntoView({
              //   behavior: 'smooth',
              // });
              return (
                <tr key={index + 1} ref={ref}>
                  <td scope="row">{index + 1}</td>
                  <td>{corporate?.organizationName}</td>
                  <td>{corporate?.organizationSize}</td>
                  <td>{corporate?.organizationType}</td>
                  <td>
                    {corporate?.address}
                    <br />
                    {corporate?.city}
                    <br />
                    {corporate?.state}
                    <br />
                    {corporate?.country}
                  </td>
                  <td className="text-center">
                    <a className="icon" href="#" data-bs-toggle="dropdown">
                      <span className="bi-three-dots"></span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow actions">
                      {corporate?.isApprove === null ||
                      !corporate?.isApprove ? (
                        <li
                          className="dropdown-header text-start"
                          onClick={() => handleOpen("Approve", corporate)}
                        >
                          <span className="bi-check-circle"> Approve</span>
                        </li>
                      ) : null}
                      {corporate?.isApprove === null || corporate?.isApprove ? (
                        <li
                          className="dropdown-header text-start"
                          onClick={() => handleOpen("Reject", corporate)}
                        >
                          <span className="bi-x-circle"> Disapprove</span>
                        </li>
                      ) : null}
                      {corporate?.isApprove && !corporate?.isActive ? (
                        <li
                          className="dropdown-header text-start"
                          onClick={() => handleOpen("Activate", corporate)}
                        >
                          <span className="bi-power"> Activate</span>
                        </li>
                      ) : null}
                      {corporate?.isApprove && corporate?.isActive ? (
                        <li
                          className="dropdown-header text-start"
                          onClick={() => handleOpen("Deactivate", corporate)}
                        >
                          <span className="bi-slash-circle"> Deacticate</span>
                        </li>
                      ) : null}
                    </ul>
                  </td>
                </tr>
              );
            })
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
          handleConfirm={() => {
            confirm();
          }}
          handleCancel={() => {
            handleClose();
          }}
        />
      )}
    </div>
  );
};
export default ListCorporates;
