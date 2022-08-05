import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { corporateActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import * as moment from "moment";

const actionInitialValues = {
  userId: "",
  requestType: ""
};
const ListCorporates = () => {
  let location = useLocation();
  const data = location.state;

  let history = useHistory();
  const corporates = useSelector((state) => state.corporates);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionId, setActionId] = useState("");
  const [actionType, setActionType] = useState("");
  const handleOpenDialog = (action, item, id) => {
    setOpen(true);
    setActionType(action);
    // setSelectedCorporate(item);
    setActionTitle(`${action} Confirmation`);
    setActionId(id);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${item}"</strong> corporate?`
    );
  };
  const confirm = () => {
    handleClose();
    actionInitialValues.userId = actionId;
    actionInitialValues.requestType = actionType;

    // if (actionType === "Delete") {
    //   dispatch(corporateActions.deleteCorporate({ corporateId: actionId }));
    // } else {
    dispatch(corporateActions.corporateAccountRequest(actionInitialValues));
    // }
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(corporateActions.getCorporates());
  }, []);
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="ant-typography customHeading">Corporate Lists</h2>
        </div>
        <div className="col-md-6" style={{ textAlign: "right" }}>
          <button
            type="button"
            className="btn btn-custom"
            onClick={() => history.push("/corporates/add")}
          >
            Add Corporate
          </button>
        </div>
      </div>
      {corporates.loading && <em>Loading corporates...</em>}
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table className="">
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">Sl No.</th>
                    <th className="ant-table-cell">Name</th>
                    <th className="ant-table-cell">Employees</th>
                    <th className="ant-table-cell">Date Added</th>
                    {/* <th className="ant-table-cell">Actions</th> */}
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {corporates?.items?.length > 0 ? (
                    // ?.filter((val) => {
                    //   return !val?.isDeleted;
                    // })
                    // ?
                    corporates?.items?.map((corporate, index) => {
                      return (
                        <tr
                          className="ant-table-row ant-table-row-level-0"
                          key={index}
                        >
                          <td className="ant-table-cell">{index + 1}</td>
                          <td className="ant-table-cell">
                            <span className="ant-typography font-weight-bold">
                              <Link
                                className="text-black"
                                to={{
                                  pathname: `/corporates/${corporate.id}/employees`,
                                  state: data?.isSuperadminView
                                }}
                              >
                                {corporate?.name}
                              </Link>
                            </span>
                          </td>
                          <td className="ant-table-cell">
                            {corporate?.employeeCount}
                          </td>
                          <td className="ant-table-cell">
                            {moment(corporate?.createdOn).format(
                              "DD MMM, YYYY"
                            )}
                          </td>
                          {/* <td className="ant-table-cell">
                              <div className="ms-2">
                                <Tooltip title="Edit">
                                  <Link
                                    className="text-black"
                                    to={{
                                      pathname: `/corporates/edit/${corporate.id}`,
                                      state: corporate.id
                                    }}
                                  >
                                    <i
                                      className="bi bi-pencil fs-5 me-1"
                                      style={{ fontSize: "17px" }}
                                    ></i>
                                  </Link>
                                </Tooltip>
                                {!corporate?.isActive ? (
                                  <Tooltip title="Activate">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleOpenDialog(
                                          "Activate",
                                          corporate?.organizationName,
                                          corporate?.userId
                                        )
                                      }
                                    >
                                      <i className="bi bi-check-circle custom-color fs-5 ms-2"></i>
                                    </Link>
                                  </Tooltip>
                                ) : null}
                                {corporate?.isActive ? (
                                  <Tooltip title="Inactivate">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleOpenDialog(
                                          "Inactivate",
                                          corporate?.organizationName,
                                          corporate?.userId
                                        )
                                      }
                                    >
                                      <i className="bi bi-x-circle custom-color fs-5 ms-2"></i>
                                    </Link>
                                  </Tooltip>
                                ) : null}

                                <Tooltip title="Delete">
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      handleOpenDialog(
                                        "Delete",
                                        corporate?.name,
                                        corporate?.id
                                      )
                                    }
                                  >
                                    <i className="bi bi-trash fs-5 custom-color ms-2"></i>
                                  </Link>
                                </Tooltip>
                              </div>
                            </td> */}
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
    </div>
  );
};
export default ListCorporates;
