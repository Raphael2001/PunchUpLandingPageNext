"use client";

import React, { KeyboardEvent, useRef, useState } from "react";

import basic from "./Select.module.scss";
import OptionsList from "components/Basic/OptionsList/OptionsList";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import { GeneralOptionItem } from "utils/types/inputs";
import useHighlightedItem from "utils/hooks/useHighlightedItem";

type Props = {
  extraStyles?: any;
  options: Array<any>;
  showError?: boolean;
  errorMessage?: string;
  id?: string;
  name?: string;
  onChange: (name: string, option: GeneralOptionItem) => void;
  value: string;
  placeholder?: string;
  className?: string;
  field?: string;
  disabled?: boolean;
};

function Select(props: Props) {
  const {
    extraStyles = {},
    options = [],
    showError = false,
    errorMessage = "",
    id = "",
    name = "",
    onChange,
    value = "",
    placeholder = "",
    field = "text",
    className,
    disabled = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const foundItem = options.find((item) => item._id === value);

  const { highlightedItem, handleKeyDown } = useHighlightedItem({
    options,
    field,
    onOptionClick,
    isOpen,
    setIsOpen,
  });

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, closeList);

  function onOptionClick(item) {
    onChange(name, item);
    closeList();
  }

  function closeList() {
    setIsOpen(false);
  }

  return (
    <div
      className={`${styles("select-wrapper")} ${className}`}
      ref={wrapperRef}
    >
      <button
        className={`${styles("button-select")} ${
          disabled ? styles("disabled") : ""
        }`}
        disabled={disabled}
        onClick={() => setIsOpen((prevState) => !prevState)}
        onKeyDown={handleKeyDown}
      >
        {value ? (
          <span className={styles("select-text")}>{foundItem[field]}</span>
        ) : (
          <span className={styles("placeholder")}>{placeholder}</span>
        )}
      </button>

      <OptionsList
        options={options}
        field={field}
        onOptionClick={onOptionClick}
        isOpen={isOpen}
        name={name}
        highlightedItem={highlightedItem}
      />

      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default Select;
