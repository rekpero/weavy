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
} from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";
import ReadonlyEditor from "../ReadonlyEditor";

function ViewMail() {
  const initialValue = [
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: "bold", bold: true },
        {
          text:
            ", or add a semantically rendered block quote in the middle of the page, like this:",
        },
      ],
    },
    {
      type: "block-quote",
      children: [{ text: "A wise quote." }],
    },
    {
      type: "paragraph",
      children: [{ text: "Try it out for yourself!" }],
    },
  ];

  return (
    <div className="view-mail">
      <div className="view-mail-header">
        <h2 className="view-mail-header-subject">Integration Testing</h2>
      </div>
      <div className="view-mail-body-container">
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
              <span className="view-mail-body-content-user">
                <span className="view-mail-body-content-user-name">
                  Test Name
                </span>
                <span className="view-mail-body-content-user-wallet">
                  <span className="view-mail-body-content-wallet-icon">
                    <FontAwesomeIcon icon={faWallet} />
                  </span>
                  <span className="view-mail-body-content-wallet-amount">
                    2 AR
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
              <ReadonlyEditor content={initialValue}></ReadonlyEditor>
            </div>
            <div className="view-mail-body-action-container">
              <div className="view-mail-body-action-button">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMail;
