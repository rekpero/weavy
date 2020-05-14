import React, { createContext, useMemo } from "react";
import { ArweaveService } from "../services";

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
      refreshAllMail: async (wallet) => {
        const allMail = await ArweaveService.refreshInbox(wallet);
        console.log(allMail);
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
        // console.log(starredMails);
        const starredMails = allMail.filter((mail) =>
          starredMailIds.map((star) => star.mailTxId).includes(mail.id)
        );
        // console.log(starredMails);
        dispatch({ type: "SET_STARRED_MAIL", starredMails });
      },
      selectMail: async (mail) => {
        // console.log(mail);
        dispatch({ type: "MAIL_SELECTED", mail });
      },
      selectMenu: async (menu) => {
        // console.log(menu);
        dispatch({ type: "MAIL_SELECTED", mail: null });
        dispatch({ type: "MENU_SELECTED", menu });
      },
      setPagination: (prevPaginationConfig, paginationType, backupMails) => {
        console.log(
          prevPaginationConfig,
          paginationType === "next"
            ? state.paginationConfig.current + 1
            : state.paginationConfig.current - 1
        );
        let paginationConfig = {
          ...prevPaginationConfig,
          current:
            paginationType === "next"
              ? prevPaginationConfig.current + 1
              : prevPaginationConfig.current - 1,
        };
        // console.log(paginationConfig);
        const startingPagination =
          (paginationConfig.current - 1) * paginationConfig.count;
        const endingPagination =
          paginationConfig.current * paginationConfig.count - 1;
        // console.log(endingPagination, startingPagination, state.backupMails);
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
