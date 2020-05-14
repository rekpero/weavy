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

function MailBoxTopBar() {
  const { wallet, allMail, paginationConfig } = React.useContext(
    StateContext
  );
  const { refreshAllMail } = React.useContext(ActionContext);
  return (
    <div className="mailbox-top-bar">
      <div className="mailbox-top-bar-left">
        <div className="select-all-container">
          <input type="checkbox" className="filled" />
        </div>
        <div className="reload-container" onClick={e => refreshAllMail(wallet)}>
          <FontAwesomeIcon icon={faRedoAlt} />
        </div>
      </div>
      <div className="mailbox-top-bar-right">
        <div className="pagination-content-container">{paginationConfig.left}-{paginationConfig.right} of {allMail.length}</div>
        <div className={`pagination-left-container ${!paginationConfig.leftEnabled ? 'disabled' : ''}`}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className={`pagination-right-container ${!paginationConfig.rightEnabled ? 'disabled' : ''}`}>
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
