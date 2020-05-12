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
            allMail: action.allMail,
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
        default:
      }
    },
    {
      isMailLoading: true,
      wallet: JSON.parse(sessionStorage.getItem("wallet")),
      walletAddress: JSON.parse(sessionStorage.getItem("walletAddress")),
      openComposeMail: false,
      allMail: [],
      selectedMail: null,
      selectedMenu: "inbox",
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
        dispatch({ type: "ALL_MAIL_FETCHED", allMail });
      },
      selectMail: async (mail) => {
        console.log(mail);
        dispatch({ type: "MAIL_SELECTED", mail });
      },
      selectMenu: async (menu) => {
        console.log(menu);
        dispatch({ type: "MENU_SELECTED", menu });
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
