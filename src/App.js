import React, { useEffect } from "react";
import "./App.scss";
// import Home from './components/Home'
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Home from "./components/Home";
import { StateContext, ActionContext } from "./hook";
import Loader from "./components/Loader";

function App() {
  const { wallet, firstTimeLoader } = React.useContext(StateContext);
  const { restoreWallet } = React.useContext(ActionContext);

  useEffect(() => {
    // restoreWallet();
  }, []);

  return (
    <div className="App">
      {wallet ? (
        firstTimeLoader ? (
          <div className="mail-loader-container">
            <Loader loaderType="box"></Loader>
            <div className="mail-loader-text">Loading...</div>
          </div>
        ) : (
          <>
            <Header></Header>
            <Home></Home>
          </>
        )
      ) : (
        <Auth></Auth>
      )}
    </div>
  );
}

export default App;
