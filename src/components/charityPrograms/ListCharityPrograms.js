import React, { useState, useEffect } from "react";
import "./../../assets/css/charityProgramsList.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  viewPortalConstants,
  charityProgramConstants,
  userConstants
} from "../../constants";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import {
  charityProgramActions,
  selectedCharityActions,
  selectedCharityTabActions
} from "../../actions";
import urlSlug from "url-slug";
// import DonateHeader from "./../CharityPrograms/DonateHeader";
// import Donate from "./../CharityPrograms/Donate";
// import { handleInputChange } from "react-select/dist/declarations/src/utils";

const ListCharityPrograms = ({ items, setCharity, tabType }) => {
  const dispatch = useDispatch();
  const openNav = (charity) => {
    // document.getElementById("sidepanel").classList.add("is-open");
    setCharity(charity);
  };

  const employeeCount = useSelector(
    (state) => state?.charityPrograms?.employeeCount
  );
  const user = useSelector((state) => state?.employee?.user);
  const selectedCharity = useSelector(
    (state) => state?.selectedCharity?.charity
  );
  const selectedOrganization = useSelector(
    (state) => state?.selectedOrganization?.organization
  );
  const currentPortal = useSelector((state) => state.currentView);
  // const beforeUnrpomoteMsg = useSelector(
  //   (state) => state?.charityPrograms?.checkBeforeUnpromoteMsg
  // );
  const [open, setOpen] = useState(false);

  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const isOthersPortal = user?.user_type === userConstants.CORPORATE;
  const isEmployeePortal = user?.user_type === userConstants.EMPLOYEE;
  const isIndividualPortal =
    currentPortal?.currentView === viewPortalConstants.INDIVIDUAL_PORTAL;
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(Object);
  const [socialIdd, setSocialIdd] = useState();
  const [checked, setChecked] = useState();
  const [checkedProgram, setCheckedProgram] = useState({
    programId: [],
    corporateId: "",
    socialId: ""
  });

  // const [isSelectedAll, setIsSelectedAll] = useState(false);
  // const [checkList, setCheckList] = useState();
  const [allItems, setAllItems] = useState([]);

  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedProgram(item);
    setActionTitle(`${action} Confirmation`);
    setSelectedCharity(item);
    if (action === charityProgramConstants.UNPROMOTE) {
      setActionContent(
        employeeCount > 0
          ? `Are you sure you want to unpromote?.<br/><br/>Doing this would remove all the donation preferences set for the programs by the employees.<br/><br/>Total ${employeeCount} employees have set donation preference for the programs.`
          : `Are you sure you want to unpromote?.`
      );
    } else if (action === charityProgramConstants.BULK_UNPROMOTE) {
      setActionContent(
        employeeCount > 0
          ? `Are you sure you want to Bulk Unpromote?.<br/><br/>Doing this would remove all the donation preferences set for the programs by the employees.<br/><br/>Total ${employeeCount} employees have set donation preference for the programs.`
          : `Are you sure you want to Bulk Unpromote?.`
      );
    } else {
      setActionContent(
        `Are you sure to ${action.toLowerCase()} <strong>"${
          item.charityName
        }"</strong>?`
      );
    }
  };
  const confirm = () => {
    handleClose();
    dispatch(
      actionType === charityProgramConstants.BULK_UNPROMOTE
        ? charityProgramActions.operateDenyRequest({
            corporateId: checkedProgram?.id,
            socialId: checkedProgram?.socialId,
            programId: checkedProgram?.programId
          })
        : actionType === charityProgramConstants.UNPROMOTE
        ? charityProgramActions.operateDenyRequest({
            corporateId: selectedCorporate?.corporate?.id,
            socialId: selectedCharity?.organisationId,
            programId: selectedCharity?.id

            // corporateId: selectedCorporate?.corporate?.corporateId,
            // socialId: selectedProgram?.soicalId,
            // programId: selectedProgram?.charityId,
          })
        : actionType === charityProgramConstants.BULK_PROMOTE
        ? charityProgramActions.operateBulkSponsorRequest({
            corporateId: checkedProgram?.id,
            socialId: checkedProgram?.socialId,
            charityId: checkedProgram?.programId
          })
        : actionType === charityProgramConstants.PROMOTE &&
          charityProgramActions.operateSponsorRequest({
            corporateId: selectedCorporate?.corporate?.id,
            organisationId: selectedOrganization?.id,
            organisationName: selectedOrganization?.name,
            charityId: selectedCharity?.id,
            charityName: selectedCharity?.charityName,
            soicalName: selectedCharity?.soicalName

            // corporateId: selectedCorporate?.corporate?.corporateId,
            // socialId: selectedProgram?.soicalId,
            // charityId: selectedProgram?.charityId,
          })
    );
  };
  const handleClose = () => setOpen(false);
  const CheckBox = ({ name, value, tick, onCheck }) => {
    return (
      <label>
        <input
          name={name}
          type="checkbox"
          value={value}
          checked={tick || false}
          onChange={onCheck}
        />
        {value}
      </label>
    );
  };
  // const onCheckBoxChange = (checkName, isSelected) => {
  //   let isAllChecked = checkName === "all" && isSelected;
  //   let isAllUnChecked = checkName === "all" && !isSelected;
  //   const checked = isSelected;

  //   const allCheckBox = checkList?.map((color, index) => {
  //     if (isAllChecked || color.value === checkName) {
  //       return Object.assign({}, color, {
  //         checked,
  //       });
  //     } else if (isAllUnChecked) {
  //       return Object.assign({}, color, {
  //         checked: false,
  //       });
  //     }

  //     return color;
  //   });

  //   let isCheckedAll =
  //     allCheckBox?.findIndex((item) => item.checked === false) === -1 ||
  //     isAllChecked;

  //   setCheckList(allCheckBox);
  //   setIsSelectedAll(isCheckedAll);
  // };

  const setSelectedCharity = (charity) => {
    dispatch(selectedCharityActions.selectedCharity(charity));
    dispatch(selectedCharityTabActions.selectedTabType(tabType));
  };

  const checkBeforeUnpromote = async (action, item) => {
    setActionType(action);
    await dispatch(
      action === charityProgramConstants.BULK_UNPROMOTE
        ? charityProgramActions.checkBeforeBulkUnpromote({
            socialId: item?.socialId,
            programId: item?.programId,
            corporateId: isCorporatePortal ? item?.id : user?.corporateId
            // corporateId: isCorporatePortal
            //   ? item?.corporateId
            //   : user?.corporateId,
          })
        : action === charityProgramConstants.UNPROMOTE &&
            charityProgramActions.checkBeforeUnpromote({
              socialId: item?.soicalId,
              programId: item?.charityId,
              corporateId: isCorporatePortal
                ? selectedCorporate?.corporate?.id
                : user?.corporateId

              //  ? selectedCorporate?.corporate?.corporateId
              // : user?.corporateId,
            })
    );

    setSelectedProgram(item);
    setOpen(true);
  };
  useEffect(() => {
    if (actionType === charityProgramConstants.UNPROMOTE) {
      setOpen(true);
      handleOpen(charityProgramConstants.UNPROMOTE, selectedProgram);
    }
    ///For Bulk Unpromote
    if (actionType === charityProgramConstants.BULK_UNPROMOTE) {
      setOpen(true);
      handleOpen(charityProgramConstants.BULK_UNPROMOTE, checkedProgram);
    }
  }, [employeeCount]);

  useEffect(() => {
    setAllItems(items);
  }, [items]);
  // useEffect(() => {
  //   if (Object.keys(selectedProgram).length > 0) {
  //     handleOpen(charityProgramConstants.UNPROMOTE, selectedProgram);
  //   }
  // }, [selectedProgram]);
  // useEffect(() => {
  //   if (Object.keys(selectedProgram).length > 0) {
  //     handleOpen(charityProgramConstants.UNPROMOTE, selectedProgram);
  //   }
  // }, [selectedProgram?.employeeCount]);
  // useEffect(() => {
  //   setSelectedProgram(selectedProgram)
  // }, [selectedProgram?.employeeCount]);
  // useEffect(() => {
  //     setOpen(true);
  //     setActionType("Confirm");
  //     setActionTitle(`Confirm Confirmation`);
  //     setActionContent(
  //       `Are you sure you want to unpromote?. Doing this would remove all the donation preferences set for the programs by the employees. Total ${selectedProgram?.employeeCount} employees have set donation preference for the programs.`
  //     );
  // }, [selectedProgram?.employeeCount]);
  const addIconClass = (e) => {
    e.target.classList.remove("bi-heart", "custom-color");
    e.target.classList.add("bi-heart-fill", "red-color");
  };
  const removeIconClass = (e) => {
    e.target.classList.add("bi-heart", "custom-color");
    e.target.classList.remove("bi-heart-fill", "red-color");
  };
  const handleCheck = (e, items) => {
    const { name, checked } = e.target;
    const { programId } = checkedProgram;
    setChecked(checked);

    if (name === "allSelect" && checked) {
      let socialID = allItems?.map((val) => val?.soicalId);
      const singleSocialId = new Set(socialID);
      socialID = [...singleSocialId];
      setSocialIdd(socialID[0]);
      setCheckedProgram({
        programId: allItems?.map((val) => val.charityId),
        corporateId: selectedCorporate?.corporate?.id,
        socialId: socialID[0]
        //  corporateId: selectedCorporate?.corporate?.corporateId,
        // socialId: socialID[0],
      });
    } else if (name === "allSelect" && !checked) {
      setCheckedProgram({
        programId: [],
        corporateId: selectedCorporate?.corporate?.id,
        socialId: socialIdd
        //   corporateId: selectedCorporate?.corporate?.corporateId,
        // socialId: socialIdd,
      });
    } else if (checked) {
      setCheckedProgram({
        programId: [...programId, items?.charityId],
        corporateId: selectedCorporate?.corporate?.id,
        socialId: items?.soicalId
        // corporateId: selectedCorporate?.corporate?.corporateId,
        // socialId: items?.soicalId,
      });
    } else {
      setCheckedProgram({
        programId: programId?.filter((val) => val !== items?.charityId),
        corporateId: selectedCorporate?.corporate?.id,
        socialId: items?.soicalId
        // corporateId: selectedCorporate?.corporate?.corporateId,
        // socialId: items?.soicalId,
      });
    }
    // For all Check & Uncheck
    if (name === "allSelect") {
      let tempUser = allItems?.map((item) => {
        return { ...item, isChecked: checked };
      });
      setAllItems(tempUser);
    } else {
      let tempUser = allItems?.map((item) =>
        item.charityName === name ? { ...item, isChecked: checked } : item
      );
      setAllItems(tempUser);
    }
  };
  return (
    <>
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    {/* <th className="d-flex">
                      <div className="form-check me-2">
                        <input
                          type="checkbox"
                          name="allSelect"
                          checked={
                            allItems?.filter(
                              (charityProgram) =>
                                charityProgram?.isChecked !== true
                            ).length < 1
                          }
                          className="form-check-input"
                          onChange={(e) => handleCheck(e, allItems)}
                        />
                      </div>
                      {checked && tabType === charityProgramConstants.SPONSOR && (
                        <Tooltip title={charityProgramConstants.UNPROMOTE}>
                          <Link
                            to="#"
                            onClick={() =>
                              checkBeforeUnpromote(
                                charityProgramConstants.BULK_UNPROMOTE,
                                checkedProgram
                              )
                            }
                          >
                            <i
                              className="bi-heart-fill fs-6 red-color mr-1"
                              onMouseOver={(e) => removeIconClass(e)}
                              onMouseOut={(e) => addIconClass(e)}
                            ></i>
                          </Link>
                        </Tooltip>
                      )}
                      {checked && tabType === charityProgramConstants.OTHERS && (
                        <Tooltip title={charityProgramConstants.PROMOTE}>
                          <Link
                            to="#"
                            onClick={() =>
                              handleOpen(
                                charityProgramConstants.BULK_PROMOTE,
                                checkedProgram
                              )
                            }
                          >
                            <i
                              className="bi-heart fs-6 custom-color"
                              onMouseOver={(e) => addIconClass(e)}
                              onMouseOut={(e) => removeIconClass(e)}
                            ></i>
                          </Link>
                        </Tooltip>
                      )}
                    </th> */}
                    <th className="ant-table-cell">Program</th>
                    <th className="ant-table-cell">Organization</th>
                    <th className="ant-table-cell">Category</th>
                    <th className="ant-table-cell text-center">
                      Unit Price (
                      {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)})
                    </th>
                    <th className="ant-table-cell text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {allItems?.length > 0 ? (
                    allItems?.map((charityProgram, index) => (
                      <tr
                        key={index + 1}
                        className="ant-table-row ant-table-row-level-0"
                      >
                        {/* <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={charityProgram?.charityName}
                              checked={charityProgram?.isChecked || false}
                              onChange={(e) => handleCheck(e, charityProgram)}
                            />
                          </div>
                        </td> */}

                        <td className="ant-table-cell">
                          <Tooltip title={charityProgram?.charityName}>
                            <Link
                              to={{
                                pathname: `/social-organizations/${urlSlug(
                                  selectedOrganization?.name
                                )}/${urlSlug(
                                  charityProgram?.charityName ||
                                    charityProgram?.name
                                )}`,
                                programName:
                                  charityProgram?.charityName ||
                                  charityProgram?.name
                              }}
                              onClick={() => setCharity(charityProgram)}
                            >
                              <span className="ant-typography font-weight-bold custom-color">
                                {charityProgram?.name?.length > 35
                                  ? charityProgram?.name.substring(0, 32) +
                                    "..."
                                  : charityProgram?.name}
                                {charityProgram?.charityName?.length > 35
                                  ? charityProgram?.charityName.substring(
                                      0,
                                      32
                                    ) + "..."
                                  : charityProgram?.charityName}
                              </span>
                            </Link>
                          </Tooltip>
                        </td>
                        <td className="ant-table-cell">
                          {charityProgram?.soicalName}
                          {charityProgram?.organisationName}
                        </td>
                        <td className="ant-table-cell">
                          {charityProgram?.category}
                        </td>
                        <td className="ant-table-cell text-center">
                          {charityProgram?.unitPrice?.toLocaleString()}
                        </td>
                        <td className="ant-table-cell text-center">
                          {isCorporatePortal &&
                            tabType === charityProgramConstants.SPONSOR && (
                              <Tooltip
                                title={charityProgramConstants.UNPROMOTE}
                              >
                                <Link
                                  to="#"
                                  onClick={() =>
                                    checkBeforeUnpromote(
                                      charityProgramConstants.UNPROMOTE,
                                      charityProgram
                                    )
                                  }
                                >
                                  <i
                                    className="bi-heart-fill fs-6 red-color mr-1"
                                    onMouseOver={(e) => removeIconClass(e)}
                                    onMouseOut={(e) => addIconClass(e)}
                                  ></i>
                                </Link>
                              </Tooltip>
                            )}
                          {isCorporatePortal &&
                            tabType === charityProgramConstants.OTHERS && (
                              <Tooltip title={charityProgramConstants.PROMOTE}>
                                <Link
                                  to="#"
                                  onClick={() =>
                                    handleOpen(
                                      charityProgramConstants.PROMOTE,
                                      charityProgram
                                    )
                                  }
                                >
                                  <i
                                    className="bi-heart fs-6 custom-color"
                                    onMouseOver={(e) => addIconClass(e)}
                                    onMouseOut={(e) => removeIconClass(e)}
                                  ></i>
                                </Link>
                              </Tooltip>
                            )}
                          {/* {isEmployeePortal && ( */}
                          {isEmployeePortal && charityProgram?.donated && (
                            <Tooltip title="Edit">
                              <Link
                                to="#"
                                onClick={() => openNav(charityProgram)}
                              >
                                <i className="bi-pencil-square fs-5 custom-color"></i>
                              </Link>
                            </Tooltip>
                          )}
                          {(isCorporatePortal ||
                            (isEmployeePortal && !charityProgram?.donated) ||
                            (isIndividualPortal && !charityProgram?.donated) ||
                            (isOthersPortal && !charityProgram?.donated)) && (
                            <button
                              type="submit"
                              className="btn btn-sm mb-2"
                              onClick={() => openNav(charityProgram)}
                            >
                              <Tooltip
                                title={`${
                                  isEmployeePortal &&
                                  tabType === charityProgramConstants.SPONSOR
                                    ? "Add to donation preference"
                                    : "Donate"
                                }`}
                              >
                                <img
                                  src="/assets/img/donate.png"
                                  alt="Donate"
                                  onMouseEnter={(event) =>
                                    (event.target.src =
                                      "/assets/img/donate-fill-red.png")
                                  }
                                  onMouseOut={(event) =>
                                    (event.target.src =
                                      "/assets/img/donate.png")
                                  }
                                  height={25}
                                />
                              </Tooltip>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        {tabType === charityProgramConstants.SPONSOR
                          ? ReactHtmlParser(
                              isCorporatePortal
                                ? "No programs are promoted yet"
                                : isIndividualPortal
                                ? "No programs found"
                                : "No programs are promoted by your corporate.<br/>However, you can still make donation individually by browsing the programs in other category."
                            )
                          : "No programs found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
        </div>
      </div>
    </>
  );
};
export default ListCharityPrograms;
