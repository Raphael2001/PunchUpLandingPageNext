import React from "react";

import styles from "./AnimatedBlobImage.module.scss";

type Props = {};

import Theme from "./theme-image.webp";

function AnimatedBlobImage(props: Props) {
  return (
    <div className={styles["image"]}>
      <img src={Theme.src} alt="test" />
    </div>
  );
}

export default AnimatedBlobImage;
