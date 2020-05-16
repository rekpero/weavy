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
          };
        case "SIGN_IN":
          return {
            ...prevState,
            wallet: action.wallet.walletPrivateKey,
            walletAddress: action.wallet.walletAddress,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            wallet: null,
            walletAddress: "",
          };
        case "TOGGLE_COMPOSE_MAIL":
          return {
            ...prevState,
            openComposeMail: action.open,
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
        default:
      }
    },
    {
      isMailLoading: true,
      wallet: JSON.parse(sessionStorage.getItem("wallet")),
      walletAddress: JSON.parse(sessionStorage.getItem("walletAddress")),
      openComposeMail: false,
      allMail: [],
      backupMails: [],
      starredMails: [],
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
    }
  );

  const actionContext = useMemo(
    () => ({
      signIn: (pData) => {
        sessionStorage.setItem(
          "wallet",
          JSON.stringify(pData.walletPrivateKey)
        );
        sessionStorage.setItem(
          "walletAddress",
          JSON.stringify(pData.walletAddress)
        );
        dispatch({ type: "SIGN_IN", wallet: pData });
      },
      signOut: () => {
        sessionStorage.removeItem("wallet");
        sessionStorage.removeItem("walletAddress");
        dispatch({ type: "SIGN_OUT" });
        dispatch({ type: "SET_FIRST_TIME", firstTime: true });
      },
      restoreWallet: () => {
        const data = {
          walletPrivateKey: JSON.parse(sessionStorage.getItem("wallet")),
          walletAddress: JSON.parse(sessionStorage.getItem("walletAddress")),
        };
        dispatch({ type: "RESTORE_TOKEN", wallet: data });
      },
      toggleComposeMail: (pFlag) => {
        dispatch({ type: "TOGGLE_COMPOSE_MAIL", open: pFlag });
      },
      refreshAllMail: async (wallet, isFirstTime, lastSyncTime) => {
        if (isFirstTime) {
          dispatch({ type: "SET_FIRST_TIME_LOADER", firstTimeLoader: true });
        } else {
          dispatch({ type: "SET_MAIL_LOADER", mailLoader: true });
        }
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
        dispatch({
          type: "ALL_MAIL_FETCHED",
          mails: { allMail: finalMails, backupMails: allMail },
        });
        const starredMailIds = await ArweaveService.getStarredMails(
          JSON.parse(sessionStorage.getItem("walletAddress"))
        );
        const starredMails = allMail.filter((mail) =>
          starredMailIds.map((star) => star.mailTxId).includes(mail.id)
        );
        dispatch({ type: "SET_STARRED_MAIL", starredMails });
        lastSyncTime = moment().toString();
        dispatch({ type: "SET_LAST_SYNC_TIME", lastSyncTime });

        if (isFirstTime) {
          dispatch({ type: "SET_FIRST_TIME_LOADER", firstTimeLoader: false });
        } else {
          dispatch({ type: "SET_MAIL_LOADER", mailLoader: false });
        }
      },
      selectMail: async (mail) => {
        dispatch({ type: "MAIL_SELECTED", mail });
      },
      setFirstTime: async (firstTime) => {
        dispatch({ type: "SET_FIRST_TIME", firstTime });
      },
      selectMenu: async (menu) => {
        dispatch({ type: "MAIL_SELECTED", mail: null });
        dispatch({ type: "MENU_SELECTED", menu });
      },
      setNotification: async (notificationMessage) => {
        dispatch({ type: "SET_NOTIFICATION_MESSAGE", notificationMessage });
        dispatch({ type: "SET_SHOW_NOTIFICATION", showNotification: true });
        setTimeout(() => {
          dispatch({ type: "SET_SHOW_NOTIFICATION", showNotification: false });
        }, 10000);
      },
      closeNotification: async () => {
        dispatch({ type: "SET_SHOW_NOTIFICATION", showNotification: false });
      },
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
      setPagination: (prevPaginationConfig, paginationType, backupMails) => {
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
        dispatch({
          type: "SET_ALL_MAIL",
          allMail: finalMails,
        });
        dispatch({ type: "SET_PAGINATION_CONFIG", paginationConfig });
      },
    }),
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
