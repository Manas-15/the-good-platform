import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { corporateActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
// import { EditFilled } from "@ant-design/icons";
// import { DeleteFilled } from "@ant-design/icons";
import { Progress, Tooltip, Switch } from "antd";
import { Link } from "react-router-dom";

// const actionInitialValues = {
//   userId: "",
//   requestType: "",
// };
const ListCorporates = () => {
  let history = useHistory();
  const corporates = useSelector((state) => state.corporates);
  // const user = useSelector((state) => state.employee.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [actionId, setActionId] = useState("");

  // const [actionType, setActionType] = useState("");
  // const [selectedCorporate, setSelectedCorporate] = useState(Object);

  const handleOpenDialog = (action, item, id) => {
    // console.log(action, item, id);
    setOpen(true);
    // setActionType(action);
    // setSelectedCorporate(item);
    setActionTitle(`${action} Confirmation`);
    setActionId(id);
    setActionContent(
      `Are you sure to ${action.toLowerCase()} <strong>"${item}"</strong>?`
    );
  };
  const confirm = () => {
    handleClose();
    dispatch(corporateActions.deleteCorporate({ corporateId: actionId }));
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(corporateActions.getCorporates());
  }, []);

  // const getCorporateByID = (id) => {
  //   console.log(id, "iddddd");
  //   dispatch(corporateActions.getCorporateById(id));
  // };

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
                    <th className="ant-table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {corporates?.items && corporates?.items.length > 0 ? (
                    corporates?.items
                      ?.filter((val) => {
                        return val?.isActive === true;
                      })
                      .map((corporate, index) => {
                        return (
                          <tr
                            className="ant-table-row ant-table-row-level-0"
                            key={index}
                          >
                            <td className="ant-table-cell">{index + 1}</td>
                            <td className="ant-table-cell">
                              <span className="ant-typography font-weight-bold">
                                {corporate?.organizationName}
                              </span>
                            </td>
                            <td className="ant-table-cell">--</td>
                            <td className="ant-table-cell">--</td>

                            <td className="ant-table-cell d-flex ">
                              <div className="ms-3">
                                <Tooltip title="Edit">
                                  <Link
                                    className="text-black"
                                    to={{
                                      pathname: `/corporates/edit/${corporate.corporateId}`,
                                      state: corporate.corporateId,
                                    }}
                                    // onClick={() =>
                                    //   getCorporateByID(corporate.corporateId)
                                    // }
                                  >
                                    <i
                                      className="bi bi-pencil fs-5 me-1"
                                      style={{ fontSize: "17px" }}
                                    ></i>
                                  </Link>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <Link
                                    className="text-black"
                                    to="#"
                                    onClick={() =>
                                      handleOpenDialog(
                                        "Delete",
                                        corporate?.organizationName,
                                        corporate?.corporateId
                                      )
                                    }
                                  >
                                    <i className="bi bi-trash fs-5 custom-color ms-2"></i>
                                  </Link>
                                </Tooltip>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No employees found
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
