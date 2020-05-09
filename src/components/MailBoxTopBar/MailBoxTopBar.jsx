import React from "react";
import "./MailBoxTopBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faEllipsisV,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

function MailBoxTopBar() {
  return (
    <div className="mailbox-top-bar">
      <div className="mailbox-top-bar-left">
        <div className="select-all-container">
          <input type="checkbox" className="filled" />
        </div>
        <div className="reload-container">
          <FontAwesomeIcon icon={faRedoAlt} />
        </div>
      </div>
      <div className="mailbox-top-bar-right">
        <div className="pagination-content-container">1-30 of 300</div>
        <div className="pagination-left-container">
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className="pagination-right-container">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
        <div className="pagination-menu-container">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </div>
    </div>
  );
}

export default MailBoxTopBar;
