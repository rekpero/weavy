import React from "react";
import "./App.scss";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Home from "./components/Home";
import { StateContext } from "./hook";
import Loader from "./components/Loader";
import Landing from "./components/Landing/Landing";

function App() {
  const { wallet, firstTimeLoader, isLanding } = React.useContext(StateContext);

  return (
    <>
      {!isLanding ? (
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
      ) : (
        <Landing></Landing>
      )}
    </>
  );
}

export default App;
