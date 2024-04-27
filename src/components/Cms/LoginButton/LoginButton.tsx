import React from "react";

import styles from "./LoginButton.module.scss";

type Props = {
  onClick: () => void;
  title: string;
};

function LoginButton(props: Props) {
  const { onClick, title } = props;

  return (
    <button className={styles["login-btn"]} onClick={onClick}>
      {title}
    </button>
  );
}

export default LoginButton;
