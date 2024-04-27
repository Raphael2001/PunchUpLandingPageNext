import React, { ChangeEventHandler, forwardRef } from "react";

import styles from "./BasicTextArea.module.scss";

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
};

const BasicTextArea = forwardRef<HTMLTextAreaElement, Props>(
  (props: Props, ref) => {
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
      rows = 1,
    } = props;

    return (
      <textarea
        ref={ref}
        rows={rows}
        onChange={onChange}
        value={value}
        className={`${styles["text-area"]} ${
          disabled ? styles["disabled"] : ""
        } ${className}`}
        name={name}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);
BasicTextArea.displayName = "BasicTextArea";

export default BasicTextArea;
