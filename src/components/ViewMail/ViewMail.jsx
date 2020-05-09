import React from "react";
import "./ViewMail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import makeBlockie from "ethereum-blockies-base64";
import { faTrash, faReply, faShare } from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";

function ViewMail() {
  return (
    <div className="view-mail">
      <div className="view-mail-header">
        <h2 className="view-mail-header-subject">Integration Testing</h2>
      </div>
      <div className="view-mail-body-container">
        <div className="view-mail-body-item">
          <div className="view-mail-user-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="view-mail-body-content-container">
            <div className="view-mail-body-content-header">
              <span className="view-mail-body-content-user">Mitra</span>
              <span className="view-mail-body-content-time">Time</span>
              <span className="view-mail-body-content-star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="view-mail-body-content">
              Hi there! This is an integration test for blockie that will
              automatically be run when the blockie is loaded...
            </div>
          </div>
        </div>
        <div className="view-mail-body-item">
          <div className="view-mail-user-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="view-mail-body-content-container">
            <div className="view-mail-body-content-header">
              <span className="view-mail-body-content-user">Mitra</span>
              <span className="view-mail-body-content-time">Time</span>
              <span className="view-mail-body-content-star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="view-mail-body-content">
              Hi there! This is an integration test for blockie that will
              automatically be run when the blockie is loaded...
            </div>
          </div>
        </div>
        <div className="view-mail-body-item">
          <div className="view-mail-user-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="view-mail-body-content-container">
            <div className="view-mail-body-content-header">
              <span className="view-mail-body-content-user">Mitra</span>
              <span className="view-mail-body-content-time">Time</span>
              <span className="view-mail-body-content-star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="view-mail-body-content">
              Hi there! This is an integration test for blockie that will
              automatically be run when the blockie is loaded...
            </div>
          </div>
        </div>
        <div className="view-mail-body-item">
          <div className="view-mail-user-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="view-mail-body-content-container">
            <div className="view-mail-body-content-header">
              <span className="view-mail-body-content-user">Mitra</span>
              <span className="view-mail-body-content-time">Time</span>
              <span className="view-mail-body-content-trash">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span className="view-mail-body-content-star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="view-mail-body-content">
              Hi All, I just learnt today is my last day at Quaero; I was
              thinking I have another week and have enough time to personally
              talk to you and say goodbye. Wow! this company never stops
              surprising :P I just wanted to take a moment to say it had been a
              great 4 years of journey at Quaero. It was a roller coaster ride;
              definitely an enjoyable one.One thing for sure this has made me a
              more confident and better person. It was a pleasure working with
              you all.I have thoroughly enjoyed my time with this company and I
              am grateful to have met each of you.I will deeply miss working
              with each of you. I have thoroughly enjoyed breakout sessions and
              our "after work parties" at office. I will cherish all beautiful
              moments spent here Thank you again, and best of luck in all your
              future endeavors! My personal email id is :
              manishaa.singh1501@gmail.com contact number: +91-9739979759 Stay
              in Touch DUAAO ME YAAD RAKHNA
            </div>
            <div className="view-mail-body-action-container">
              <div className="view-mail-body-action-button">
                <span className="view-mail-body-action-icon">
                  <FontAwesomeIcon icon={faReply} />
                </span>
                <span>Reply</span>
              </div>
              <div className="view-mail-body-action-button">
                <span className="view-mail-body-action-icon">
                  <FontAwesomeIcon icon={faShare} />
                </span>
                <span>Forward</span>
              </div>
            </div>
          </div>
        </div>
        <div className="view-mail-body-item">
          <div className="view-mail-user-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="view-mail-body-content-container">
            <div className="view-mail-body-content-header">
              <span className="view-mail-body-content-reply">
                <FontAwesomeIcon icon={faReply} />
              </span>
              <span className="view-mail-body-content-user-reply">Mitra</span>
            </div>
            <div className="view-mail-body-content-reply-container">
              <MailEditor />
            </div>
            <div className="compose-body-buttons-container">
              <div className="send-button-container">
                <button type="button" className="send-mail-button">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMail;
