import React from "react";
import "./ComposeMailBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faMinus,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";
import { ActionContext, StateContext } from "../../hook";
import { ArweaveService, CryptoService, IPFSService } from "../../services";
import { parseFileSize } from "../../utils";

function ComposeMailBox() {
  const {
    toggleComposeMail,
    setNotification,
    setDraftMails,
    selectMail,
    setCurrentSendingMails,
    setNotifications
  } = React.useContext(ActionContext);
  const { wallet, selectedDraft, currentSendingMail, notifications } = React.useContext(StateContext);

  const [collapse, setCollapse] = React.useState(false);
  const [recipient, setRecipient] = React.useState(selectedDraft.to);
  const [subject, setSubject] = React.useState(selectedDraft.subject);
  const [tokens, setTokens] = React.useState(selectedDraft.tx_qty);
  const [content, setContent] = React.useState(selectedDraft.body);
  const [attachments, setAttachments] = React.useState(
    selectedDraft.attachments
  );

  // check empty content
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

  // save the mail to draft and session
  const saveAndClose = () => {
    if (recipient || subject || !checkEmptyContent(content) || tokens) {
      setNotification("Saving mail as draft...");
      const randomID = (Math.random() * 1e32).toString(36).substring(0, 10);
      let mailItem = {
        id: selectedDraft.id ? selectedDraft.id : randomID,
        to: recipient,
        subject: subject,
        body: content,
        tx_qty: tokens === "" ? "0" : tokens,
        attachments,
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

  // close the compose pannel
  const closeCompose = () => {
    setRecipient("");
    setSubject("");
    setTokens("");
    setContent("");
    setAttachments([]);
    toggleComposeMail(false);
  };

  // attach file to mail
  const attachFile = (e) => {
    setNotification("File attaching...");
    const file = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, file);
  };

  // convert file to buffer and put it to ipfs 
  const convertToBuffer = async (reader, file) => {
    const buffer = await Buffer.from(reader.result);
    const hash = await IPFSService.uploadAttachment(buffer);
    const randomID = (Math.random() * 1e32).toString(36).substring(0, 10);
    const attachmentUnixTime = Math.round(new Date().getTime() / 1000);
    const lastDot = file.name.lastIndexOf(".");
    const ext = file.name.substring(lastDot + 1);
    const attachment = {
      id: randomID,
      name: file.name,
      timestamp: attachmentUnixTime,
      type: ext,
      size: file.size,
      hash,
    };
    setAttachments([...attachments, attachment]);
    setNotification("File attached.");
  };

  // send the mail
  const sendMail = async () => {
    if (recipient) {
      setNotification("Creating mail...");
      const stringifyContent = JSON.stringify(content);
      const mailTagUnixTime = Math.round(new Date().getTime() / 1000);
      let finalTokens = "";
      if (tokens === "") {
        finalTokens = "0";
      } else {
        finalTokens = ArweaveService.convertToWinston(tokens);
      }

      // get a public key
      var pub_key = await CryptoService.get_public_key(recipient);

      if (pub_key === undefined) {
        setNotification("Recipient has to send a transaction to the network, first!");
        return;
      }
      // strigify the subject and attachment
      const stringifySubject = JSON.stringify({
        subject,
        attachments,
      });
      // encrypt the mail
      const finalContent = await CryptoService.encrypt_mail(
        stringifyContent,
        stringifySubject,
        pub_key
      );
      // send the mail
      const res = await ArweaveService.sendMail(
        recipient,
        finalTokens,
        finalContent,
        wallet,
        mailTagUnixTime
      );
      // check if there is any error
      if (res.status === "error") {
        setNotification(res.msg);
      } else {
        if (selectedDraft.id) {
          let sessionDrafts = sessionStorage.getItem("draftMails");
          let drafts;

          if (sessionDrafts !== null) {
            drafts = JSON.parse(sessionDrafts);
          } else {
            drafts = [];
          }
          drafts = drafts.filter((draft) => draft.id !== selectedDraft.id);
          selectMail(null);
          sessionStorage.setItem("draftMails", JSON.stringify(drafts));
          setDraftMails(drafts);
        }
        // close everything
        setRecipient("");
        setSubject("");
        setTokens("");
        setContent("");
        setAttachments([]);
        toggleComposeMail(false);
        setNotification(res.msg);
        // add the txid to watcher
        setCurrentSendingMails([...currentSendingMail, res.id])
        const notification = {
          message: "Mail sending...",
          txId: res.id
        }
        // set the notification
        setNotifications([...notifications, notification]) 
      }
    } else {
      setNotification("Please add a recipient");
    }
  };
  
  // get file icon
  const getFileTypeIcon = (fileType) => {
    try {
      return (
        <img
          src={`https://res.cloudinary.com/mmitrasish/image/upload/v1590010665/weavy/${fileType}.png`}
          alt="file-icon"
          className="file-type-icon"
        />
      );
    } catch (err) {
      console.log(err);
    }
  };

  // remove attachment
  const removeAttachment = (id) => {
    const finalAttachments = attachments.filter((attachment, i) => id !== i);
    setAttachments(finalAttachments);
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
          {attachments.length ? (
            <div className="compose-body-attachments-container">
              <div className="compose-body-attachments-header-container">
                <span className="compose-body-attachments-icon">
                  <FontAwesomeIcon icon={faLink} />
                </span>
                <span>{attachments.length} Attachments</span>
              </div>
              <div className="compose-body-attachments-body">
                {attachments.map((attachment, i) => (
                  <div key={i} className="attachments-item">
                    <div className="attachments-item-icon-container">
                      {getFileTypeIcon(attachment.type)}
                    </div>
                    <div className="attachments-item-details-container">
                      <div className="attachments-item-name">
                        {attachment.name}
                      </div>
                      <div className="attachments-item-size">
                        {parseFileSize(attachment.size)}
                      </div>
                    </div>
                    <div
                      className="mail-trash"
                      onClick={(e) => removeAttachment(i)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="compose-body-buttons-container">
            <div className="send-button-container">
              <button
                type="button"
                className="send-mail-button"
                onClick={sendMail}
              >
                Send
              </button>
              <span className="mail-link">
                <FontAwesomeIcon icon={faLink} />
                <input
                  type="file"
                  className="mail-link-input"
                  onChange={attachFile}
                />
              </span>
            </div>
            <div>
              <span className="mail-trash" onClick={closeCompose}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComposeMailBox;
