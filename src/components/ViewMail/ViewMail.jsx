import React from "react";
import "./ViewMail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import makeBlockie from "ethereum-blockies-base64";
import {
  faTrash,
  faReply,
  faShare,
  faWallet,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";
import ReadonlyEditor from "../ReadonlyEditor";
import { StateContext, ActionContext } from "../../hook";
import { shortenAddress } from "../../utils";

function ViewMail() {
  const { selectMail } = React.useContext(ActionContext);
  const { selectedMail } = React.useContext(StateContext);
  const [showReply, setShowReply] = React.useState(false);
  return (
    <div className="view-mail">
      <div className="view-mail-header">
        <h2 className="view-mail-header-subject">{selectedMail.subject}</h2>
        <span
          className="view-mail-header-close"
          onClick={(e) => selectMail(null)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className="view-mail-body-container">
        {/* <div className="view-mail-body-item">
          <div className="view-mail-user-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="view-mail-body-content-container">
            <div className="view-mail-body-content-header">
              <span className="view-mail-body-content-user">Test Name</span>
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
              <span className="view-mail-body-content-user">Test Name</span>
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
              <span className="view-mail-body-content-user">Test Name</span>
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
        </div> */}
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
              <span className="view-mail-body-content-user">
                <span className="view-mail-body-content-user-name">
                  {shortenAddress(selectedMail.from)}
                </span>
                <span className="view-mail-body-content-user-wallet">
                  <span className="view-mail-body-content-wallet-icon">
                    <FontAwesomeIcon icon={faWallet} />
                  </span>
                  <span className="view-mail-body-content-wallet-amount">
                    {Number.parseFloat(selectedMail.tx_qty).toFixed(2)} AR
                  </span>
                </span>
              </span>
              <span className="view-mail-body-content-time">Time</span>
              <span className="view-mail-body-content-trash">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span className="view-mail-body-content-star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="view-mail-body-content">
              <ReadonlyEditor content={selectedMail.body}></ReadonlyEditor>
            </div>
            <div className="view-mail-body-action-container">
              <div
                className="view-mail-body-action-button"
                onClick={(e) => setShowReply(true)}
              >
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
        {showReply && (
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
                <span className="view-mail-body-content-user-reply">
                  Test Name
                </span>
              </div>
              <div className="reply-body-amount">
                <input
                  type="number"
                  placeholder="0 Ar"
                  className="reply-body-amount-input"
                />
              </div>
              <div className="view-mail-body-content-reply-container">
                <MailEditor />
              </div>
              <div className="compose-body-buttons-container">
                <div className="send-button-container">
                  <button type="button" className="send-mail-button">
                    Send
                  </button>
                  <span
                    className="reply-mail-trash"
                    onClick={(e) => setShowReply(false)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewMail;
