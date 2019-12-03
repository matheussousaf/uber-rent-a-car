import React, { Component } from "react";
import "./Footer.css";
import UberWhiteLogo from "../../assets/images/uberwhite.png";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <img className="white-logo" src={UberWhiteLogo} alt="Uber Logo"></img>
        <p> ® Please don't copyright me</p>
        <p className="special-thanks">Made with some ❤️ by Matheus</p>
      </div>
    );
  }
}
