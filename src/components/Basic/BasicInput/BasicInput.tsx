import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  forwardRef,
} from "react";

import basic from "./BasicInput.module.scss";
import { onKeyDownInput } from "utils/types/inputs";

type Props = {
  extraStyles?: Object;
  value: string | number;
  onChange: ChangeEventHandler;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;

  onFocus?: () => void;
  onBlur?: () => void;
  type?: HTMLInputTypeAttribute;
  className?: string;
  onKeyDown?: (e: onKeyDownInput) => void;
};

const BasicInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    extraStyles = {},
    value,
    onChange,
    id = "",
    name = "",
    placeholder = "",
    type = "",
    disabled = false,
    onFocus = () => {},
    onBlur = () => {},
    className = "",
    onKeyDown = () => {},
  } = props;

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  function onKeyDownHandler(e: onKeyDownInput) {
    if (type === "number" && exceptThisSymbols.includes(e.key)) {
      e.preventDefault();
    }
    typeof onKeyDown === "function" && onKeyDown(e);
  }

  return (
    <input
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      className={`${styles("input")} ${
        disabled ? styles("disabled") : ""
      } ${className}`}
      placeholder={placeholder}
      type={type}
      pattern={type === "number" ? "[0-9]*" : ".{0,}"}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={ref}
      onKeyDown={onKeyDownHandler}
    />
  );
});
BasicInput.displayName = "BasicInput";

export default BasicInput;
