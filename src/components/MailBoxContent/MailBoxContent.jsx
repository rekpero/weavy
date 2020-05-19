import React from "react";
import "./MailBoxContent.scss";
import makeBlockie from "ethereum-blockies-base64";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faStar as faSolidStar,
  faInbox,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { StateContext, ActionContext } from "../../hook";
import { ArweaveService } from "../../services";
import { shortenAddress } from "../../utils";
import moment from "moment";

function MailBoxContent() {
  const {
    allMail,
    selectedMail,
    selectedMenu,
    starredMails,
    draftMails,
    wallet,
    walletAddress,
  } = React.useContext(StateContext);
  const { selectMail, setNotification } = React.useContext(ActionContext);

  const starredMail = async (txId) => {
    setNotification("Starring mail...");
    await ArweaveService.starredMail(txId, wallet, walletAddress);
    setNotification("Mail has been starred");
  };

  return (
    <div className="mailbox-content">
      {selectedMenu === "inbox" &&
        allMail.length ? allMail.map((mail, id) => (
          <div
            className={`${
              selectedMail && selectedMail.id === mail.id ? "selected" : ""
              } mail-item`}
            key={id}
            onClick={(e) => selectMail(mail)}
          >
            {/* <div className="select-mail-container">
              <input type="checkbox" className="filled" />
            </div> */}
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
                  <span>
                    {mail.attachments.length ? <span className="mail-user-wallet">
                      <FontAwesomeIcon icon={faLink} />
                    </span> : null}
                    <span className="mail-user-wallet">
                      <FontAwesomeIcon icon={faWallet} />
                    </span>
                    <span className="mail-user-wallet-amount">
                      {Number.parseFloat(mail.tx_qty).toFixed(2)} AR
                  </span>
                  </span>
                </span>
                <span className="mail-time">
                  {moment.unix(mail.unixTime).fromNow()}
                </span>
                {/* <span className="mail-trash">
                <FontAwesomeIcon icon={faTrash} />
              </span> */}
              </div>
              <div className="mail-subject">{mail.subject}</div>
              <div className="mail-body-container">
                <span className="mail-body">
                  {mail.body
                    .flatMap((body) => body.children)
                    .map((body) => body.text)
                    .reduce((prevText, currText) => prevText + " " + currText)}
                </span>
                <span
                  className={`mail-starred ${
                    starredMails.map((mail) => mail.id).includes(mail.id)
                      ? "starred-disabled"
                      : ""
                    }`}
                  onClick={(e) => starredMail(mail.id)}
                >
                  <FontAwesomeIcon
                    icon={
                      !starredMails.map((mail) => mail.id).includes(mail.id)
                        ? faStar
                        : faSolidStar
                    }
                  />
                </span>
              </div>
            </div>
          </div>
        )) : selectedMenu === "inbox" && (
          <div className="no-mail-container">
            <div>
              <FontAwesomeIcon
                className="no-mail-icon"
                icon={faInbox}
              ></FontAwesomeIcon>
            </div>
            <div>No Inbox Mail Found</div>
          </div>
        )}
      {selectedMenu === "starred" &&
        starredMails.length ? starredMails.map((mail, id) => (
          <div
            className={`${
              selectedMail && selectedMail.id === mail.id ? "selected" : ""
              } mail-item`}
            key={id}
            onClick={(e) => selectMail(mail)}
          >
            {/* <div className="select-mail-container">
              <input type="checkbox" className="filled" />
            </div> */}
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
                  <span>
                    {mail.attachments.length ? <span className="mail-user-wallet">
                      <FontAwesomeIcon icon={faLink} />
                    </span> : null}
                    <span className="mail-user-wallet">
                      <FontAwesomeIcon icon={faWallet} />
                    </span>
                    <span className="mail-user-wallet-amount">
                      {Number.parseFloat(mail.tx_qty).toFixed(2)} AR
                  </span>
                  </span>
                </span>
                <span className="mail-time">
                  {moment.unix(mail.unixTime).fromNow()}
                </span>
                {/* <span className="mail-trash">
                <FontAwesomeIcon icon={faTrash} />
              </span> */}
              </div>
              <div className="mail-subject">{mail.subject}</div>
              <div className="mail-body-container">
                <span className="mail-body">
                  {mail.body
                    .flatMap((body) => body.children)
                    .map((body) => body.text)
                    .reduce((prevText, currText) => prevText + " " + currText)}
                </span>
                <span className="mail-starred starred-disabled">
                  <FontAwesomeIcon icon={faSolidStar} />
                </span>
              </div>
            </div>
          </div>
        )) : selectedMenu === "starred" && (
          <div className="no-mail-container">
            <div>
              <FontAwesomeIcon
                className="no-mail-icon"
                icon={faInbox}
              ></FontAwesomeIcon>
            </div>
            <div>No Starred Mail Found</div>
          </div>
        )}
      {selectedMenu === "draft" &&
        draftMails.length ? draftMails.map((mail, id) => (
          <div
            className={`mail-item`}
            key={id}
            onClick={(e) => selectMail(mail)}
          >
            {/* <div className="select-mail-container">
              <input type="checkbox" className="filled" />
            </div> */}
            <div className="user-profile-icon-container">
              {mail.to && (
                <img
                  src={makeBlockie(mail.to)}
                  alt="address-blockie"
                  className="user-profile-blockie-icon"
                />
              )}
            </div>
            <div className="mail-content-container">
              <div className="mail-user-container">
                <span className="mail-user-name-container">
                  <span className="mail-user-name">
                    {mail.to ? shortenAddress(mail.to) : "Draft"}
                  </span>
                  <span>
                    {mail.attachments.length ? <span className="mail-user-wallet">
                      <FontAwesomeIcon icon={faLink} />
                    </span> : null}
                    <span className="mail-user-wallet">
                      <FontAwesomeIcon icon={faWallet} />
                    </span>
                    <span className="mail-user-wallet-amount">
                      {Number.parseFloat(
                        mail.tx_qty === "" ? 0 : mail.tx_qty
                      ).toFixed(2)}{" "}
                    AR
                  </span>
                  </span>
                </span>
                <span className="mail-time">
                  {moment.unix(mail.unixTime).fromNow()}
                </span>
                {/* <span className="mail-trash">
                <FontAwesomeIcon icon={faTrash} />
              </span> */}
              </div>
              <div className="mail-subject">
                {mail.subject ? mail.subject : "(no subject)"}
              </div>
              <div className="mail-body-container">
                <span className="mail-body">
                  {mail.body
                    .flatMap((body) => body.children)
                    .map((body) => body.text)
                    .reduce((prevText, currText) => prevText + " " + currText)}
                </span>
                {/* <span className="mail-starred starred-disabled">
                  <FontAwesomeIcon icon={faSolidStar} />
                </span> */}
              </div>
            </div>
          </div>
        )) : selectedMenu === "draft" && (
          <div className="no-mail-container">
            <div>
              <FontAwesomeIcon
                className="no-mail-icon"
                icon={faInbox}
              ></FontAwesomeIcon>
            </div>
            <div>No Draft Mail Found</div>
          </div>
        )}
    </div>
  );
}

export default MailBoxContent;
