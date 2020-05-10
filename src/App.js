import React, { useEffect } from "react";
import "./App.scss";
// import Home from './components/Home'
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Home from "./components/Home";
import { StateContext, ActionContext } from "./hook";

function App() {
  const { wallet } = React.useContext(StateContext);
  const { restoreWallet } = React.useContext(ActionContext);

  useEffect(() => {
    restoreWallet();
  }, []);

  return (
    <div className="App">
      {wallet ? (
        <>
          <Header></Header>
          <Home></Home>
        </>
      ) : (
        <Auth></Auth>
      )}
    </div>
  );
}

export default App;
