import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { corporateActions, selectedCorporateActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import Loader from "../Shared/Loader";
import "./../../assets/css/corporates.scss";
import { Link } from "react-router-dom";
const actionInitialValues = {
  userId: "",
  requestType: ""
};
const CorporatesPortal = () => {
  let history = useHistory();
  const corporates = useSelector((state) => state?.corporates?.items);
  const user = useSelector((state) => state.employee.user);
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
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${
        item.organizationName
      }"</strong>?`
    );
  };
  const logout = () => {
    // localStorage.removeItem("user");
    localStorage.clear();
    history.push("/");
  };
  const confirm = () => {
    handleClose();
    actionInitialValues.userId = selectedCorporate.userId;
    actionInitialValues.requestType = actionType;
    dispatch(corporateActions.corporateAccountRequest(actionInitialValues));
  };
  const handleClose = () => setOpen(false);
  if (corporates?.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  useEffect(() => {
    dispatch(corporateActions.getCorporates());
  }, []);
  const setCorporate = (corporate) => {
    dispatch(selectedCorporateActions.selectedCorporate(corporate));
  };
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-4 text-center offset-md-3">
          <a href="/">
            <img
              src="/assets/img/logo.png"
              alt="The Good Platform Logo"
              height={30}
            />
          </a>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 text-center offset-md-3">
          <h4>Corporates Portal</h4>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 offset-md-3">
          {corporates?.loading && <Loader />}
          {corporates?.data && corporates?.data.length > 0 ? (
            <div className="card corporates-lunchpad">
              <ul className="pl-0">
                {/* .filter((val) => {
                    return val?.approvalStatus === "APPROVED";
                  })
                  ? */}
                {corporates?.data?.map((corporate, index) => {
                  return (
                    <li key={index + 1}>
                      <Link
                        to={`/corporates/${corporate.id}/employees`}
                        onClick={() => setCorporate(corporate)}
                      >
                        {corporate?.name}
                      </Link>
                    </li>
                  );
                })}
                {/* {corporates?.items?.data?.map((corporate, index) => {
                  return (
                    <li key={index + 1}>
                      <Link
                        to={`/corporates/${corporate?.id}/employees`}
                        onClick={() => setCorporate(corporate)}
                      >
                        {corporate?.name}
                      </Link>
                    </li>
                  );
                })} */}
                <li key={"logout"} className="logout">
                  <Link onClick={logout}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center">
              <strong>No corporates found</strong>
            </div>
          )}
        </div>
      </div>
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
export default CorporatesPortal;
