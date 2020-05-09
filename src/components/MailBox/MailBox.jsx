import React from "react";
import "./MailBox.scss";
import MailBoxTopBar from "../MailBoxTopBar";
import MailBoxContent from "../MailBoxContent";

function MailBox() {
  return (
    <div className="mailbox">
      <div className="all-mail-container">
        <MailBoxTopBar></MailBoxTopBar>
        <MailBoxContent></MailBoxContent>
      </div>
      <div></div>
    </div>
  );
}

export default MailBox;
