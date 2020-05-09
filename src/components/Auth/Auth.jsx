import React from "react";
import "./Auth.scss";

function Auth() {
  return (
    <div className="auth">
      <div className="widget-main-container">
        <div className="widget-container">
          <div>
            <h2 className="widget-title">Weavemail</h2>
          </div>
          <div className="wallet-input-field">
            <input class="wallet-file-import" type="file" id="file" />
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
