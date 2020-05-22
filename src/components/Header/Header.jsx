import React from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCopy,
  faExternalLinkSquareAlt,
  faBell,
  faBellSlash
} from "@fortawesome/free-solid-svg-icons";
import makeBlockie from "ethereum-blockies-base64";
import { ActionContext, StateContext } from "../../hook";
import copy from "clipboard-copy";
import { shortenAddress } from "../../utils";

function Header() {
  const { signOut, searchMails } = React.useContext(ActionContext);
  const { walletAddress, backupMails, userName, refreshMailTimer, notifications, mailWatcher } = React.useContext(StateContext);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = React.useState(false);
  const logout = () => {
    signOut(refreshMailTimer, mailWatcher);
  };
  const copyWalletAddress = () => {
    copy(walletAddress);
  };
  const openArweaveIdLink = () => {
    window.open(
      "https://alz4bdsrvmoz.arweave.net/fGUdNmXFmflBMGI2f9vD7KzsrAc1s1USQgQLgAVT0W0",
      "_blank"
    );
  };
  return (
    <div className="header">
      <div className="logo-container">
        <h3 className="logo-name">weavy.</h3>
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
        <div className="notification-container" onClick={(e) => setShowNotificationDropdown(!showNotificationDropdown)}>
          <FontAwesomeIcon icon={faBell} />
        </div>
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
              {shortenAddress(userName)}
            </div>
            <div className="wallet-address-copy">
              <FontAwesomeIcon icon={faCopy} />
            </div>
          </div>
          <div className="wallet-address-container" onClick={openArweaveIdLink}>
            <div className="dropdown-title">Configure ArweaveId</div>
            <div className="wallet-address-copy">
              <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
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
      {showNotificationDropdown && (
        <div
          className="dropdown-overlay"
          onClick={(e) => setShowNotificationDropdown(false)}
        ></div>
      )}
      {showNotificationDropdown && (
        <div className="toolbar-notification-dropdown-box">
          {notifications.length ? notifications.map((notification, i) => <div className="notification-item" key={i}>
          <a className="notification-item-link"
            href={`https://viewblock.io/arweave/tx/${notification.txId}`}
            target="_blank"
            rel="noopener noreferrer"><b>{notification.message}</b>{" "}TxId: 
            <span className="mail-tx-id">{notification.txId}</span>
            </a>
            </div>) : (
              <div className="no-notifications">
                <div className="no-notifications-icon">
                  <FontAwesomeIcon icon={faBellSlash} />
                </div>
                <div>No notifications to show</div>
                </div>
              )}
        </div>
      )}
    </div>
  );
}

export default Header;
