import React from "react";
import "./ComposeMailBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMinus } from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";

function ComposeMailBox() {
  const [collapse, setCollapse] = React.useState(false);
  return (
    <div className="compose-mail-box">
      <div
        className="compose-mail-header"
        onClick={(e) => setCollapse(!collapse)}
      >
        <div className="compose-mail-header-title">New Message</div>
        <div
          className="compose-mail-header-collapse"
          onClick={(e) => setCollapse(!collapse)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div className="compose-mail-header-close">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      {!collapse && (
        <div className="compose-body-container">
          <div className="compose-body-recipient">
            <input
              type="text"
              placeholder="Recipient"
              className="compose-body-recipient-input"
            />
          </div>
          <div className="compose-body-subject">
            <input
              type="text"
              placeholder="Subject"
              className="compose-body-subject-input"
            />
          </div>
          <div className="compose-body-content">
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
      )}
    </div>
  );
}

export default ComposeMailBox;
