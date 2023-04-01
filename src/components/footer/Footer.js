import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="public__footer__container">
      <a href="https://jamilthedev.netlify.app/">
        <p
          style={{
            color: "var(--color-primary)",
            fontSize: "1em",
            cursor: "pointer",
            fontFamily: "Acme",
          }}
        >
          Developed by JamilTheDev
        </p>
      </a>
    </div>
  );
};

export default Footer;
