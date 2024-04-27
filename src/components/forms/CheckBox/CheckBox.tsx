"use client";

import React, { ChangeEventHandler } from "react";

import basic from "./CheckBox.module.scss";

import CheckBoxEmpty from "/public/assets/icons/checkbox/checkbox.svg";
import CheckBoxFull from "/public/assets/icons/checkbox/checkbox-selected.svg";

type Props = {
  extraStyles?: any;
  id: string;
  name: string;
  label?: string;
  value: boolean;
  onChange: ChangeEventHandler;
  className?: string;
};

function CheckBox(props: Props) {
  const {
    className = "",
    id,
    name,
    label = "",
    value = false,
    onChange,
    extraStyles = {},
  } = props;

  const styles = (className: string) => {
    return (basic[className] ?? "") + " " + (extraStyles[className] ?? "");
  };

  const image = value ? CheckBoxFull.src : CheckBoxEmpty.src;
  return (
    <div
      className={`${styles("checkbox-wrapper")} ${
        value ? styles("selecetd") : ""
      } ${className}`}
    >
      <input
        type={"checkbox"}
        name={name}
        id={id}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <div className={styles("image-wrapper")}>
          <img src={image} />
        </div>

        {label && <span className={styles("label")}>{label}</span>}
      </label>
    </div>
  );
}

export default CheckBox;
