"use client";

import React from "react";

import styles from "./GlowingButton.module.scss";

type Props = {
  title: string;
  href: string;
};

function GlowingButton(props: Props) {
  const { title, href } = props;
  return (
    <a className={styles["button"]} href={href}>
      {title}
    </a>
  );
}

export default GlowingButton;
