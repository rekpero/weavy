import React, { createContext, useMemo } from "react";
import { ArweaveService } from "../services";
import moment from "moment";

export const ActionContext = createContext();
export const StateContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            wallet: action.wallet.walletPrivateKey,
            walletAddress: action.wallet.walletAddress,
            userName: action.wallet.userName,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            wallet: action.wallet.walletPrivateKey,
            walletAddress: action.wallet.walletAddress,
            userName: action.wallet.userName,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            wallet: null,
            walletAddress: "",
            userName: "",
          };
        case "TOGGLE_COMPOSE_MAIL":
          return {
            ...prevState,
            openComposeMail: action.open,
          };
        case "TOGGLE_LANDING":
          return {
            ...prevState,
            isLanding: action.isLanding,
          };
        case "ALL_MAIL_FETCHED":
          return {
            ...prevState,
            allMail: action.mails.allMail,
            backupMails: action.mails.backupMails,
          };
        case "MAIL_SELECTED":
          return {
            ...prevState,
            selectedMail: action.mail,
          };
        case "MENU_SELECTED":
          return {
            ...prevState,
            selectedMenu: action.menu,
          };
        case "SET_PAGINATION_CONFIG":
          return {
            ...prevState,
            paginationConfig: action.paginationConfig,
          };
        case "SET_ALL_MAIL":
          return {
            ...prevState,
            allMail: action.allMail,
          };
        case "SET_STARRED_MAIL":
          return {
            ...prevState,
            starredMails: action.starredMails,
            backupStarredMails: action.starredMails,
          };
        case "SET_ONLY_STARRED_MAIL":
          return {
            ...prevState,
            starredMails: action.starredMails,
          };
        case "SET_DRAFT_MAIL":
          return {
            ...prevState,
            draftMails: action.draftMails,
            backupDraftMails: action.draftMails,
          };
        case "SET_ONLY_DRAFT_MAILS":
          return {
            ...prevState,
            draftMails: action.draftMails,
          };
        case "SET_SENT_MAIL":
          return {
            ...prevState,
            sentMails: action.sentMails,
            backupSentMails: action.sentMails,
          };
        case "SET_ONLY_SENT_MAIL":
          return {
            ...prevState,
            sentMails: action.sentMails,
          };
        case "SET_FIRST_TIME_LOADER":
          return {
            ...prevState,
            firstTimeLoader: action.firstTimeLoader,
          };
        case "SET_MAIL_LOADER":
          return {
            ...prevState,
            mailLoader: action.mailLoader,
          };
        case "SET_FIRST_TIME":
          return {
            ...prevState,
            firstTime: action.firstTime,
          };
        case "SET_LAST_SYNC_TIME":
          return {
            ...prevState,
            lastSyncTime: action.lastSyncTime,
          };
        case "SET_SHOW_NOTIFICATION":
          return {
            ...prevState,
            showNotification: action.showNotification,
          };
        case "SET_NOTIFICATION_MESSAGE":
          return {
            ...prevState,
            notificationMessage: action.notificationMessage,
          };
        case "SET_SELECTED_DRAFT_MAIL":
          return {
            ...prevState,
            selectedDraft: action.selectedDraft,
          };
        case "SET_REFRESH_MAIL_TIMER":
          return {
            ...prevState,
            refreshMailTimer: action.refreshMailTimer,
          };
        case "SET_CURRENT_CURRENT_SENDING_MAIL":
          return {
            ...prevState,
            currentSendingMail: action.currentSendingMail,
          };
        case "SET_NOTIFICATIONS":
          return {
            ...prevState,
            notifications: action.notifications,
          };
        case "SET_MAIL_WATCHER":
          return {
            ...prevState,
            mailWatcher: action.mailWatcher,
          };
        default:
      }
    },
    {
      isLanding: !JSON.parse(sessionStorage.getItem("isNotLanding")),
      isMailLoading: true,
      wallet: JSON.parse(sessionStorage.getItem("wallet")),
      walletAddress: sessionStorage.getItem("walletAddress"),
      userName: sessionStorage.getItem("userName"),
      openComposeMail: false,
      allMail: JSON.parse(sessionStorage.getItem("allInboxMail")) ? JSON.parse(sessionStorage.getItem("allInboxMail")) : [],
      backupMails: JSON.parse(sessionStorage.getItem("allInboxMail")) ? JSON.parse(sessionStorage.getItem("allInboxMail")) : [],
      starredMails: JSON.parse(sessionStorage.getItem("allStarredMail")) ? JSON.parse(sessionStorage.getItem("allStarredMail")) : [],
      backupStarredMails: JSON.parse(sessionStorage.getItem("allStarredMail")) ? JSON.parse(sessionStorage.getItem("allStarredMail")) : [],
      sentMails: JSON.parse(sessionStorage.getItem("allSentMail")) ? JSON.parse(sessionStorage.getItem("allSentMail")) : [],
      backupSentMails: JSON.parse(sessionStorage.getItem("allSentMail")) ? JSON.parse(sessionStorage.getItem("allSentMail")) : [],
      currentSendingMail: JSON.parse(sessionStorage.getItem("currentSendingMails")) ? JSON.parse(sessionStorage.getItem("currentSendingMails")) : [],
      notifications: JSON.parse(sessionStorage.getItem("allNotifications")) ? JSON.parse(sessionStorage.getItem("allNotifications")) : [],
      mailWatcher: JSON.parse(sessionStorage.getItem("mailWatcher")) ? JSON.parse(sessionStorage.getItem("mailWatcher")) : null,
      draftMails: JSON.parse(sessionStorage.getItem("draftMails"))
        ? JSON.parse(sessionStorage.getItem("draftMails"))
        : [],
      backupDraftMails: JSON.parse(sessionStorage.getItem("draftMails"))
        ? JSON.parse(sessionStorage.getItem("draftMails"))
        : [],
      selectedMail: null,
      selectedMenu: "inbox",
      firstTimeLoader: false,
      mailLoader: false,
      firstTime: true,
      lastSyncTime: moment().toString(),
      notificationMessage: "",
      showNotification: false,
      paginationConfig: {
        current: 1,
        count: 10,
      },
      refreshMailTimer: null,
      selectedDraft: {
        to: "",
        subject: "",
        body: [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ],
        attachments: [],
        tx_qty: "",
        unixTime: Math.round(new Date().getTime() / 1000),
        isDraft: true,
      },
    }
  );

  const actionContext = useMemo(
    () => ({
      //signin action
      signIn: async (pData) => {
        pData.userName = await ArweaveService.getName(pData.walletAddress);
        sessionStorage.setItem(
          "wallet",
          JSON.stringify(pData.walletPrivateKey)
        );
        // store wallet in session
        sessionStorage.setItem("walletAddress", pData.walletAddress);
        sessionStorage.setItem("userName", pData.userName);
        dispatch({ type: "SIGN_IN", wallet: pData });
      },
      //sign out action
      signOut: (refreshMailTimer, mailWatcher) => {
        // remove all session wallet related item
        sessionStorage.removeItem("wallet");
        sessionStorage.removeItem("walletAddress");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("isNotLanding");
        sessionStorage.removeItem("allNotifications");
        sessionStorage.removeItem("currentSendingMails");
        sessionStorage.removeItem("mailWatcher");
        clearInterval(mailWatcher)
        clearInterval(refreshMailTimer);
        dispatch({ type: "SIGN_OUT" });
        dispatch({ type: "TOGGLE_LANDING", isLanding: true });
        dispatch({ type: "SET_FIRST_TIME", firstTime: true });
        dispatch({ type: "MENU_SELECTED", mail: 'inbox' });
        dispatch({ type: "TOGGLE_COMPOSE_MAIL", open: false });
        dispatch({ type: "SET_CURRENT_CURRENT_SENDING_MAIL", currentSendingMail: [] });
        dispatch({ type: "SET_NOTIFICATIONS", notifications: [] });
        dispatch({ type: "SET_MAIL_WATCHER", mailWatcher: null });

      },
      // not required anywhere, leaving it for the future scope
      restoreWallet: () => {
        const data = {
          walletPrivateKey: JSON.parse(sessionStorage.getItem("wallet")),
          walletAddress: sessionStorage.getItem("walletAddress"),
          userName: sessionStorage.getItem("userName"),
        };
        dispatch({ type: "RESTORE_TOKEN", wallet: data });
      },
      // toggle landing page action
      toggleLandingPage: (landingPage) => {
        if (landingPage) {
          sessionStorage.setItem("isNotLanding", JSON.stringify(landingPage));
        } else {
          sessionStorage.removeItem("isNotLanding");
        }
        dispatch({ type: "TOGGLE_LANDING", isLanding: !landingPage });
      },
      // toggle compose mail box action
      toggleComposeMail: (pFlag) => {
        dispatch({ type: "TOGGLE_COMPOSE_MAIL", open: pFlag });
      },
      // refresh all mails action
      refreshAllMail: async (wallet, isFirstTime, lastSyncTime, allInboxMail) => {
        if (isFirstTime && !allInboxMail.length) {
          // open the first time loader
          dispatch({ type: "SET_FIRST_TIME_LOADER", firstTimeLoader: true });
        } else {
          // open the refresh mail loader
          dispatch({ type: "SET_MAIL_LOADER", mailLoader: true });
        }
        // quering arweave for all mails
        const allMail = await ArweaveService.refreshInbox(wallet);
        const paginationConfig = state.paginationConfig;
        const startingPagination =
          (paginationConfig.current - 1) * paginationConfig.count;
        const endingPagination =
          paginationConfig.current * paginationConfig.count - 1;
        const finalMails = allMail.filter(
          (mail, index) =>
            index >= startingPagination && index <= endingPagination
        );
        //storing all mails in the session
        sessionStorage.setItem("allInboxMail", JSON.stringify(finalMails));
        // storing all mails in the state 
        dispatch({
          type: "ALL_MAIL_FETCHED",
          mails: { allMail: finalMails, backupMails: allMail },
        });
        // querying all starred mail ids from the arweave
        const starredMailIds = await ArweaveService.getStarredMails(
          sessionStorage.getItem("walletAddress")
        );
        // filter starred mail from all mails
        const starredMails = allMail.filter((mail) =>
          starredMailIds.map((star) => star.mailTxId).includes(mail.id)
        );
        // storing starred mail in the session
        sessionStorage.setItem("allStarredMail", JSON.stringify(starredMails));

        // querying all sent mails from the arweave
        const sentMails = await ArweaveService.refreshOutbox(
          sessionStorage.getItem("walletAddress")
        );
        // storing all sent mails in the session
        sessionStorage.setItem("allSentMail", JSON.stringify(sentMails));

        // storing all sent mails in the state
        dispatch({ type: "SET_SENT_MAIL", sentMails });
        // storing starred mail in the state
        dispatch({ type: "SET_STARRED_MAIL", starredMails });
        // getting the last mail sync time 
        lastSyncTime = moment().toString();
        // storing it in the state
        dispatch({ type: "SET_LAST_SYNC_TIME", lastSyncTime });
        console.log("Done fetching")

        if (isFirstTime && !allInboxMail.length) {
          // close the first time loader
          dispatch({ type: "SET_FIRST_TIME_LOADER", firstTimeLoader: false });
        } else {
          // close the refresh mail loader
          dispatch({ type: "SET_MAIL_LOADER", mailLoader: false });
        }
      },
      // store selected mail in the state action
      selectMail: async (mail) => {
        dispatch({ type: "MAIL_SELECTED", mail });
      },
      // set the first time visit action
      setFirstTime: async (firstTime) => {
        dispatch({ type: "SET_FIRST_TIME", firstTime });
      },
      // set the draft mail action
      setDraftMails: async (draftMails) => {
        dispatch({ type: "SET_DRAFT_MAIL", draftMails });
      },
      // set selected draft mail action
      setSelectedDraftMails: async (selectedDraft) => {
        dispatch({ type: "SET_SELECTED_DRAFT_MAIL", selectedDraft });
      },
      // set the refresh mail timer action
      setRefreshMailTimer: async (refreshMailTimer) => {
        dispatch({ type: "SET_REFRESH_MAIL_TIMER", refreshMailTimer });
      },
      // select a menu action
      selectMenu: async (menu, backupMails, backupDraftMails, backupSentMails, backupStarredMails) => {
        //reset pagination when menu changes
        if(menu === "inbox") {
          let paginationConfig = {
            current: 1,
            count: 10,
          };
          const startingPagination =
            (paginationConfig.current - 1) * paginationConfig.count;
          const endingPagination =
            paginationConfig.current * paginationConfig.count - 1;
          const finalMails = backupMails.filter(
            (mail, index) =>
              index >= startingPagination && index <= endingPagination
          );
          dispatch({
            type: "SET_ALL_MAIL",
            allMail: finalMails,
          });
          dispatch({ type: "SET_PAGINATION_CONFIG", paginationConfig });
        
        }
        else if(menu === "sent") {
          let paginationConfig = {
            current: 1,
            count: 10,
          };
          const startingPagination =
            (paginationConfig.current - 1) * paginationConfig.count;
          const endingPagination =
            paginationConfig.current * paginationConfig.count - 1;
          const finalSentMails = backupSentMails.filter(
            (mail, index) =>
              index >= startingPagination && index <= endingPagination
          );
          dispatch({
            type: "SET_ONLY_SENT_MAIL",
            sentMails: finalSentMails,
          });
          dispatch({ type: "SET_PAGINATION_CONFIG", paginationConfig });
        } else if(menu === "starred") {
          let paginationConfig = {
            current: 1,
            count: 10,
          };
          const startingPagination =
            (paginationConfig.current - 1) * paginationConfig.count;
          const endingPagination =
            paginationConfig.current * paginationConfig.count - 1;
          const finalStarredMails = backupStarredMails.filter(
            (mail, index) =>
              index >= startingPagination && index <= endingPagination
          );
          dispatch({
            type: "SET_ONLY_STARRED_MAIL",
            starredMails: finalStarredMails,
          });
          dispatch({ type: "SET_PAGINATION_CONFIG", paginationConfig });
        } else if(menu === "draft"){
          let paginationConfig = {
            current: 1,
            count: 10,
          };
          const startingPagination =
            (paginationConfig.current - 1) * paginationConfig.count;
          const endingPagination =
            paginationConfig.current * paginationConfig.count - 1;
          const finalDraftMails = backupDraftMails.filter(
            (mail, index) =>
              index >= startingPagination && index <= endingPagination
          );
          dispatch({
            type: "SET_ONLY_DRAFT_MAILS",
            draftMails: finalDraftMails,
          });
          dispatch({ type: "SET_PAGINATION_CONFIG", paginationConfig });
        }
        dispatch({ type: "MAIL_SELECTED", mail: null });
        dispatch({ type: "MENU_SELECTED", menu });
      },
      // set a notification action
      setNotification: async (notificationMessage) => {
        dispatch({ type: "SET_NOTIFICATION_MESSAGE", notificationMessage });
        dispatch({ type: "SET_SHOW_NOTIFICATION", showNotification: true });
        setTimeout(() => {
          dispatch({ type: "SET_SHOW_NOTIFICATION", showNotification: false });
        }, 10000);
      },
      // close the notification action
      closeNotification: async () => {
        dispatch({ type: "SET_SHOW_NOTIFICATION", showNotification: false });
      },
      // set all the sending mails action
      setCurrentSendingMails: async (mailsList) => {
        sessionStorage.setItem("currentSendingMails", JSON.stringify(mailsList));
        dispatch({ type: "SET_CURRENT_CURRENT_SENDING_MAIL", currentSendingMail: mailsList });
      },
      // set all the notification action
      setNotifications: async (notifications) => {
        sessionStorage.setItem("allNotifications", JSON.stringify(notifications));
        dispatch({ type: "SET_NOTIFICATIONS", notifications });
      },
      // set the mail watcher action
      setMailWatcher: async (mailWatcher) => {
        sessionStorage.setItem("mailWatcher", JSON.stringify(mailWatcher));
        dispatch({ type: "SET_MAIL_WATCHER", mailWatcher });
      },
      // search all inbox mails
      searchMails: async (search, backupMails) => {
        const filteredMails = backupMails.filter(
          (mail) =>
            mail.subject.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
        dispatch({
          type: "SET_ALL_MAIL",
          allMail: filteredMails,
        });
      },
      // set the pagination action
      setPagination: (prevPaginationConfig, paginationType, backupMails, actionType, mailName) => {
        let paginationConfig = {
          ...prevPaginationConfig,
          current:
            paginationType === "next"
              ? prevPaginationConfig.current + 1
              : prevPaginationConfig.current - 1,
        };
        const startingPagination =
          (paginationConfig.current - 1) * paginationConfig.count;
        const endingPagination =
          paginationConfig.current * paginationConfig.count - 1;
        const finalMails = backupMails.filter(
          (mail, index) =>
            index >= startingPagination && index <= endingPagination
        );
        console.log(finalMails, mailName)
        const action = {
          type: actionType,
        }
        action[mailName] = finalMails
        dispatch(action);
        dispatch({ type: "SET_PAGINATION_CONFIG", paginationConfig });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </ActionContext.Provider>
  );
};
