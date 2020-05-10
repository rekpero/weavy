import React from "react";
import "./Auth.scss";
import { ArweaveService } from "../../services";
import { ActionContext } from "../../hook";

function Auth() {
  const { signIn } = React.useContext(ActionContext);
  // load file to json
  const walletLogin = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  // set pk json to state
  const handleFileRead = async (e) => {
    const jwk = JSON.parse(e.target.result);
    let address = await ArweaveService.getWalletAddress(jwk);
    signIn({ walletPrivateKey: jwk, walletAddress: address });
    // props.setWallet(jwk, address);
  };

  return (
    <div className="auth">
      <div className="widget-main-container">
        <div className="widget-container">
          <div>
            <h2 className="widget-title">Weavemail</h2>
          </div>
          <div className="wallet-input-field">
            <input
              className="wallet-file-import"
              type="file"
              id="file"
              accept="application/JSON"
              onChange={(e) => walletLogin(e.target.files[0])}
            />
            <div>Drop a wallet keyfile to login</div>
          </div>
          <div className="widget-description">
            <div>
              {" "}
              Weavemail is mail that <b>Google cannot read.</b>
            </div>
            <div>
              Mail that <b>cannot be censored.</b>
            </div>
            <div>
              Mail that <b>cannot be lost.</b>
            </div>
            <div>
              Weavemail is mail that <b>you own.</b>
            </div>
          </div>
          <div className="get-wallet-container">
            <a
              className="get-wallet-button"
              href="https://www.arweave.org/wallet"
            >
              Get a wallet with some tokens
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
