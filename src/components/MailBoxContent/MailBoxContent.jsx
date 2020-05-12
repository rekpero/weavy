import React from "react";
import "./MailBoxContent.scss";
import makeBlockie from "ethereum-blockies-base64";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { StateContext, ActionContext } from "../../hook";
import { shortenAddress } from "../../utils";

function MailBoxContent() {
  const { allMail, selectedMail } = React.useContext(StateContext);
  const { selectMail } = React.useContext(ActionContext);
  return (
    <div className="mailbox-content">
      {allMail.map((mail, id) => (
        <div
          className={`${
            selectedMail && selectedMail.id === mail.id ? "selected" : ""
          } mail-item`}
          key={id}
          onClick={(e) => selectMail(mail)}
        >
          <div className="select-mail-container">
            <input type="checkbox" className="filled" />
          </div>
          <div className="user-profile-icon-container">
            <img
              src={makeBlockie(mail.from)}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="mail-content-container">
            <div className="mail-user-container">
              <span className="mail-user-name-container">
                <span className="mail-user-name">
                  {shortenAddress(mail.from)}
                </span>
                <span className="mail-user-wallet">
                  <FontAwesomeIcon icon={faWallet} />
                </span>
                <span className="mail-user-wallet-amount">
                  {Number.parseFloat(mail.tx_qty).toFixed(2)} AR
                </span>
              </span>
              <span className="mail-time">10 mins</span>
              <span className="mail-trash">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
            <div className="mail-subject">{mail.subject}</div>
            <div className="mail-body-container">
              <span className="mail-body">
                {mail.body
                  .flatMap((body) => body.children)
                  .map((body) => body.text)
                  .reduce((prevText, currText) => prevText + " " + currText)}
              </span>
              <span className="mail-starred">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MailBoxContent;
