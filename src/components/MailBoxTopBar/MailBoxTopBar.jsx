import React from "react";
import "./MailBoxTopBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { StateContext, ActionContext } from "../../hook";
import moment from "moment";

function MailBoxTopBar() {
  const {
    wallet,
    backupMails,
    paginationConfig,
    lastSyncTime,
    selectedMenu,
    backupStarredMails,
    backupSentMails,
    backupDraftMails
  } = React.useContext(StateContext);
  const { refreshAllMail, setPagination } = React.useContext(ActionContext);
  // get menu related backup
  const correctBackup = () => {
    if(selectedMenu === "inbox") return backupMails;
    if(selectedMenu === "sent") return backupSentMails;
    if(selectedMenu === "starred") return backupStarredMails;
    if(selectedMenu === "draft") return backupDraftMails;
    return []
  }

  // get menu related action type
  const correctActionType = () => {
    if(selectedMenu === "inbox") return "SET_ALL_MAIL";
    if(selectedMenu === "sent") return "SET_ONLY_SENT_MAIL";
    if(selectedMenu === "starred") return "SET_ONLY_STARRED_MAIL";
    if(selectedMenu === "draft") return "SET_ONLY_DRAFT_MAILS";
    return ""
  }

  // get menu related mail type
  const correctMailType = () => {
    if(selectedMenu === "inbox") return "allMail";
    if(selectedMenu === "sent") return "sentMails";
    if(selectedMenu === "starred") return "starredMails";
    if(selectedMenu === "draft") return "draftMails";
    return ""
  }
  
  const startingPagination =
    (paginationConfig.current - 1) * paginationConfig.count + 1;
  const endingPagination =
    paginationConfig.current * paginationConfig.count > correctBackup().length
      ? correctBackup().length
      : paginationConfig.current * paginationConfig.count;
  const leftEnabled = startingPagination !== 1;
  const rightEnabled = endingPagination !== correctBackup().length;

  return (
    <div className="mailbox-top-bar">
      <div className="mailbox-top-bar-left">
        {/* <div className="select-all-container">
          <input type="checkbox" className="filled" />
        </div> */}
        <div
          className="reload-container"
          onClick={(e) => refreshAllMail(wallet, false, lastSyncTime)}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </div>
      </div>
      <div className="mailbox-top-bar-right">
        <div className="last-synced-container">
          Last synced at {moment(lastSyncTime).format("LT")}
        </div>
        <div className="pagination-content-container">
          {startingPagination}-{endingPagination} of {correctBackup().length}
        </div>
        <div
          className={`pagination-left-container ${
            !leftEnabled ? "disabled" : ""
          }`}
          onClick={(e) => setPagination(paginationConfig, "prev", correctBackup(), correctActionType(), correctMailType())}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div
          className={`pagination-right-container ${
            !rightEnabled ? "disabled" : ""
          }`}
          onClick={(e) => setPagination(paginationConfig, "next", correctBackup(), correctActionType(), correctMailType() )}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
        {/* <div className="pagination-menu-container">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div> */}
      </div>
    </div>
  );
}

export default MailBoxTopBar;
