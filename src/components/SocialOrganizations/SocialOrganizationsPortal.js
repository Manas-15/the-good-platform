import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  socialOrganizationActions,
  selectedOrganizationActions
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Shared/Loader";
import "./../../assets/css/corporates.scss";
import { Link } from "react-router-dom";
import {
  userConstants,
  viewPortalConstants,
  paginationConstants
} from "../../constants";
import Pagination from "../Shared/Pagination";
// import corporates from "./../../config/corporates.json";
let pageSize = paginationConstants?.PAGE_SIZE;
const SocialOrganizationsPortal = () => {
  let history = useHistory();
  const socialOrganizations = useSelector((state) => state.socialOrganizations);
  const user = useSelector((state) => state.employee.user);
  const loggedInUserType = useSelector(
    (state) => state?.user?.loggedinUserType
  );
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const currentPortal = useSelector((state) => state.currentView);
  const isCorporatePortal = user?.user_type === userConstants.CORPORATE;
  const isEmployeePortal = user?.user_type === userConstants.EMPLOYEE;
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const isIndividualPortal =
  //   currentPortal?.currentView === viewPortalConstants.INDIVIDUAL_PORTAL;
  // const isOthersPortal =
  //   currentPortal?.currentView === viewPortalConstants.OTHERS_PORTAL;
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
        // pageNumber: currentPage.toString(),
        employeeId: isEmployeePortal ? user?.emp_id : null,
        userId: user?.user_id,
        corporateId: isCorporatePortal
          ? selectedCorporate?.corporate?.corporateId
            ? selectedCorporate?.corporate?.corporateId
            : selectedCorporate?.corporate?.id
          : user?.corporateId,
        loggedInUserType: loggedInUserType,
        individualId: "social",
        pageNumber: currentPage.toString(),
        pageSize: pageSize.toString()
        // userId: user?.user_id
      })
    );
  }, []);
  const setSocialOrganization = (organization) => {
    dispatch(selectedOrganizationActions.selectedOrganization(organization));
  };
  const setPage = (page) => {
    setCurrentPage(page);
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
          socialOrganizations?.items?.length > 0 ? (
            <div className="card corporates-lunchpad">
              <ul className="pl-0">
                {socialOrganizations?.items?.map?.((org, index) => {
                  return (
                    <li key={index + 1}>
                      <Link
                        to={`/social-organizations/${org.id}`}
                        onClick={() => setSocialOrganization(org)}
                      >
                        {org?.name}
                      </Link>
                    </li>
                  );
                })}
                <li key={"logout"} className="logout">
                  <Link onClick={logout}>Logout</Link>
                </li>
              </ul>
              {/* <Pagination
                className="pagination-bar mt-4"
                currentPage={currentPage}
                totalCount={
                  socialOrganizations?.totalCount
                    ? socialOrganizations?.totalCount
                    : 0
                }
                pageSize={pageSize}
                onPageChange={(page) => setPage(page)}
              /> */}
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
