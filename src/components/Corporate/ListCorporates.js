import React, { useEffect, useState, createRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { corporateActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "./../Shared/ConfirmationDialog";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

// import corporates from "./../../config/corporates.json";
const actionInitialValues = {
  userId: "",
  requestType: "",
};
const ListCorporates = () => {
  let { id } = useParams();
  console.log(id);
  let history = useHistory();
  const corporates = useSelector((state) => state.corporates);
  console.log(corporates);
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
  const confirm = () => {
    handleClose();
    actionInitialValues.userId = selectedCorporate.userId;
    actionInitialValues.requestType = actionType;
    dispatch(corporateActions.corporateAccountRequest(actionInitialValues));
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(corporateActions.getCorporates());
  }, []);

  const getCorporateByID = (id) => {
    console.log(id, "iddddd");
    dispatch(corporateActions.getCorporateById(id));
  };

  const handleDelete = (id) => {
    console.log(id, "handle delete");
    dispatch(corporateActions.deleteCorporate(id));
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="ant-typography customHeading">
            Corporate Lists MAnas
          </h2>
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
                    corporates?.items.map((corporate, index) => {
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
                              <Link
                                className="text-black"
                                to={`/corporates/edit/${corporate.corporateId}`}
                                onClick={() =>
                                  getCorporateByID(corporate.corporateId)
                                }
                              >
                                <EditFilled className="me-3" />
                              </Link>
                              <Link
                                className="text-black"
                                to="#"
                                onClick={() =>
                                  handleDelete(corporate.corporateId)
                                }
                              >
                                <DeleteFilled className="ms-2 " />
                              </Link>
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
