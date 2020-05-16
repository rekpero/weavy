import React from "react";
import "./ComposeMailBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMinus } from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";
import { ActionContext, StateContext } from "../../hook";
import { ArweaveService, CryptoService } from "../../services";

function ComposeMailBox() {
  const { toggleComposeMail, setNotification } = React.useContext(
    ActionContext
  );
  const { wallet } = React.useContext(StateContext);

  const [collapse, setCollapse] = React.useState(false);
  const [recipient, setRecipient] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [tokens, setTokens] = React.useState("");
  const [content, setContent] = React.useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const sendMail = async () => {
    setNotification("Sending mail...");
    const stringifyContent = JSON.stringify(content);
    var mailTagUnixTime = Math.round(new Date().getTime() / 1000);
    let finalTokens = "";
    console.log(tokens);
    if (tokens === "") {
      finalTokens = "0";
    } else {
      finalTokens = ArweaveService.convertToWinston(tokens);
    }

    var pub_key = await CryptoService.get_public_key(recipient);

    if (pub_key === undefined) {
      alert("Recipient has to send a transaction to the network, first!");
      return;
    }
    const finalContent = await CryptoService.encrypt_mail(
      stringifyContent,
      subject,
      pub_key
    );
    await ArweaveService.sendMail(
      recipient,
      finalTokens,
      finalContent,
      wallet,
      mailTagUnixTime
    );
    setRecipient("");
    setSubject("");
    setTokens("");
    setContent("");
    toggleComposeMail(false);
    setNotification("Mail has been sent");
  };

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
              autoFocus
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
              onChange={(e) => setTokens(e.target.value)}
            />
          </div>
          <div className="compose-body-content">
            <MailEditor
              onValueChange={(value) => setContent(value)}
              content={content}
            />
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
