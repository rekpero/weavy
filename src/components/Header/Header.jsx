import React from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import makeBlockie from "ethereum-blockies-base64";

function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <h3 className="logo-name">Weavemail</h3>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" className="search-bar-input" />
        </div>
      </div>
      <div className="user-profile-container">
        <div className="notification-container">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div>
          <img
            src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
            alt="address-blockie"
            className="user-profile-blockie-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
