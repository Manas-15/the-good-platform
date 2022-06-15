import React, { useEffect, useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import {
  socialOrganizationActions,
  selectedOrganizationActions
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Shared/Loader";
import "./../../assets/css/corporates.scss";
import { Link } from "react-router-dom";
// import corporates from "./../../config/corporates.json";
const actionInitialValues = {
  userId: "",
  requestType: ""
};
const SocialOrganizationsPortal = () => {
  let history = useHistory();
  const socialOrganizations = useSelector((state) => state.socialOrganizations);
  const user = useSelector((state) => state.employee.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const logout = () => {
    // localStorage.removeItem("user");
    localStorage.clear();
    history.push("/");
  };
  if (socialOrganizations.loading) {
    document.getElementById("root").classList.add("loading");
  } else {
    document.getElementById("root").classList.remove("loading");
  }
  useEffect(() => {
    dispatch(
      socialOrganizationActions.getSocialOrganizations({
        individualId: "social"
      })
    );
  }, []);
  const setSocialOrganization = (organization) => {
    dispatch(selectedOrganizationActions.selectedOrganization(organization));
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
          <h4>Social Organizations Portal</h4>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 offset-md-3">
          {socialOrganizations.loading && <Loader />}
          {socialOrganizations?.items &&
          socialOrganizations?.items?.all_programs?.length > 0 ? (
            <div className="card corporates-lunchpad">
              <ul className="pl-0">
                {socialOrganizations?.items?.all_programs?.map?.(
                  (org, index) => {
                    return (
                      <li key={index + 1}>
                        <Link
                          to={`/organizations/${org.id}/payroll-batch`}
                          onClick={() => setSocialOrganization(org)}
                        >
                          {org?.name}
                        </Link>
                      </li>
                    );
                  }
                )}
                <li key={"logout"} className="logout">
                  <Link onClick={logout}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center">
              <strong>No social organizations found</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SocialOrganizationsPortal;
