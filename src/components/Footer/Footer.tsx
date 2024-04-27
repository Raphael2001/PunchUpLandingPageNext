import React from "react";

import styles from "./Footer.module.scss";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const version = publicRuntimeConfig?.version;

function Footer() {
  return (
    <footer className={styles["footer-wrapper"]}>
      <span className={styles["version-num"]}>v{version}</span>

      <a
        className={styles["credit-link"]}
        target="_blank"
        href="https://raphael.aboohi.net"
      >
        created by Raphael Aboohi Inc.
      </a>
    </footer>
  );
}

export default Footer;
