"use client";

import { React } from "react";

import basic from "./CmsButton.module.scss";

function CmsButton(props) {
  const {
    extraStyles = {},
    className = "",
    onClick,
    title = "",
    isDisabled,
    size = false,
  } = props;

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  return (
    <button
      className={`${styles("button")} ${styles(className)} ${
        isDisabled ? styles("disabled") : ""
      } ${size ? styles("size") : ""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default CmsButton;
