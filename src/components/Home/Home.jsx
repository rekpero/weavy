import React from "react";
import "./Home.scss";
import Sidebar from "../Sidebar";
import MailBox from "../MailBox";
import ComposeMailBox from "../ComposeMailBox";
import ViewMail from "../ViewMail";

function Home() {
  return (
    <div className="home">
      <Sidebar></Sidebar>
      <MailBox></MailBox>
      <ViewMail></ViewMail>
      <ComposeMailBox></ComposeMailBox>
    </div>
  );
}

export default Home;
