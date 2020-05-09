import React from "react";
import "./App.scss";
// import Home from './components/Home'
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
    </div>
  );
}

export default App;
