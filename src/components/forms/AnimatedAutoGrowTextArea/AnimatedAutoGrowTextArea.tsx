import React, { ChangeEventHandler, useState } from "react";

import styles from "./AnimatedAutoGrowTextArea.module.scss";
import AutoGrowTextArea from "../AutoGrowTextArea/AutoGrowTextArea";
import AnimatedPlaceholder from "components/Basic/AnimatedPlaceholder/AnimatedPlaceholder";

type Props = {
  value: string | number;
  onChange: ChangeEventHandler;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;

  onFocus?: () => void;
  onBlur?: () => void;

  className?: string;

  showError?: boolean;
  errorMessage?: string;
};

function AnimatedAutoGrowTextArea(props: Props) {
  const {
    value,
    onChange,
    id = "",
    name = "",
    placeholder = "",
    disabled = false,
    onFocus = () => {},
    onBlur = () => {},
    className = "",
    showError = false,
    errorMessage = "",
  } = props;

  const [isFocus, setIsFocus] = useState(false);

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
    <div className={`${styles["animated-textarea-wrapper"]} ${className} `}>
      <AutoGrowTextArea
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        showError={showError}
        errorMessage={errorMessage}
        disabled={disabled}
      />
      <AnimatedPlaceholder
        id={id}
        placeholder={placeholder}
        isAnimated={isAnimated}
        isFocus={isFocus}
      />
    </div>
  );
}

export default AnimatedAutoGrowTextArea;
