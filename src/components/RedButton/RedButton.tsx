import React from "react";

import styles from "./RedButton.module.scss";

type Props = {
  title: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "a";
};

function RedButton(props: Props) {
  const { title, onClick, type = "button", href = "#" } = props;
  if (type === "a") {
    return (
      <a href={href} className={styles["btn"]}>
        <span className={styles["btn-text"]}>{title}</span>
      </a>
    );
  }
  return (
    <button className={styles["btn"]} onClick={onClick}>
      <span className={styles["btn-text"]}>{title}</span>
    </button>
  );
}

export default RedButton;
