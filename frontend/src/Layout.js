import React from "react";
import logo from "./rhjb_eap_logo.png";
import "./App.css";

const Layout = ({ children }) => {
  return (
    <div id="container">
      <div className="dualbrand">
        <img src={logo} width="300" height="175" alt="Logo" />
      </div>
      <div id="content">{children}</div>
      <div id="aside">
        <p>Learn more about Red Hat JBoss Enterprise Application Platform.</p>
        <ul>
          <li>
            <a href="https://access.redhat.com/documentation/en/red-hat-jboss-enterprise-application-platform/">
              Documentation
            </a>
          </li>
          <li>
            <a href="http://www.redhat.com/en/technologies/jboss-middleware/application-platform">
              Product Information
            </a>
          </li>
        </ul>
      </div>
      <div id="footer">
        <p>
          This project was generated from a Maven archetype from JBoss.
          <br />
        </p>
      </div>
    </div>
  );
};

export default Layout;
