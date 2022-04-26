import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import charityPrograms from "../../config/charityPrograms.json";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Donate from "./Donate";
import "./../../assets/css/charityProgramsList.scss";
import { donationPreferenceConstants } from "./../../constants";
import { charityProgramConstants } from "./../../constants";
import { charityProgramActions } from "./../../actions";
import ListCharityPrograms from "./ListCharityPrograms";

const CharityPrograms = () => {
  let history = useHistory();
  const charityPrograms = useSelector((state) => state.charityPrograms);
  // let selectedCharity = useState({});
  const [selectedCharity, setSelectedCharity] = useState();
  const [tabType, setTabType] = useState(charityProgramConstants.SPONSOR);
  const user = useSelector((state) => state.employee.user);
  const [activeFrequenctTab, setActiveFrequenctTab] = useState(
    donationPreferenceConstants.ONCE
  );
  const dispatch = useDispatch();
  const openNav = () => {
    document.getElementById("sidepanel").classList.add("is-open");
  };
  const closeNav = () => {
    document.getElementById("sidepanel").classList.remove("is-open");
  };
  useEffect(() => {
    dispatch(charityProgramActions.getCharityPrograms());
  }, []);
  const setCharity = (charity) => {
    setSelectedCharity(charity);
  };
  const setType = (type) => {
    setTabType(type);
    closeNav();
  };
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Charity Programs</h4>
        </div>
      </div>
      <ul className="nav nav-tabs charity-programs-tab">
        <li className="nav-item">
          <button
            className="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#sponsored"
            onClick={() => setType(charityProgramConstants.SPONSOR)}
          >
            <span>Sponsored</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#others"
            onClick={() => setType(charityProgramConstants.OTHER)}
          >
            <span>Others</span>
          </button>
        </li>
      </ul>
      <div className="tab-content p-0">
        {charityPrograms.loading && <em>Loading charity programs...</em>}
        <div className="tab-pane fade show active" id="sponsored">
          {charityPrograms.items && (
            <ListCharityPrograms
              items={charityPrograms?.items?.sponser}
              setCharity={setCharity}
            />
          )}
        </div>
        <div className="tab-pane fade show" id="others">
          {charityPrograms.items && (
            <ListCharityPrograms
              items={charityPrograms?.items?.other}
              setCharity={setCharity}
            />
          )}
        </div>
      </div>
      {
        <div id="sidepanel" className="sidepanel">
          <div className="donate-header">
            <div className="row">
              <div className="col-md-10 p-2">
                <span className="pl-3">
                  You can make a big difference to their lives?
                </span>
              </div>
              <div className="col-md-2">
                <a
                  href="javascript:void(0)"
                  className="closebtn"
                  onClick={closeNav}
                >
                  ×
                </a>
              </div>
            </div>
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#give-once"
                  onClick={() =>
                    setActiveFrequenctTab(donationPreferenceConstants.ONCE)
                  }
                >
                  <span>Give Once</span>
                  {activeFrequenctTab === donationPreferenceConstants.ONCE && (
                    <span className="bi-check-circle-fill fs-6 ml-2 text-success"></span>
                  )}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#give-monthly"
                  onClick={() =>
                    setActiveFrequenctTab(donationPreferenceConstants.MONTHLY)
                  }
                >
                  <span>Give Monthly</span>
                  {activeFrequenctTab ===
                    donationPreferenceConstants.MONTHLY && (
                    <span className="bi-check-circle-fill fs-6 ml-2 text-success"></span>
                  )}
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content pt-2">
            <div className="tab-pane fade show active give-once" id="give-once">
              <Donate
                frequency={donationPreferenceConstants.ONCE}
                selectedCharity={selectedCharity}
                tabType={tabType}
              />
            </div>
            <div className="tab-pane fade show give-monthly" id="give-monthly">
              <Donate
                frequency={donationPreferenceConstants.MONTHLY}
                selectedCharity={selectedCharity}
                tabType={tabType}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default CharityPrograms;
