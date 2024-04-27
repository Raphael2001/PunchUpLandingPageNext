import React, { ChangeEventHandler, useState } from "react";

import basic from "./index.module.scss";
import BasicInput from "components/Basic/BasicInput/BasicInput";

import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";
import AnimatedPlaceholder from "components/Basic/AnimatedPlaceholder/AnimatedPlaceholder";
type Props = {
  value: string | number;
  onChange: ChangeEventHandler;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  showError?: boolean;
  errorMessage?: string;
  extraStyles?: Object;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: string;
};

function AnimatedInput(props: Props) {
  const {
    value,
    onChange,
    id = "",
    name = "",
    className = "",
    placeholder = "",
    type = "",
    disabled = false,
    showError = false,
    errorMessage = "",
    extraStyles = {},
    onFocus = () => {},
    onBlur = () => {},
  } = props;

  const [isFocus, setIsFocus] = useState(false);

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  function onFocusHandler() {
    setIsFocus(true);
    typeof onFocus === "function" && onFocus();
  }
  function onBlurHandler() {
    setIsFocus(false);
    typeof onBlur === "function" && onBlur();
  }

  const isAnimated = !!value || isFocus;

  return (
    // Input wrapper
    <div className={`${styles("animated-input-wrapper")} ${className}`}>
      <BasicInput
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        type={type}
        disabled={disabled}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />

      <AnimatedPlaceholder
        id={id}
        placeholder={placeholder}
        isAnimated={isAnimated}
        isFocus={isFocus}
      />

      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default AnimatedInput;
