"use client";

import React, { ChangeEventHandler, useEffect, useRef } from "react";

import styles from "./AutoGrowTextArea.module.scss";
import BasicTextArea from "components/Basic/BasicTextArea/BasicTextArea";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";

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
  rows?: number;
  showError?: boolean;
  errorMessage?: string;
};

function AutoGrowTextArea(props: Props) {
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

  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textArea.current) {
      textArea.current.style.height = "inherit";
      textArea.current.style.height = `${textArea.current.scrollHeight}px`;
    }
  }, [textArea.current, value]);

  return (
    <div className={styles["text-area-wrapper"]}>
      <BasicTextArea
        ref={textArea}
        rows={1}
        onChange={onChange}
        className={`${styles["text-area"]} ${className}`}
        name={name}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
      />

      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default AutoGrowTextArea;
