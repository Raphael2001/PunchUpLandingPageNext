"use client";

import React from "react";

import { inputEvent } from "utils/types/inputs";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import TextInput from "components/forms/TextInput/TextInput";
import AutoComplete from "components/forms/AutoComplete/AutoComplete";
import RadioButtons from "components/forms/RadioButtons/RadioButtons";
import { FormInputData } from "utils/types/form";
import Select from "components/forms/Select/Select";
import AnimatedInput from "components/forms/AnimatedInput";
import BasicTextArea from "components/Basic/BasicTextArea/BasicTextArea";
import AnimateTextArea from "components/forms/AnimatedTextArea/AnimatedTextArea";
import AutoGrowTextArea from "components/forms/AutoGrowTextArea/AutoGrowTextArea";
import AnimatedAutoGrowTextArea from "components/forms/AnimatedAutoGrowTextArea/AnimatedAutoGrowTextArea";
import UploadFileButton from "components/forms/UploadFileButton/UploadFileButton";

type Props = {
  input: FormInputData;
  onChange: (name: string, value: string) => void;
  showError: (name: string) => boolean;
  value: string;
  errorMessage?: string;
};

function InputsCreator(props: Props) {
  const { input, showError, onChange, value, errorMessage = "" } = props;
  const {
    inputType,
    label,
    name,
    options = [],
    field = "text",
    isDisabled = false,
    rows = 10,
    type = "text",
    accept = "*",
  } = input;

  function onChangeInput(e: inputEvent) {
    const { name, value } = e.target;
    onChange(name, value);
  }

  function onChangeAutoComplete(name: string, option: any) {
    if (option) {
      onChange(name, option._id);
    } else {
      onChange(name, "");
    }
  }

  function onChangeRadio(e: inputEvent) {
    const { id, name } = e.target;
    onChange(name, id);
  }

  function onFileChange(e: inputEvent) {}

  const shouldShowError = showError(name);

  const sharedInputProps = {
    placeholder: label,
    showError: shouldShowError,
    errorMessage: errorMessage,
    value: value,
    name: name,
    disabled: isDisabled,
  };

  switch (inputType) {
    case FORM_INPUTS_TYPES.INPUT:
      return (
        <TextInput onChange={onChangeInput} {...sharedInputProps} type={type} />
      );
    case FORM_INPUTS_TYPES.AUTO_COMPLETE:
      return (
        <AutoComplete
          options={options}
          onChange={onChangeAutoComplete}
          {...sharedInputProps}
          field={field}
        />
      );

    case FORM_INPUTS_TYPES.RADIO:
      return (
        <RadioButtons
          {...sharedInputProps}
          onChange={onChangeRadio}
          options={options}
          field={field}
        />
      );
    case FORM_INPUTS_TYPES.SELECT:
      return (
        <Select
          {...sharedInputProps}
          onChange={onChangeAutoComplete}
          options={options}
          field={field}
        />
      );
    case FORM_INPUTS_TYPES.SELECT:
      return (
        <Select
          {...sharedInputProps}
          onChange={onChangeAutoComplete}
          options={options}
          field={field}
        />
      );

    case FORM_INPUTS_TYPES.ANIMATED_INPUT:
      return (
        <AnimatedInput
          {...sharedInputProps}
          onChange={onChangeInput}
          type={type}
        />
      );

    case FORM_INPUTS_TYPES.TEXT_AREA:
      return (
        <BasicTextArea
          {...sharedInputProps}
          onChange={onChangeInput}
          rows={rows}
        />
      );

    case FORM_INPUTS_TYPES.ANIMATED_TEXT_AREA:
      return (
        <AnimateTextArea
          {...sharedInputProps}
          onChange={onChangeInput}
          rows={rows}
        />
      );
    case FORM_INPUTS_TYPES.AUTO_GROW_TEXT_AREA:
      return (
        <AutoGrowTextArea {...sharedInputProps} onChange={onChangeInput} />
      );
    case FORM_INPUTS_TYPES.ANIMATED_AUTO_GROW_TEXT_AREA:
      return (
        <AnimatedAutoGrowTextArea
          {...sharedInputProps}
          onChange={onChangeInput}
        />
      );
    case FORM_INPUTS_TYPES.FILE_UPLOAD:
      return (
        <UploadFileButton
          {...sharedInputProps}
          onChange={onFileChange}
          accept={accept}
        />
      );

    default:
      return <></>;
  }
}

export default InputsCreator;
