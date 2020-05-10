import React from "react";
import "./Home.scss";
import Sidebar from "../Sidebar";
import MailBox from "../MailBox";
import ComposeMailBox from "../ComposeMailBox";
import ViewMail from "../ViewMail";
import { StateContext } from "../../hook";

function Home() {
  const { openComposeMail } = React.useContext(StateContext);
  return (
    <div className="home">
      <Sidebar></Sidebar>
      <MailBox></MailBox>
      <ViewMail></ViewMail>
      {openComposeMail && <ComposeMailBox></ComposeMailBox>}
    </div>
  );
}

export default Home;
