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
  console.log(data);

  let history = useHistory();
  const individuals = useSelector((state) => state.individuals);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionId, setActionId] = useState("");

  const [actionType, setActionType] = useState("");

  const handleOpenDialog = (action, item, id) => {
    // console.log(action, item, id);
    setOpen(true);
    setActionType(action);
    // setSelectedCorporate(item);
    setActionTitle(`${action} Confirmation`);
    setActionId(id);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${item}"</strong> individual user?`
    );
  };
  // console.log(actionType);

  // const confirm = () => {
  //   handleClose();
  //   actionInitialValues.userId = actionId;
  //   actionInitialValues.requestType = actionType;

  //   // if (actionType === "Delete") {
  //   //   dispatch(corporateActions.deleteCorporate({ corporateId: actionId }));
  //   // } else {
  //   dispatch(corporateActions.corporateAccountRequest(actionInitialValues));
  //   // }
  // };
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
                              {/* <div className="ms-2">
                                <Tooltip title="Edit">
                                  <Link
                                    className="text-black"
                                    to={{
                                      pathname: `/individuals/edit/${individual.corporateId}`,
                                      state: individual.corporateId
                                    }}
                                  >
                                    <i
                                      className="bi bi-pencil fs-5 me-1"
                                      style={{ fontSize: "17px" }}
                                    ></i>
                                  </Link>
                                </Tooltip>
                                {!individual?.isActive ? (
                                  <Tooltip title="Activate">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleOpenDialog(
                                          "Activate",
                                          individual?.organizationName,
                                          individual?.userId
                                        )
                                      }
                                    >
                                      <i className="bi bi-check-circle custom-color fs-5 ms-2"></i>
                                    </Link>
                                  </Tooltip>
                                ) : null}
                                {individual?.isActive ? (
                                  <Tooltip title="Inactivate">
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleOpenDialog(
                                          "Inactivate",
                                          individual?.organizationName,
                                          individual?.userId
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
                                        individual?.organizationName,
                                        individual?.corporateId
                                      )
                                    }
                                  >
                                    <i className="bi bi-trash fs-5 custom-color ms-2"></i>
                                  </Link>
                                </Tooltip>
                              </div> */}
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

      {/* {open && (
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
      )} */}
    </div>
  );
};
export default ListIndividuals;
