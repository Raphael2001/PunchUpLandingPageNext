import React from "react";

import styles from "./HomeBanner.module.scss";

import Banner from "./banner.webp";

type Props = {};

function HomeBanner(props: Props) {
  return (
    <div className={styles["home-banner"]}>
      <div className={styles["top-banner-bg-media"]}>
        <img src={Banner.src} />
      </div>
      <div className={styles["banner-content"]}>
        <h1 className={styles["title"]}>Punch up</h1>
        <h2 className={styles["subtitle"]}>fitness & boxing</h2>
      </div>
    </div>
  );
}

export default HomeBanner;
