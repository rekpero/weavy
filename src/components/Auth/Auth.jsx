import React from 'react';
import './Auth.scss';

function Auth() {
  return (
    <div className="weavemail-auth-widget">
      <div className="widget-main-container">
          <div className="widget-container">
            <div>
              <h2>Weavemail</h2>
            </div>
            <div>
              <input class="clickable" type="file" id="file" onchange="login(this.files)" />
              <div id="desc">Drop a wallet keyfile to login</div>
            </div>
            <div></div>
            <div></div>
          </div>
      </div>

    </div>
  );
}

export default Auth;
