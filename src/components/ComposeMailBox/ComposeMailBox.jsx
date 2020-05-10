import React from "react";
import "./ComposeMailBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMinus } from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";
import { ActionContext } from "../../hook";

function ComposeMailBox() {
  const { toggleComposeMail } = React.useContext(ActionContext);

  const [collapse, setCollapse] = React.useState(false);
  const [recipient, setRecipient] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [content, setContent] = React.useState("");

  const sendMail = async () => {
    const stringifyContent = JSON.stringify(content);
    console.log(stringifyContent);
    const parsedContent = JSON.parse(stringifyContent);
    console.log(parsedContent);
    console.log(recipient, subject, content, amount);
  };

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

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
        <div
          className="compose-mail-header-close"
          onClick={(e) => toggleComposeMail(false)}
        >
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
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="compose-body-subject">
            <input
              type="text"
              placeholder="Subject"
              className="compose-body-subject-input"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="compose-body-amount">
            <input
              type="number"
              placeholder="0 Ar"
              className="compose-body-amount-input"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="compose-body-content">
            <MailEditor onValueChange={(value) => setContent(value)} />
          </div>
          <div className="compose-body-buttons-container">
            <div className="send-button-container">
              <button
                type="button"
                className="send-mail-button"
                onClick={sendMail}
              >
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
