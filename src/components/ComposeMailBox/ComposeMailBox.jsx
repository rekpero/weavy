import React from "react";
import "./ComposeMailBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMinus } from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";
import { ActionContext, StateContext } from "../../hook";
import { ArweaveService, CryptoService } from "../../services";

function ComposeMailBox() {
  const {
    toggleComposeMail,
    setNotification,
    setDraftMails,
    selectMail,
  } = React.useContext(ActionContext);
  const { wallet, selectedDraft } = React.useContext(StateContext);

  const [collapse, setCollapse] = React.useState(false);
  const [recipient, setRecipient] = React.useState(selectedDraft.to);
  const [subject, setSubject] = React.useState(selectedDraft.subject);
  const [tokens, setTokens] = React.useState(selectedDraft.tx_qty);
  const [content, setContent] = React.useState(selectedDraft.body);

  const checkEmptyContent = (content) => {
    if (
      content.length === 1 &&
      content[0].children.length === 1 &&
      content[0].children[0].text === ""
    ) {
      return true;
    }
    return false;
  };

  console.log(selectedDraft);

  const saveAndClose = () => {
    if (recipient || subject || !checkEmptyContent(content) || tokens) {
      const randomID = (Math.random() * 1e32).toString(36).substring(0, 10);
      let mailItem = {
        id: selectedDraft.id ? selectedDraft.id : randomID,
        to: recipient,
        subject: subject,
        body: content,
        tx_qty: tokens === "" ? "0" : tokens,
        unixTime: Math.round(new Date().getTime() / 1000),
        isDraft: true,
      };

      let sessionDrafts = sessionStorage.getItem("draftMails");
      let drafts;

      if (sessionDrafts !== null) {
        drafts = JSON.parse(sessionDrafts);
      } else {
        drafts = [];
      }
      if (selectedDraft.id) {
        drafts = drafts.filter((draft) => draft.id !== selectedDraft.id);
        selectMail(mailItem);
      }
      sessionStorage.setItem(
        "draftMails",
        JSON.stringify([...drafts, mailItem])
      );
      setDraftMails([...drafts, mailItem]);
    }
    toggleComposeMail(false);
  };

  const sendMail = async () => {
    if (recipient) {
      setNotification("Sending mail...");
      const stringifyContent = JSON.stringify(content);
      var mailTagUnixTime = Math.round(new Date().getTime() / 1000);
      let finalTokens = "";
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
    } else {
      setNotification("Please add a recipient");
    }
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
          onClick={(e) => saveAndClose()}
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
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="compose-body-subject">
            <input
              type="text"
              placeholder="Subject"
              className="compose-body-subject-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="compose-body-amount">
            <input
              type="number"
              placeholder="0 Ar"
              className="compose-body-amount-input"
              value={tokens}
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
