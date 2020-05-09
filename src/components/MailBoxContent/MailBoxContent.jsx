import React from "react";
import "./MailBoxContent.scss";
import makeBlockie from "ethereum-blockies-base64";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

function MailBoxContent() {
  return (
    <div className="mailbox-content">
      <div className="mail-item">
        <div className="select-mail-container">
          <input type="checkbox" className="filled" />
        </div>
        <div className="user-profile-icon-container">
          <img
            src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
            alt="address-blockie"
            className="user-profile-blockie-icon"
          />
        </div>
        <div className="mail-content-container">
          <div className="mail-user-container">
            <span className="mail-user-name-container">
              <span className="mail-user-name">Mitra</span>
              <span className="mail-user-wallet">
                <FontAwesomeIcon icon={faWallet} />
              </span>
            </span>
            <span className="mail-time">10 mins</span>
            <span className="mail-trash">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
          <div className="mail-subject">Integration Testing</div>
          <div className="mail-body-container">
            <span className="mail-body">
              Hi there! This is an integration test for blockie that will
              automatically be run when the blockie is loaded...
            </span>
            <span className="mail-starred">
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        </div>
      </div>
      <div className="mail-item">
        <div className="select-mail-container">
          <input type="checkbox" className="filled" />
        </div>
        <div className="user-profile-icon-container">
          <img
            src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
            alt="address-blockie"
            className="user-profile-blockie-icon"
          />
        </div>
        <div className="mail-content-container">
          <div className="mail-user-container">
            <span className="mail-user-name-container">
              <span className="mail-user-name">Mitra</span>
              <span className="mail-user-wallet">
                <FontAwesomeIcon icon={faWallet} />
              </span>
            </span>
            <span className="mail-time">10 mins</span>
            <span className="mail-trash">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
          <div className="mail-subject">Integration Testing</div>
          <div className="mail-body-container">
            <span className="mail-body">
              Hi there! This is an integration test for blockie that will
              automatically be run when the blockie is loaded...
            </span>
            <span className="mail-starred">
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        </div>
      </div>
      <div className="mail-item">
        <div className="select-mail-container">
          <input type="checkbox" className="filled" />
        </div>
        <div className="user-profile-icon-container">
          <img
            src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
            alt="address-blockie"
            className="user-profile-blockie-icon"
          />
        </div>
        <div className="mail-content-container">
          <div className="mail-user-container">
            <span className="mail-user-name-container">
              <span className="mail-user-name">Mitra</span>
              <span className="mail-user-wallet">
                <FontAwesomeIcon icon={faWallet} />
              </span>
            </span>
            <span className="mail-time">10 mins</span>
            <span className="mail-trash">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
          <div className="mail-subject">Integration Testing</div>
          <div className="mail-body-container">
            <span className="mail-body">
              Hi there! This is an integration test for blockie that will
              automatically be run when the blockie is loaded...
            </span>
            <span className="mail-starred">
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailBoxContent;
