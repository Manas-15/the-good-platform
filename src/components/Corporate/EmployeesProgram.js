import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socialOrganizationActions } from "../../actions";
import ConfirmationDialog from "../Shared/ConfirmationDialog";

const actionInitialValues = {
  status: "",
  socialId: "",
};

const EmployeesProgram = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.employee?.user);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const newPrograms = useSelector(
    (state) => state?.socialOrganizations?.newprogram
  );

  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [socialId, setSocialId] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");

  useEffect(() => {
    dispatch(
      socialOrganizationActions.getAllProgram({
        corporateId: selectedCorporate?.corporate?.id,
      })
    );
  }, []);

  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSocialId(item?.socialId);
    // setSelectedEmployee(item);
    setActionTitle(`${action} Confirmation`);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${
        item?.name
      }"</strong>?`
    );
  };
  const handleClose = () => setOpen(false);

  const confirm = () => {
    handleClose();
    // actionInitialValues.userId = selectedEmployee.id;
    actionInitialValues.status = actionType;
    actionInitialValues.socialId = socialId;

    dispatch(
      socialOrganizationActions.programActionRequest(actionInitialValues)
    );
  };
  return (
    <>
      <div className="customContainer">
        <div className="ant-row">
          <div className="ant-col ant-col-24 mt-2">
            <div className="ant-table-wrapper">
              <div className="ant-table">
                <table>
                  <thead className="ant-table-thead">
                    <tr>
                      <th className="ant-table-cell">SR NO.</th>
                      <th className="ant-table-cell">Email</th>
                      <th className="ant-table-cell">Name</th>
                      <th className="ant-table-cell text-center">Status</th>
                      <th className="ant-table-cell text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {newPrograms?.length > 0 ? (
                      newPrograms.map((newProgram, index) => (
                        <tr
                          key={index + 1}
                          className="ant-table-row ant-table-row-level-0"
                        >
                          <td className="ant-table-cell">{index + 1}</td>
                          <td className="ant-table-cell">
                            {newProgram?.email}
                          </td>
                          <td className="ant-table-cell">
                            <span className="ant-typography font-weight-bold">
                              {/* <Link
                                to={{
                                  pathname: `/social-organizations/${urlSlug(
                                    socialOrganization?.name
                                  )}`,
                                  tabType: tabType,
                                }}
                                onClick={() =>
                                  setOrganization(socialOrganization)
                                }
                              >
                                <span className="custom-color">
                                  {socialOrganization?.name}
                                </span>
                              </Link> */}
                              {newProgram?.name}
                            </span>
                          </td>
                          <td className="ant-table-cell text-center">
                            {newProgram?.approve && (
                              <span className="text-success">Approved</span>
                            )}

                            {newProgram?.approve === null && (
                              <span className="text-warning">Pending</span>
                            )}

                            {!newProgram?.approve &&
                              newProgram?.approve !== null && (
                                <span className="text-danger">Rejected</span>
                              )}
                          </td>
                          <td className="ant-table-cell text-center">
                            <a
                              className="icon"
                              href="#"
                              data-bs-toggle="dropdown"
                            >
                              <span className="bi-three-dots"></span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow actions">
                              {!newProgram?.approve ? (
                                <li
                                  className="dropdown-header text-start"
                                  onClick={() =>
                                    handleOpen("Approve", newProgram)
                                  }
                                >
                                  <span className="bi-check-circle">
                                    &nbsp;Approve
                                  </span>
                                </li>
                              ) : null}
                              {newProgram?.approve ? (
                                <li
                                  className="dropdown-header text-start"
                                  onClick={() =>
                                    handleOpen("Disapprove", newProgram)
                                  }
                                >
                                  <span className="bi-x-circle">
                                    &nbsp;Reject
                                  </span>
                                </li>
                              ) : null}
                            </ul>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Programs found
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
    </>
  );
};

export default EmployeesProgram;
