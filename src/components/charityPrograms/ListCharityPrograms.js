import React, { useState, useEffect } from "react";
import "./../../assets/css/charityProgramsList.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  donationPreferenceConstants,
  viewPortalConstants,
  charityProgramConstants,
} from "../../constants";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import {
  charityProgramActions,
  selectedCharityActions,
  selectedCharityTabActions,
} from "../../actions";
import urlSlug from "url-slug";
// import DonateHeader from "./../CharityPrograms/DonateHeader";
// import Donate from "./../CharityPrograms/Donate";
// import { handleInputChange } from "react-select/dist/declarations/src/utils";

const ListCharityPrograms = ({ items, setCharity, tabType }) => {
  // console.log(items, tabType);

  const dispatch = useDispatch();
  const openNav = (charity) => {
    // document.getElementById("sidepanel").classList.add("is-open");
    setCharity(charity);
  };
  // const charityPrograms = useSelector((state) => state?.charityPrograms?.items);

  const employeeCount = useSelector(
    (state) => state?.charityPrograms?.employeeCount
  );
  const selectedCharity = useSelector(
    (state) => state?.selectedCharity?.charity
  );
  const currentPortal = useSelector((state) => state.currentView);
  // const beforeUnrpomoteMsg = useSelector(
  //   (state) => state?.charityPrograms?.checkBeforeUnpromoteMsg
  // );
  const [open, setOpen] = useState(false);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  // console.log(isCorporatePortal);//true
  const isEmployeePortal =
    currentPortal?.currentView === viewPortalConstants.EMPLOYEE_PORTAL;
  const isIndividualPortal =
    currentPortal?.currentView === viewPortalConstants.INDIVIDUAL_PORTAL;
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  // console.log(selectedCorporate);
  const user = useSelector((state) => state.employee.user);
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(Object);
  // const [socialId, setSocialId] = useState();
  const [checked, setChecked] = useState();
  const [checkedProgram, setCheckedProgram] = useState({
    programId: [],
    corporateId: "",
    socialId: "",
  });

  // const [isSelectedAll, setIsSelectedAll] = useState(false);
  // const [checkList, setCheckList] = useState();
  const [allItems, setAllItems] = useState([]);

  const handleOpen = (action, item) => {
    console.log(action, item, "aaaaaaaaaaaaaaaaaaaaa");
    setOpen(true);
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
  // console.log(socialId);
  const confirm = () => {
    console.log("selectedProgram >>>>>>>>>>>>>>>>", selectedProgram);
    console.log("selectedCharity >>>>>>>>>>>>>>>>", selectedCharity);
    handleClose();
    dispatch(
      actionType === charityProgramConstants.BULK_UNPROMOTE
        ? charityProgramActions.operateDenyRequest({
            corporateId: checkedProgram?.corporateId,
            socialId: checkedProgram?.socialId,
            programId: checkedProgram?.programId,
          })
        : actionType === charityProgramConstants.UNPROMOTE
        ? charityProgramActions.operateDenyRequest({
            corporateId: selectedCorporate?.corporate?.corporateId,
            socialId: selectedProgram?.soicalId,
            programId: selectedProgram?.charityId,
          })
        : charityProgramActions.operateSponsorRequest({
            corporateId: selectedCorporate?.corporate?.corporateId,
            socialId: selectedProgram?.soicalId,
            charityId: selectedProgram?.charityId,
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
    console.log(action, item);
    setActionType(action);

    await dispatch(
      action === charityProgramConstants.BULK_UNPROMOTE
        ? charityProgramActions.checkBeforeBulkUnpromote({
            socialId: item?.socialId,
            programId: item?.programId,
            corporateId: isCorporatePortal
              ? item?.corporateId
              : user?.corporateId,
          })
        : action === charityProgramConstants.UNPROMOTE &&
            charityProgramActions.checkBeforeUnpromote({
              socialId: item?.soicalId,
              programId: item?.charityId,
              corporateId: isCorporatePortal
                ? selectedCorporate?.corporate?.corporateId
                : user?.corporateId,
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
  //   console.log(
  //     "beforeUnrpomoteMsg >>>>>>>>>>>>>>>",
  //     selectedProgram,
  //     Object.keys(selectedProgram).length > 0,
  //     selectedProgram?.employeeCount
  //   );
  //   if (Object.keys(selectedProgram).length > 0) {
  //     handleOpen(charityProgramConstants.UNPROMOTE, selectedProgram);
  //   }
  // }, [selectedProgram]);
  // useEffect(() => {
  //   console.log(
  //     "bssssssssssssssssssss >>>>>>>>>>>>>>>",
  //     selectedProgram,
  //     Object.keys(selectedProgram).length > 0,
  //     selectedProgram?.employeeCount
  //   );
  //   if (Object.keys(selectedProgram).length > 0) {
  //     handleOpen(charityProgramConstants.UNPROMOTE, selectedProgram);
  //   }
  // }, [selectedProgram?.employeeCount]);
  // useEffect(() => {
  //   console.log("beforeUnrpomoteMsg >>>>>>>>>>>>>>>", selectedProgram, Object.keys(selectedProgram).length > 0, selectedProgram?.employeeCount);
  //   setSelectedProgram(selectedProgram)
  // }, [selectedProgram?.employeeCount]);
  // useEffect(() => {
  //   console.log("beforeUnrpomoteMsg >>>>>>>>> ssssssssssssss >>>>>>", selectedProgram);
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
  const handleCheck = (e, charityProgram) => {
    const { name, value, checked } = e.target;
    console.log(name, value, checked);
    const { programId } = checkedProgram;
    let socialId = charityProgram?.soicalId;
    setChecked(checked);

    if (checked) {
      setCheckedProgram({
        programId: [...programId, charityProgram?.charityId],
        corporateId: selectedCorporate?.corporate?.corporateId,
        socialId: socialId,
      });
    } else {
      setCheckedProgram({
        programId: programId?.filter(
          (val) => val !== charityProgram?.charityId
        ),
        corporateId: selectedCorporate?.corporate?.corporateId,
        socialId: socialId,
      });
    }

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

  console.log(checkedProgram);

  return (
    <>
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="d-flex">
                      <div className="form-check me-2">
                        <input
                          type="checkbox"
                          name="allSelect"
                          value={allItems?.map((val) => val?.charityId)}
                          checked={
                            allItems?.filter(
                              (charityProgram) =>
                                charityProgram?.isChecked !== true
                            ).length < 1
                          }
                          className="form-check-input"
                          onChange={handleCheck}
                        />
                      </div>
                      {checked && (
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
                    </th>
                    <th className="ant-table-cell">Program manas</th>
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
                        <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={charityProgram?.charityName}
                              // value={[charityProgram]}
                              checked={charityProgram?.isChecked || false}
                              onChange={(e) => handleCheck(e, charityProgram)}
                            />
                          </div>
                        </td>

                        <td className="ant-table-cell">
                          <Tooltip title={charityProgram?.charityName}>
                            <Link
                              to={{
                                pathname: `/social-organizations/programs/${urlSlug(
                                  charityProgram?.charityName
                                )}`,
                                programName: charityProgram?.charityName,
                              }}
                              onClick={() => setSelectedCharity(charityProgram)}
                            >
                              <span className="ant-typography font-weight-bold custom-color">
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
                                  onClick={
                                    () =>
                                      checkBeforeUnpromote(
                                        charityProgramConstants.UNPROMOTE,
                                        charityProgram
                                      )
                                    // handleOpen(
                                    //   charityProgramConstants.UNPROMOTE,
                                    //   charityProgram
                                    // )
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
                            (isIndividualPortal &&
                              !charityProgram?.donated)) && (
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
                                  alt="donate"
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
              {/* {items?.length === 0 && (
                <div className="row">
                  <div className="col-md-4 card p-0">
                    <div className="img-sec">
                      <img
                        src="https://dkprodimages.gumlet.io/campaign/cover/Support-Mark1283685362.jpg"
                        alt="image"
                      />
                    </div>
                    <div className="description">
                      <h4>
                        This 63 Year Old Is Working Relentlessly To Feed Warm
                        Meals To Senior Citizens
                      </h4>
                    </div>
                    <div className="founder">
                      <span className="founder-short">RL</span>
                      <span>By Rahul</span>
                    </div>
                    <div class="campaign">
                      <div class="campaign-heading">
                        <span class="campaign-raised">₹10,75,010</span>{" "}
                        <span>raised out of ₹46,20,000</span>
                      </div>
                      <div
                        class="dk-progress-bar_backgroundBar__25DwK"
                        title="23% Raised"
                      >
                        <div class="dk-progress-bar_progressBar__3NzxJ">
                          <div class="dk-progress-bar_animatedProgressBar__3NDGy"></div>
                        </div>
                      </div>
                      <div class="campaign-card_statsWrapper__eFgvz">
                        <div class="campaign-card_daysLeft__JraZG">
                          <img
                            src=""
                            width="16"
                            loading="lazy"
                            class="gm-observing gm-observing-cb"
                          />{" "}
                          29 days left
                        </div>
                        <div class="campaign-card_stats__3_5AK">
                          <img src="" />
                          &nbsp;&nbsp;1,108 Backers
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 card p-0">dddd</div>
                  <div className="col-md-4 card p-0">vvv</div>
                </div>
              )} */}
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
