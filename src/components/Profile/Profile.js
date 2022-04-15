import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tabs,
  Tab,
} from "react-bootstrap";

const Profile = () => {
  const user = useSelector((state) => state.authentication.user);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="profile-img">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt="Profile Image"
            />
            <div className="file btn btn-lg btn-primary">
              Change Photo
              <input type="file" name="file" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile-head">
            <h5>Kshiti Ghelani</h5>
            <h6>Web Developer and Designer</h6>
            <p className="proile-rating">
              RANKINGS : <span>8/10</span>
            </p>
          </div>
        </div>
        <div className="col-md-2 text-right">
          <Link title="Edit Profile">
            <span className="bi-pencil fs-5 ml-2 cursor-pointer"></span>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="profile-work">
            <p>SKILLS</p>
            <a href="">Web Designer</a>
            <br />
            <a href="">Web Developer</a>
            <br />
            <a href="">WordPress</a>
            <br />
            <a href="">WooCommerce</a>
            <br />
            <a href="">PHP, .Net</a>
            <br />
          </div>
        </div>
        <div className="col-md-8 profile-tab">
          <Tabs defaultActiveKey="About">
            <Tab eventKey="About" title="About">
              <div className="row">
                <div className="col-md-6">
                  <label>Employee Id</label>
                </div>
                <div className="col-md-6">
                  <p>EMP001</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Name</label>
                </div>
                <div className="col-md-6">
                  <p>Kshiti Ghelani</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Email</label>
                </div>
                <div className="col-md-6">
                  <p>kshitighelani@gmail.com</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Phone</label>
                </div>
                <div className="col-md-6">
                  <p>123 456 7890</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Profession</label>
                </div>
                <div className="col-md-6">
                  <p>Web Developer and Designer</p>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Timeline">
              <div className="row">
                <div className="col-md-6">
                  <label>Experience</label>
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Hourly Rate</label>
                </div>
                <div className="col-md-6">
                  <p>10$/hr</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Total Projects</label>
                </div>
                <div className="col-md-6">
                  <p>230</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>English Level</label>
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Availability</label>
                </div>
                <div className="col-md-6">
                  <p>6 months</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label>Your Bio</label>
                  <br />
                  <p>Your detail description</p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default Profile;
