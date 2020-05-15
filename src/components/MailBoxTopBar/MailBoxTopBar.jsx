import React from "react";
import "./MailBoxTopBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faEllipsisV,
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
  } = React.useContext(StateContext);
  const { refreshAllMail, setPagination } = React.useContext(ActionContext);
  const startingPagination =
    (paginationConfig.current - 1) * paginationConfig.count + 1;
  const endingPagination =
    paginationConfig.current * paginationConfig.count > backupMails.length
      ? backupMails.length
      : paginationConfig.current * paginationConfig.count;
  const leftEnabled = startingPagination !== 1;
  const rightEnabled = endingPagination !== backupMails.length;

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
          {startingPagination}-{endingPagination} of {backupMails.length}
        </div>
        <div
          className={`pagination-left-container ${
            !leftEnabled ? "disabled" : ""
          }`}
          onClick={(e) => setPagination(paginationConfig, "prev", backupMails)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div
          className={`pagination-right-container ${
            !rightEnabled ? "disabled" : ""
          }`}
          onClick={(e) => setPagination(paginationConfig, "next", backupMails)}
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
