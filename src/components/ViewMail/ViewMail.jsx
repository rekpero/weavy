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
  faTimes,
  faStar as faSolidStar,
  faEdit,
  faPaperPlane,
  faLink,
  faCloudDownloadAlt,
} from "@fortawesome/free-solid-svg-icons";
import MailEditor from "../MailEditor";
import ReadonlyEditor from "../ReadonlyEditor";
import { StateContext, ActionContext } from "../../hook";
import { shortenAddress } from "../../utils";
import { ArweaveService, CryptoService, IPFSService } from "../../services";
import { parseFileSize } from "../../utils";
import moment from "moment";

function ViewMail() {
  const {
    selectMail,
    setNotification,
    setSelectedDraftMails,
    toggleComposeMail,
    setDraftMails,
  } = React.useContext(ActionContext);
  const {
    selectedMail,
    wallet,
    walletAddress,
    starredMails,
    draftMails,
  } = React.useContext(StateContext);
  const [showReply, setShowReply] = React.useState(false);
  const [showForward, setShowForward] = React.useState(false);
  const [recipient, setRecipient] = React.useState("");
  const [tokens, setTokens] = React.useState("");
  const [attachments, setAttachments] = React.useState([]);
  const [content, setContent] = React.useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const sendReply = async () => {
    setNotification("Sending reply...");
    const recipient = selectedMail.from_address;
    const subject = "Re: " + selectedMail.subject;
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
    const stringifySubject = JSON.stringify({
      subject,
      attachments,
    });
    const finalContent = await CryptoService.encrypt_mail(
      stringifyContent,
      stringifySubject,
      pub_key
    );
    await ArweaveService.sendMail(
      recipient,
      finalTokens,
      finalContent,
      wallet,
      mailTagUnixTime
    );
    setTokens("");
    setContent("");
    setShowReply(false);
    setNotification("Reply has been sent");
  };

  const sendForward = async () => {
    setNotification("Sending forward...");
    const subject = selectedMail.subject;
    const stringifyContent = JSON.stringify(content);
    var mailTagUnixTime = Math.round(new Date().getTime() / 1000);
    let finalTokens = "";
    if (tokens === "") {
      finalTokens = "0";
    }
    finalTokens = ArweaveService.convertToWinston(tokens);

    var pub_key = await CryptoService.get_public_key(recipient);

    if (pub_key === undefined) {
      alert("Recipient has to send a transaction to the network, first!");
      return;
    }
    const stringifySubject = JSON.stringify({
      subject,
      attachments,
    });
    const finalContent = await CryptoService.encrypt_mail(
      stringifyContent,
      stringifySubject,
      pub_key
    );
    await ArweaveService.sendMail(
      recipient,
      finalTokens,
      finalContent,
      wallet,
      mailTagUnixTime
    );
    setTokens("");
    setContent("");
    setRecipient("");
    setShowForward(false);
    setNotification("Forward has been sent");
  };

  const sendMail = async () => {
    if (selectedMail.to) {
      setNotification("Sending mail...");
      const stringifyContent = JSON.stringify(selectedMail.content);
      var mailTagUnixTime = Math.round(new Date().getTime() / 1000);
      let finalTokens = "";
      if (selectedMail.tx_qty === "") {
        finalTokens = "0";
      } else {
        finalTokens = ArweaveService.convertToWinston(selectedMail.tx_qty);
      }

      var pub_key = await CryptoService.get_public_key(selectedMail.to);

      if (pub_key === undefined) {
        alert("Recipient has to send a transaction to the network, first!");
        return;
      }
      const stringifySubject = JSON.stringify({
        subject: selectedMail.subject,
        attachments,
      });
      const finalContent = await CryptoService.encrypt_mail(
        stringifyContent,
        stringifySubject,
        pub_key
      );
      await ArweaveService.sendMail(
        selectedMail.to,
        finalTokens,
        finalContent,
        wallet,
        mailTagUnixTime
      );

      const finalDraftMail = draftMails.filter(
        (draft) => draft.id !== selectedMail.id
      );
      sessionStorage.setItem("draftMails", JSON.stringify(finalDraftMail));
      setDraftMails(finalDraftMail);
      setSelectedDraftMails({
        to: "",
        subject: "",
        body: [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ],
        tx_qty: "",
        unixTime: Math.round(new Date().getTime() / 1000),
        isDraft: true,
      });
      selectMail(null);
      setNotification("Mail has been sent");
    } else {
      setNotification("Please add a recipient");
    }
  };

  const openForward = () => {
    setTokens(Number.parseFloat(selectedMail.tx_qty).toFixed(2) + "");
    setContent(selectedMail.body);
    setShowReply(false);
    setShowForward(true);
  };

  const starredMail = async (txId) => {
    setNotification("Starring mail...");
    await ArweaveService.starredMail(txId, wallet, walletAddress);
    setNotification("Mail has been starred");
  };

  const openEditMail = () => {
    setSelectedDraftMails(selectedMail);
    toggleComposeMail(true);
  };

  const deleteDraftMail = () => {
    const finalDraftMail = draftMails.filter(
      (draft) => draft.id !== selectedMail.id
    );
    sessionStorage.setItem("draftMails", JSON.stringify(finalDraftMail));
    setDraftMails(finalDraftMail);
    setSelectedDraftMails({
      to: "",
      subject: "",
      body: [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
      tx_qty: "",
      unixTime: Math.round(new Date().getTime() / 1000),
      isDraft: true,
    });
    selectMail(null);
    setNotification("Draft has been deleted");
  };

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

  const removeAttachment = (id) => {
    const finalAttachments = attachments.filter((attachment, i) => id !== i);
    setAttachments(finalAttachments);
  };

  const attachFile = (e) => {
    setNotification("File attaching...");
    const file = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, file);
  };
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

  const saveAndClose = () => {
    if (
      showReply
        ? selectedMail.from
        : recipient ||
          selectedMail.subject ||
          !checkEmptyContent(content) ||
          tokens
    ) {
      setNotification("Saving mail as draft...");
      const randomID = (Math.random() * 1e32).toString(36).substring(0, 10);
      let mailItem = {
        id: randomID,
        to: recipient,
        subject: (showReply ? "Re: " : "") + selectedMail.subject,
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
      sessionStorage.setItem(
        "draftMails",
        JSON.stringify([...drafts, mailItem])
      );
      setDraftMails([...drafts, mailItem]);
    }
    showReply ? setShowReply(false) : setShowForward(false);
  };

  return (
    <div className="view-mail">
      <div className="view-mail-header">
        <h2 className="view-mail-header-subject">
          {selectedMail.subject ? selectedMail.subject : "(no subject)"}
        </h2>
        <span
          className="view-mail-header-close"
          onClick={(e) => selectMail(null)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className="view-mail-body-container">
        {/* <div className="view-mail-body-item">
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
        </div> */}
        <div className="view-mail-body-item">
          <div className="view-mail-user-icon-container">
            {!selectedMail.isDraft ? (
              <img
                src={makeBlockie(selectedMail.from)}
                alt="address-blockie"
                className="user-profile-blockie-icon"
              />
            ) : (
              selectedMail.to && (
                <img
                  src={makeBlockie(selectedMail.to)}
                  alt="address-blockie"
                  className="user-profile-blockie-icon"
                />
              )
            )}
          </div>
          <div className="view-mail-body-content-container">
            <div className="view-mail-body-content-header">
              <span className="view-mail-body-content-user">
                <span className="view-mail-body-content-user-name">
                  {!selectedMail.isDraft
                    ? shortenAddress(selectedMail.from)
                    : selectedMail.to
                    ? shortenAddress(selectedMail.to)
                    : "Draft"}
                </span>
                <span className="view-mail-body-content-user-wallet">
                  <span className="view-mail-body-content-wallet-icon">
                    <FontAwesomeIcon icon={faWallet} />
                  </span>
                  <span className="view-mail-body-content-wallet-amount">
                    {Number.parseFloat(selectedMail.tx_qty).toFixed(2)} AR
                  </span>
                </span>
              </span>
              <span className="view-mail-body-content-time">
                {moment.unix(selectedMail.unixTime).fromNow()}
              </span>
              {!selectedMail.isDraft && (
                <span
                  className="view-mail-body-content-star"
                  onClick={(e) => starredMail(selectedMail.id)}
                >
                  <FontAwesomeIcon
                    icon={
                      !starredMails
                        .map((mail) => mail.id)
                        .includes(selectedMail.id)
                        ? faStar
                        : faSolidStar
                    }
                  />
                </span>
              )}
            </div>
            <div className="view-mail-body-content">
              <ReadonlyEditor content={selectedMail.body}></ReadonlyEditor>
            </div>
            {selectedMail.attachments.length ? (
              <div className="compose-body-attachments-container">
                <div className="compose-body-attachments-header-container">
                  <span className="compose-body-attachments-icon">
                    <FontAwesomeIcon icon={faLink} />
                  </span>
                  <span>{selectedMail.attachments.length} Attachments</span>
                </div>
                <div className="compose-body-attachments-body">
                  {selectedMail.attachments.map((attachment, i) => (
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
                      <a
                        href={`https://ipfs.io/ipfs/${attachment.hash}`}
                        className="mail-trash"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="view-mail-body-action-container">
              {!selectedMail.isDraft ? (
                <div className="draft-action-button-container">
                  <div
                    className="view-mail-body-action-button"
                    onClick={(e) => {
                      setShowReply(true);
                      setShowForward(false);
                    }}
                  >
                    <span className="view-mail-body-action-icon">
                      <FontAwesomeIcon icon={faReply} />
                    </span>
                    <span>Reply</span>
                  </div>
                  <div
                    className="view-mail-body-action-button"
                    onClick={openForward}
                  >
                    <span className="view-mail-body-action-icon">
                      <FontAwesomeIcon icon={faShare} />
                    </span>
                    <span>Forward</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="draft-action-button-container">
                    <div
                      className="view-mail-body-action-button"
                      onClick={sendMail}
                    >
                      <span className="view-mail-body-action-icon">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </span>
                      <span>Send</span>
                    </div>
                    <div
                      className="view-mail-body-action-button"
                      onClick={openEditMail}
                    >
                      <span className="view-mail-body-action-icon">
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span>Edit</span>
                    </div>
                  </div>
                  <div className="draft-action-delete-container">
                    <span
                      className="view-mail-body-content-trash"
                      onClick={deleteDraftMail}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {showReply && (
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
                <div className="view-mail-body-content-reply">
                  <FontAwesomeIcon icon={faReply} />
                </div>
                <div className="view-mail-body-content-user-reply">
                  {selectedMail.from}
                </div>
                <span
                  className="reply-mail-close"
                  onClick={(e) => saveAndClose()}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
              <div className="reply-body-amount">
                <input
                  type="number"
                  placeholder="0 Ar"
                  className="reply-body-amount-input"
                  onChange={(e) => setTokens(e.target.value)}
                />
              </div>
              <div className="view-mail-body-content-reply-container">
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
                    onClick={sendReply}
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
                  <span
                    className="reply-mail-trash"
                    onClick={(e) => setShowReply(false)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {showForward && (
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
                <div className="view-mail-body-content-reply">
                  <FontAwesomeIcon icon={faShare} />
                </div>
                <div className="view-mail-body-content-user-reply">
                  <input
                    type="text"
                    placeholder="Recipient"
                    className="forward-recipient-input"
                    autoFocus
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
                <span
                  className="reply-mail-close"
                  onClick={(e) => saveAndClose()}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
              <div className="reply-body-amount">
                <input
                  type="number"
                  placeholder="0 Ar"
                  className="reply-body-amount-input"
                  value={tokens}
                  onChange={(e) => setTokens(e.target.value)}
                />
              </div>
              <div className="view-mail-body-content-reply-container">
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
                    onClick={sendForward}
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
                  <span
                    className="reply-mail-trash"
                    onClick={(e) => setShowForward(false)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewMail;
