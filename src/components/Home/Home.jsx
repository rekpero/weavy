import React from "react";
import "./Home.scss";
import Sidebar from "../Sidebar";
import MailBox from "../MailBox";
import ComposeMailBox from "../ComposeMailBox";
import ViewMail from "../ViewMail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StateContext, ActionContext } from "../../hook";

function Home() {
  const {
    openComposeMail,
    wallet,
    selectedMail,
    firstTime,
    mailLoader,
    lastSyncTime,
    showNotification,
    notificationMessage,
  } = React.useContext(StateContext);
  const { refreshAllMail, setFirstTime, closeNotification } = React.useContext(
    ActionContext
  );

  React.useEffect(() => {
    if (firstTime) {
      refreshAllMail(wallet, true, lastSyncTime);
      setInterval(() => {
        refreshAllMail(wallet, false, lastSyncTime);
      }, 60000);
      setFirstTime(false);
    }
  }, []);
  return (
    <div className="home">
      {mailLoader && (
        <div className="mail-top-loader-container">
          <div className="mail-top-loader-text">Loading...</div>
        </div>
      )}
      <Sidebar></Sidebar>
      <MailBox></MailBox>
      {selectedMail && <ViewMail></ViewMail>}
      {openComposeMail && <ComposeMailBox></ComposeMailBox>}
      {showNotification && (
        <div className="mail-notification-container">
          <div className="mail-notification-message">{notificationMessage}</div>
          <div
            className="mail-notification-close"
            onClick={(e) => closeNotification()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
