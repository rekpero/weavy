import React from "react";
import "./Home.scss";
import Sidebar from "../Sidebar";
import MailBox from "../MailBox";
import ComposeMailBox from "../ComposeMailBox";
import ViewMail from "../ViewMail";
import { StateContext, ActionContext } from "../../hook";

function Home() {
  const { openComposeMail, wallet } = React.useContext(StateContext);
  const { refreshAllMail } = React.useContext(ActionContext);

  React.useEffect(() => {
    setTimeout(() => {
      refreshAllMail(wallet);
      setInterval(() => {
        refreshAllMail(wallet);
      }, 20000);
    }, 1000);
  }, []);
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
