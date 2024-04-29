"use client";

import React from "react";

import styles from "./Header.module.scss";

import Logo from "./logo.jpg";
import RedButton from "components/RedButton/RedButton";

type Props = {};

function Header(props: Props) {
  const {} = props;

  return (
    <header className={styles["header-wrapper"]}>
      <div className={styles["header-content"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={Logo.src} alt={"logo"} />
        </div>
        <RedButton title="להרשמה" href="#lead-form" type="a" />
      </div>
    </header>
  );
}

export default Header;
