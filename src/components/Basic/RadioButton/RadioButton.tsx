"use client";

import React, { ChangeEventHandler } from "react";

import basic from "./RadioButton.module.scss";

type Props = {
  extraStyles?: any;
  text: string;
  id: string;

  value: string;
  onChange: ChangeEventHandler;
  name: string;
  disabled?: boolean;
};

function RadioButton(props: Props) {
  const { extraStyles = {}, id, text, value, onChange, name, disabled } = props;

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  const isSelecetd = id === value;

  return (
    <div
      className={`${styles("radio-button")} ${
        isSelecetd ? styles("selected") : ""
      }`}
    >
      <input
        type="radio"
        className={`${styles("input")} ${disabled ? styles("disabled") : ""}`}
        id={id}
        onChange={onChange}
        name={name}
        checked={isSelecetd}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles("radio-content")}>
        <div className={styles("radio-outer-circle")}>
          <div className={styles("radio-inner-circle")}></div>
        </div>
        <span className={styles("radio-text")}>{text}</span>
      </label>
    </div>
  );
}

export default RadioButton;
