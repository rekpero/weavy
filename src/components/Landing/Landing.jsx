import React from "react";
import TextLoop from "react-text-loop";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ActionContext } from "../../hook";
import "./Landing.scss";

function Landing() {
  const { toggleLandingPage } = React.useContext(ActionContext);
  const [selectedUsage, setSelectedUsage] = React.useState(0);
  const usageList = [
    "yWXfY1_YpL3rNcTCYdepWK13GwmRIZhjIoqNizLFYVo",
    "pSvIUgcl3npQmaBLr2hj5qQdLOh7FPORlDFEUwr50ZI",
    "6yc5bDppM04XFdU5cLdBI7xm1MPeui2OjciKCGxVrXA",
  ];

  const sendToAuth = () => {
    toggleLandingPage(true);
  };

  return (
    <div className="landing">
      <div className="landing-container" id="home">
        <div className="squares square1" />
        <div className="squares square3" />
        <div className="squares square5" />
        <div className="squares square7" />
        <div className="header-section">
          <div className="header-bar">
            <div className="header-app-icon">weavy.</div>
            <div className="header-action-button-container">
              <div className="header-tabs">
                <AnchorLink href="#home">Home</AnchorLink>
              </div>
              <div className="header-tabs">
                <AnchorLink href="#feature">Features</AnchorLink>
              </div>
              <div className="header-tabs">
                <AnchorLink href="#usage">How to Use?</AnchorLink>
              </div>
              <div className="header-tabs">
                <button className="header-play-buttons" onClick={sendToAuth}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section">
          <div className="home-placeholder">
            <div className="home-text-container">
              <div className="home-title-container">
                <h1 className="home-title">
                  Email made
                  <br />
                  <TextLoop interval={2000}>
                    <span className="home-title">safer.</span>
                    <span className="home-title">faster.</span>
                    <span className="home-title">better.</span>
                    <span className="home-title">easier.</span>
                    <span className="home-title">quicker.</span>
                    <span className="home-title">permanent.</span>
                  </TextLoop>
                </h1>
              </div>
              <div className="home-tagline">
                <span className="highlight">Weve</span> lets you communicate
                with <span className="highlight">safety and security</span>.
                <br />
                Begin <span className="highlight">sending messages</span> on the
                Arweave permaweb.
              </div>
              <div className="get-started-container">
                <button className="header-play-buttons" onClick={sendToAuth}>
                  Get Started
                </button>
              </div>
            </div>
            <div className="home-icon-container"></div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div className="feature-section" id="feature">
          <div className="feature-container">
            <h1 className="feature-title">End-to-end security</h1>
            <p className="feature-description">
              Weve runs on the Arweave network so messages are <i>permanent</i>{" "}
              and <i>uncensorable</i>.
            </p>
            <p className="feature-description">
              Messages are <i>encrypted</i> and delivered using{" "}
              <i>decentralized</i> technologies; cutting the middle-man.
            </p>
            <div className="feature-showcase">
              <div className="feature-item">
                <div>
                  <img
                    src="https://pspfqlx3qgd7.arweave.net/Il2bA6IuoancZwMYqH9t3nPOdKRP94WqbGmrQwc_b_0/private.png"
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Encrypted</h3>
                <p className="feature-description">
                  Weve encrypts your data with RSA-OAEP to ensure security.
                </p>
              </div>
              <div className="feature-item">
                <div>
                  <img
                    src="https://pspfqlx3qgd7.arweave.net/Il2bA6IuoancZwMYqH9t3nPOdKRP94WqbGmrQwc_b_0/uncensorable.png"
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Uncensorable</h3>
                <p className="feature-description">
                  Hosted on the Arweave permaweb, Weve can't be censored.
                </p>
              </div>
              <div className="feature-item">
                <div>
                  <img
                    src="https://pspfqlx3qgd7.arweave.net/Il2bA6IuoancZwMYqH9t3nPOdKRP94WqbGmrQwc_b_0/decentralized.png"
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Decentralized</h3>
                <p className="feature-description">
                  Weve skips the middle-man and harnesses the blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="usage-section" id="usage">
          <div className="usage-container">
            <h1>How do I use weavy?</h1>
            <p>
              It's a simple <span className="highlight">3-step process</span>.
            </p>
            <div className="usage-demo-container">
              <div className="usage-list-container">
                <div
                  className={`usage-list-item ${
                    selectedUsage === 0 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(0)}
                >
                  <div className="usage-number">1</div>
                  <div className="usage-details">
                    <div className="usage-details-title">
                      Create Arweave Wallet
                    </div>
                    <div className="usage-details-description">
                      First, create a permaweb wallet.
                    </div>
                  </div>
                </div>
                <div
                  className={`usage-list-item ${
                    selectedUsage === 1 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(1)}
                >
                  <div className="usage-number">2</div>
                  <div className="usage-details">
                    <div className="usage-details-title">Login to weavy</div>
                    <div className="usage-details-description">
                      Use your wallet to sign-in.
                    </div>
                  </div>
                </div>
                <div
                  className={`usage-list-item ${
                    selectedUsage === 2 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(2)}
                >
                  <div className="usage-number">3</div>
                  <div className="usage-details">
                    <div className="usage-details-title">
                      Send messages with weavy
                    </div>
                    <div className="usage-details-description">
                      Use weavy to send and receive!
                    </div>
                  </div>
                </div>
              </div>
              <div className="usage-image-container">
                <img
                  src={"https://arweave.net/" + usageList[selectedUsage]}
                  alt="demo-icon"
                  className="usage-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div className="footer-container">
          <div className="footer-app-section">
            <h1 className="footer-app-name">weavy.</h1>
            <p>
              Built with{" "}
              <span role="img" aria-label="Purple heart">
                💜
              </span>{" "}
              in{" "}
              <a
                href="https://github.com/mmitrasish/weavy"
                target="_blank"
                rel="noopener noreferrer"
                className="open-source"
              >
                open-source
              </a>
              .
            </p>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Quick Links</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arweave
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/technology#permaweb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Permaweb
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/get-involved/community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Community
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/mine/learn-more"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Navigations</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <AnchorLink href="#home" className="footer-link">
                  Home
                </AnchorLink>
              </li>
              <li className="footer-link-item">
                <AnchorLink href="#feature" className="footer-link">
                  Feature
                </AnchorLink>
              </li>
              <li className="footer-link-item">
                <AnchorLink href="#usage" className="footer-link">
                  Demo
                </AnchorLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
