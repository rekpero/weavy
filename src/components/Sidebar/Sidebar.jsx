import React from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faStar, faFile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ActionContext, StateContext } from "../../hook";

function Sidebar() {
  const { toggleComposeMail, selectMenu } = React.useContext(ActionContext);
  const { selectedMenu, backupDraftMails, backupSentMails, backupStarredMails, backupMails } = React.useContext(StateContext);

  return (
    <div className="sidebar">
      <button
        className="mail-compose-container"
        onClick={(e) => toggleComposeMail(true)}
      >
        <span className="compose-icon">+</span>
        <span className="compose-title">Compose</span>
      </button>
      <div
        className={`sidebar-item ${selectedMenu === "inbox" ? "selected" : ""}`}
        onClick={(e) => selectMenu("inbox", backupMails, backupDraftMails, backupSentMails, backupStarredMails)}
      >
        <span className="sidebar-item-main">
          <span>
            <FontAwesomeIcon
              className="sidebar-item-icon"
              icon={faInbox}
            ></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Inbox</span>
        </span>
        {/* <span className="sidebar-item-number">1</span> */}
      </div>
      <div
        className={`sidebar-item ${
          selectedMenu === "starred" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("starred", backupMails, backupDraftMails, backupSentMails, backupStarredMails)}
      >
        <span className="sidebar-item-main">
          <span>
            <FontAwesomeIcon
              className="sidebar-item-icon"
              icon={faStar}
            ></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Starred</span>
        </span>
        {/* <span className="sidebar-item-number">1</span> */}
      </div>
      <div
        className={`sidebar-item ${selectedMenu === "sent" ? "selected" : ""}`}
        onClick={(e) => selectMenu("sent", backupMails, backupDraftMails, backupSentMails, backupStarredMails)}
      >
        <span className="sidebar-item-main">
          <span>
            <FontAwesomeIcon className="sidebar-item-icon" icon={faPaperPlane}></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Sent</span>
        </span>
        {/* <span className="sidebar-item-number">1</span> */}
      </div>
      <div
        className={`sidebar-item ${selectedMenu === "draft" ? "selected" : ""}`}
        onClick={(e) => selectMenu("draft", backupMails, backupDraftMails, backupSentMails, backupStarredMails)}
      >
        <span className="sidebar-item-main">
          <span>
            <FontAwesomeIcon
              className="sidebar-item-icon"
              icon={faFile}
            ></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Draft</span>
        </span>
        {/* <span className="sidebar-item-number">1</span> */}
      </div>
    </div>
  );
}

export default Sidebar;
