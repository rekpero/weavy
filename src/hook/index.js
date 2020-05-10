import React, { createContext, useMemo } from "react";

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
        default:
      }
    },
    {
      isMailLoading: true,
      wallet: JSON.parse(localStorage.getItem("wallet")),
      walletAddress: JSON.parse(localStorage.getItem("walletAddress")),
      openComposeMail: false,
    }
  );

  const actionContext = useMemo(
    () => ({
      signIn: (pData) => {
        localStorage.setItem("wallet", JSON.stringify(pData.walletPrivateKey));
        localStorage.setItem(
          "walletAddress",
          JSON.stringify(pData.walletAddress)
        );
        dispatch({ type: "SIGN_IN", wallet: pData });
      },
      signOut: () => {
        localStorage.removeItem("wallet");
        localStorage.removeItem("walletAddress");
        dispatch({ type: "SIGN_OUT" });
      },
      restoreWallet: () => {
        const data = {
          walletPrivateKey: JSON.parse(localStorage.getItem("wallet")),
          walletAddress: JSON.parse(localStorage.getItem("walletAddress")),
        };
        dispatch({ type: "RESTORE_TOKEN", wallet: data });
      },
      toggleComposeMail: (pFlag) => {
        dispatch({ type: "TOGGLE_COMPOSE_MAIL", open: pFlag });
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
