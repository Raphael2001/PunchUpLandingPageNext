"use client";

import React, { useEffect, useState } from "react";

import styles from "./GeneralInfoInput.module.scss";
import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";
import TextInput from "components/forms/TextInput/TextInput";
import { inputEvent } from "utils/types/inputs";

import GeneralInfoActions from "../GeneralInfoActions/GeneralInfoActions";

import MediaAutoComplete from "../MediaAutoComplete/MediaAutoComplete";
import useGeneralInfo from "utils/hooks/useGeneralInfo";
import LinksAutoComplete from "../LinksAutoComplete/LinkAutoComplete";
import {
  RotatingTextItem,
  RotatingTextItemOption,
} from "utils/types/rotatingText";
import RotatingTextInputs from "../RotatingTextInputs/RotatingTextInputs";
import { generalInfoValue } from "utils/types/init";

type Props = {
  name: string;
  id?: string;
};

function GeneralInfoInput({ name, id }: Props) {
  const { multiValues, inputType, value, upsertGeneralInfo } =
    useGeneralInfo(name);

  const initialValue = multiValues ? "" : value ?? "";

  const [currentValue, setCurrentValue] =
    useState<generalInfoValue>(initialValue);

  function onChange(e: inputEvent) {
    const { value } = e.target;
    setCurrentValue(value);
  }
  function resetValue() {
    setCurrentValue("");
  }

  function onChangeAutoComplete(name: string, option: any) {
    if (option) {
      setCurrentValue(option._id);
    } else {
      setCurrentValue(option);
    }
  }

  function onChangeRotatingText(
    text: string,
    options: Array<RotatingTextItemOption>
  ) {
    setCurrentValue({
      text: text,
      options: options,
    });
  }

  switch (inputType) {
    case GeneralInfoInputTypes.MEDIA._id:
      return (
        <div className={styles["row"]}>
          <MediaAutoComplete
            value={currentValue && currentValue.toString()}
            onChange={onChangeAutoComplete}
          />
          <GeneralInfoActions
            name={name}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
    case GeneralInfoInputTypes.LINK._id:
      return (
        <div className={styles["row"]}>
          <LinksAutoComplete
            value={currentValue && currentValue.toString()}
            onChange={onChangeAutoComplete}
          />
          <GeneralInfoActions
            name={name}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
    case GeneralInfoInputTypes.ROTATING_TEXT._id:
      return (
        <RotatingTextInputs
          name={name}
          onChange={onChangeRotatingText}
          currentValue={currentValue}
        />
      );
    case GeneralInfoInputTypes.TEXT._id:
    default:
      return (
        <div className={styles["row"]}>
          <TextInput onChange={onChange} value={currentValue.toString()} />
          <GeneralInfoActions
            name={name}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
  }
}

export default GeneralInfoInput;
