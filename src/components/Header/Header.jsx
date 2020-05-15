import React from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faCopy } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import makeBlockie from "ethereum-blockies-base64";
import { ActionContext, StateContext } from "../../hook";
import copy from "clipboard-copy";
import { shortenAddress } from "../../utils";

function Header() {
  const { signOut, searchMails } = React.useContext(ActionContext);
  const { walletAddress, backupMails } = React.useContext(StateContext);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const logout = () => {
    signOut();
  };
  const copyWalletAddress = () => {
    copy(walletAddress);
  };
  return (
    <div className="header">
      <div className="logo-container">
        <h3 className="logo-name">Weavemail</h3>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search mail"
            onChange={(e) => searchMails(e.target.value, backupMails)}
          />
        </div>
      </div>
      <div className="user-profile-container">
        {/* <div className="notification-container">
          <FontAwesomeIcon icon={faBell} />
        </div> */}
        <div onClick={(e) => setShowDropdown(!showDropdown)}>
          <img
            src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
            alt="address-blockie"
            className="user-profile-blockie-icon"
          />
        </div>
      </div>
      {showDropdown && (
        <div
          className="dropdown-overlay"
          onClick={(e) => setShowDropdown(false)}
        ></div>
      )}
      {showDropdown && (
        <div className="toolbar-dropdown-box">
          <div className="toolbar-dropdown-profile-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="wallet-address-container" onClick={copyWalletAddress}>
            <div className="dropdown-title">
              {shortenAddress(walletAddress)}
            </div>
            <div className="wallet-address-copy">
              <FontAwesomeIcon icon={faCopy} />
            </div>
          </div>
          <div className="dropdown-menu-button-container">
            <button
              type="button"
              onClick={logout}
              className="dropdown-menu-button"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
