import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { corporateActions, socialOrganizationActions } from "../../actions";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
const actionInitialValues = {
  status: "",
  Id: ""
};

const EmployeesProgram = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.employee?.user);
  const currentPortal = useSelector((state) => state.currentView);
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const employeePrograms = useSelector(
    (state) => state?.corporates?.employeePrograms
  );

  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [programId, setProgramlId] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");

  useEffect(() => {
    dispatch(
      corporateActions.getEmployeeCustomPrograms({
        corporateId: selectedCorporate?.corporate?.id
      })
    );
  }, []);

  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setProgramlId(item?.id);
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
    actionInitialValues.Id = programId;

    dispatch(corporateActions.employeeProgramAction(actionInitialValues));
  };
  return (
    <>
      <div className="customContainer">
        <div className="row mb-4">
          <div className="col-md-12">
            <h1 className="ant-typography customHeading">Employee Programs</h1>
          </div>
        </div>
        <div className="ant-row">
          <div className="ant-col ant-col-24 mt-2">
            <div className="ant-table-wrapper">
              <div className="ant-table">
                <table>
                  <thead className="ant-table-thead">
                    <tr>
                      <th className="ant-table-cell">Employee ID</th>
                      <th className="ant-table-cell">Employee Name</th>
                      <th className="ant-table-cell">Program Name</th>
                      {/* <th className="ant-table-cell text-center">Status</th> */}
                      <th className="ant-table-cell text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {employeePrograms?.length > 0 ? (
                      employeePrograms.map((program, index) => (
                        <tr
                          key={index + 1}
                          className="ant-table-row ant-table-row-level-0"
                        >
                          <td className="ant-table-cell">
                            {program?.employeeCode}
                          </td>
                          <td className="ant-table-cell">
                            {program?.employeeName}
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
                              {program?.name}
                            </span>
                          </td>
                          {/* <td className="ant-table-cell text-center">
                            {program?.approve && (
                              <span className="text-success">Approved</span>
                            )}

                            {program?.approve === null && (
                              <span className="text-warning">Pending</span>
                            )}

                            {!program?.approve && program?.approve !== null && (
                              <span className="text-danger">Disapproved</span>
                            )}
                          </td> */}
                          <td className="ant-table-cell text-center">
                            {(!program?.approve ||
                              program?.approve === null) && (
                              <Tooltip title="Approve">
                                <Link
                                  to="#"
                                  onClick={() => handleOpen("Approve", program)}
                                >
                                  <span className="bi-check-circle fs-5 ml-2"></span>
                                </Link>
                              </Tooltip>
                            )}
                            {(program?.approve ||
                              program?.approve === null) && (
                              <Tooltip title="Disapprove">
                                <Link
                                  to="#"
                                  onClick={() =>
                                    handleOpen("Disapprove", program)
                                  }
                                  className="ml-2"
                                >
                                  <span className="bi-x-circle fs-5"></span>
                                </Link>
                              </Tooltip>
                            )}
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
