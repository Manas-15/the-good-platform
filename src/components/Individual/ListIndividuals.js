import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { individualActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import * as moment from "moment";

const actionInitialValues = {
  userId: "",
  requestType: ""
};
const ListIndividuals = () => {
  let location = useLocation();
  const data = location.state;
  let history = useHistory();
  const individuals = useSelector((state) => state.individuals);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionId, setActionId] = useState("");
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState("");

  const handleOpenDialog = (action, item, id) => {
    setOpen(true);
    setActionType(action);
    // setSelectedCorporate(item);
    setActionName(item);
    setActionTitle(`${action === "Block" ? "Unblock" : "Block"} Confirmation`);
    setActionId(id);
    setActionContent(
      `Are you sure to ${
        action === "Block" ? "unblock" : "block"
      } <strong>"${item}"</strong> individual user?`
    );
  };
  const confirm = () => {
    handleClose();
    actionInitialValues.userId = actionId;
    actionInitialValues.requestType = actionType;
    dispatch(
      individualActions.individualAccountRequest(
        actionInitialValues,
        actionName
      )
    );
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(individualActions.getIndividuals());
  }, []);

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="ant-typography customHeading">Individual Lists</h2>
        </div>
        {/* <div className="col-md-6" style={{ textAlign: "right" }}>
          <button
            type="button"
            className="btn btn-custom"
            onClick={() => history.push("/corporates/add")}
          >
            Add Corporate
          </button>
        </div> */}
      </div>
      {individuals.loading && <em>Loading individuals...</em>}
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table className="">
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">SR No.</th>
                    <th className="ant-table-cell">Name</th>
                    <th className="ant-table-cell">Email</th>
                    <th className="ant-table-cell">Phone</th>
                    <th className="ant-table-cell">Gender</th>
                    <th className="ant-table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {individuals?.items && individuals?.items.length > 0 ? (
                    individuals?.items
                      ?.filter((val) => {
                        return !val?.isDeleted;
                      })
                      ?.map((individual, index) => {
                        return (
                          <tr
                            className="ant-table-row ant-table-row-level-0"
                            key={index}
                          >
                            <td className="ant-table-cell">{index + 1}</td>
                            <td className="ant-table-cell">
                              {individual?.name}
                            </td>
                            <td className="ant-table-cell">
                              {individual?.email}
                            </td>
                            <td className="ant-table-cell">
                              {individual?.contactNumber}
                            </td>
                            <td className="ant-table-cell">
                              {individual?.gender}
                            </td>
                            <td className="ant-table-cell">
                              <div className="ms-2">
                                {individual?.isActive && (
                                  <Tooltip title={`Block ${individual?.name}`}>
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleOpenDialog(
                                          "Inactivate",
                                          individual?.name,
                                          individual?.userId
                                        )
                                      }
                                    >
                                      <i className="bi bi-unlock custom-color fs-5 ms-2"></i>
                                    </Link>
                                  </Tooltip>
                                )}
                                {!individual?.isActive && (
                                  <Tooltip
                                    title={`Unblock ${individual?.name}`}
                                  >
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleOpenDialog(
                                          "Activate",
                                          individual?.name,
                                          individual?.userId
                                        )
                                      }
                                    >
                                      <i className="bi bi-slash-circle custom-color f-size  ms-2"></i>
                                    </Link>
                                  </Tooltip>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No individuals found
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
export default ListIndividuals;
