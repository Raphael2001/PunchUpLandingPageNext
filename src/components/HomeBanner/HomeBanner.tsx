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
        <h1 className={styles["title"]}>PUNCH UP</h1>
        <h2 className={styles["subtitle"]}>FITNESS & BOXING</h2>
      </div>
    </div>
  );
}

export default HomeBanner;
