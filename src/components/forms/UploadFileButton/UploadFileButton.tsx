"use client";

import React, { ChangeEventHandler } from "react";

import basic from "./UploadFileButton.module.scss";
import { generateUniqueId } from "utils/functions";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";

type Props = {
  extraStyles?: any;
  accept?: string;
  onChange: ChangeEventHandler;
  placeholder: string;
  name?: string;
  className?: string;
  showError?: boolean;
  errorMessage?: string;
  id?: string;
  disabled?: boolean;
};

const defaultId = generateUniqueId(16);

const UploadFileButton = (props: Props) => {
  const {
    extraStyles = {},
    accept = "*",
    onChange = () => {},
    placeholder,
    name = "",
    className = "",
    disabled = false,
    showError = false,
    errorMessage = "",
    id = defaultId,
  } = props;

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  function renderButton() {
    return (
      <>
        <input
          id={id}
          className={styles("media-file")}
          type="file"
          accept={accept}
          onChange={onChange}
          name={name}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`${styles("media-file-label")} ${
            disabled ? styles("disabled") : ""
          }`}
        >
          {placeholder}
        </label>
      </>
    );
  }

  return (
    <div className={`${styles("file-input-wrapper")}  ${className}`}>
      {renderButton()}
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
};

export default UploadFileButton;
