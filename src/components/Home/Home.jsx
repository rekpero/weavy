/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./Home.scss";
import Sidebar from "../Sidebar";
import MailBox from "../MailBox";
import ComposeMailBox from "../ComposeMailBox";
import ViewMail from "../ViewMail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StateContext, ActionContext } from "../../hook";
import { ArweaveService } from "../../services";

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
    notifications,
    mailWatcher,
    currentSendingMail,
    allMail
  } = React.useContext(StateContext);
  const {
    refreshAllMail,
    setFirstTime,
    closeNotification,
    setRefreshMailTimer,
    setCurrentSendingMails,
    setNotifications,
    setMailWatcher,
    setNotification
  } = React.useContext(ActionContext);

  React.useEffect(() => {
    if (firstTime) {
      // refresh mail for the first time
      refreshAllMail(wallet, true, lastSyncTime, allMail);
      const refreshMailTimer = setInterval(() => {
        //refresh mail every 1mins 
        refreshAllMail(wallet, false, lastSyncTime, allMail);
      }, 300000);
      setFirstTime(false);
      setRefreshMailTimer(refreshMailTimer);
    }
  }, [wallet]);

  React.useEffect(() => {
    if (currentSendingMail.length) {
      // starting the mail tx watcher whenever there is a mail sent
      watchTxStatus(currentSendingMail);
    }
  }, [currentSendingMail]);

  const watchTxStatus = (mailTxIdList) => {
    // clear previous timer
    clearInterval(mailWatcher);

    // start a new timer
    const mailWatcherNew = setInterval(() => {
      const getStatus = async () => {
        // get the status of all the mails sent
        const getTxStatus = await ArweaveService.getTxStatus(mailTxIdList);
        // iterate and check the mail status
        getTxStatus.forEach((status, i) => {
          // check mail status is sent
          if (status !== undefined) {
            // remove the id from the check list
            const txId = mailTxIdList.splice(i, 1);
            // store it in the state
            setCurrentSendingMails(mailTxIdList)
            // filter out previous notification and put the new one, we don't like to see same txid notifications
            const filteredNotifications = notifications.filter(notification => notification.txId !== txId);
            const notification = {
              message: "Mail sent to the target",
              txId
            }
            // set the notification list
            setNotifications([...filteredNotifications, notification])
            // show notification
            setNotification(notification.message);
            // refresh the mail
            refreshAllMail(wallet, false, lastSyncTime, allMail)
            if (!mailTxIdList.length) {
              clearInterval(mailWatcher);
              setMailWatcher(null)
            }
          }
        });
        console.log(getTxStatus);
      };

      // start checking status
      getStatus();
    }, 5000);
    setMailWatcher(mailWatcherNew)
  };
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
