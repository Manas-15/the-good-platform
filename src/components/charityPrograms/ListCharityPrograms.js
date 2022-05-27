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
} from "./../../actions";
import urlSlug from "url-slug";

const ListCharityPrograms = ({ items, setCharity, tabType }) => {
  const dispatch = useDispatch();
  const openNav = (charity) => {
    document.getElementById("sidepanel").classList.add("is-open");
    setCharity(charity);
  };
  const currentPortal = useSelector((state) => state.currentView);
  const beforeUnrpomoteMsg = useSelector(
    (state) => state?.charityPrograms?.checkBeforeUnpromoteMsg
  );
  const [open, setOpen] = useState(false);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const [actionType, setActionType] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionContent, setActionContent] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(Object);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [checkList, setCheckList] = useState();

  const handleOpen = (action, item) => {
    setOpen(true);
    setActionType(action);
    setSelectedProgram(item);
    setActionTitle(`${action} Confirmation`);

    if (action === charityProgramConstants.UNPROMOTE) {
      setActionContent(
        `Are you sure want to unpromote?. Doing this would remove all the donation preferences set for the programs by the employees. Total 15 employees have set donation preference for the programs.`
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
      actionType === charityProgramConstants.UNPROMOTE
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
  const onCheckBoxChange = (checkName, isSelected) => {
    let isAllChecked = checkName === "all" && isSelected;
    let isAllUnChecked = checkName === "all" && !isSelected;
    const checked = isSelected;

    const allCheckBox = checkList?.map((color, index) => {
      if (isAllChecked || color.value === checkName) {
        return Object.assign({}, color, {
          checked,
        });
      } else if (isAllUnChecked) {
        return Object.assign({}, color, {
          checked: false,
        });
      }

      return color;
    });

    let isCheckedAll =
      allCheckBox?.findIndex((item) => item.checked === false) === -1 ||
      isAllChecked;

    setCheckList(allCheckBox);
    setIsSelectedAll(isCheckedAll);
  };
  const setSelectedCharity = (charity) => {
    dispatch(selectedCharityActions.selectedCharity(charity));
    dispatch(selectedCharityTabActions.selectedTabType(tabType));
  };
  const checkBeforeUnpromote = (item) => {
    setSelectedProgram(item);
    dispatch(
      charityProgramActions.checkBeforeUnpromote({
        corporateId: selectedCorporate?.corporate?.corporateId,
        socialId: item?.soicalId,
        programId: item?.charityId,
      })
    );
  };

  useEffect(() => {
    console.log("beforeUnrpomoteMsg >>>>>>>>>>>>>>>", !selectedProgram);
    if (selectedProgram?.charityId && !selectedProgram?.unpromoteMsg) {
      console.log(
        "beforeUnrpomoteMsg >>>>>>>> 2222222222222 >>>>>>>",
        selectedProgram?.unpromoteMsg
      );
      handleOpen(charityProgramConstants.UNPROMOTE, selectedProgram);
    }
  }, [selectedProgram]);
  return (
    <>
      <div className="ant-row">
        <div className="ant-col ant-col-24 mt-2">
          <div className="ant-table-wrapper">
            <div className="ant-table">
              <table>
                <thead className="ant-table-thead">
                  <tr>
                    <th>
                      {/* <CheckBox
                        name="select-all"
                        tick={isSelectedAll}
                        onCheck={(e) =>
                          onCheckBoxChange("all", e.target.checked)
                        }
                      /> */}
                    </th>
                    <th className="ant-table-cell">Sr No.</th>
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
                  {items?.length > 0 ? (
                    items.map((charityProgram, index) => (
                      <tr
                        key={index + 1}
                        className="ant-table-row ant-table-row-level-0"
                      >
                        <td>
                          {/* <CheckBox
                            name="select-all"
                            tick={isSelectedAll || null}
                            onCheck={(e) =>
                              onCheckBoxChange("", e.target.checked)
                            }
                          /> */}
                        </td>
                        <td className="ant-table-cell">{index + 1}</td>
                        <td className="ant-table-cell">
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
                              {charityProgram?.charityName}
                            </span>
                          </Link>
                        </td>
                        <td className="ant-table-cell">
                          {charityProgram?.soicalName}
                        </td>
                        <td className="ant-table-cell">
                          {charityProgram?.category}
                        </td>
                        <td className="ant-table-cell text-center">
                          {charityProgram?.unitPrice.toLocaleString()}
                        </td>
                        <td className="ant-table-cell text-center">
                          {isCorporatePortal &&
                            tabType === charityProgramConstants.SPONSOR && (
                              <Tooltip
                                title={charityProgramConstants.UNPROMOTE}
                              >
                                <Link
                                  onClick={() =>
                                    checkBeforeUnpromote(charityProgram)
                                  }
                                >
                                  <i className="bi-heart-fill fs-6 custom-color mr-1"></i>
                                </Link>
                              </Tooltip>
                            )}
                          {isCorporatePortal &&
                            tabType === charityProgramConstants.OTHER && (
                              <Tooltip title={charityProgramConstants.PROMOTE}>
                                <Link
                                  onClick={() =>
                                    handleOpen(
                                      charityProgramConstants.PROMOTE,
                                      charityProgram
                                    )
                                  }
                                >
                                  <i className="bi-heart fs-6 custom-color"></i>
                                </Link>
                              </Tooltip>
                            )}
                          <button
                            type="submit"
                            className="btn btn-sm mb-2"
                            onClick={() => openNav(charityProgram)}
                          >
                            <Tooltip title="Donate">
                              <img
                                src="/assets/img/donate.png"
                                alt="dontae"
                                onMouseEnter={(event) =>
                                  (event.target.src =
                                    "/assets/img/donate-fill-red.png")
                                }
                                onMouseOut={(event) =>
                                  (event.target.src = "/assets/img/donate.png")
                                }
                                height={25}
                              />
                            </Tooltip>
                          </button>
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
