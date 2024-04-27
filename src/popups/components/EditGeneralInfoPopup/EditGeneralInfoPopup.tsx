"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./EditGeneralInfoPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import TextInput from "components/forms/TextInput/TextInput";
import { inputEvent } from "utils/types/inputs";
import CmsButton from "components/CmsButton/CmsButton";
import Api from "api/requests";
import useGeneralInfo from "utils/hooks/useGeneralInfo";
import { SlidePopupRef } from "utils/types/popup";

type Props = {
  payload: Payload;
};
type Payload = {
  name: string;
};

function EditGeneralInfoPopup({ payload }: Props) {
  const { name } = payload;
  const ref = useRef<SlidePopupRef>();
  const [currentValue, setCurrentValue] = useState("");

  const { value, cmsTitle, upsertGeneralInfo } = useGeneralInfo(name);

  useEffect(() => {
    setCurrentValue(cmsTitle);
  }, [value]);

  const animateOut = () => ref.current?.animateOut();

  function onChange(e: inputEvent) {
    setCurrentValue(e.target.value);
  }

  function updateGeneralParam() {
    upsertGeneralInfo(value, animateOut, currentValue);
  }

  return (
    <SlidePopup
      className={styles["edit-general-params-popup"]}
      ref={ref}
      extraStyles={styles}
    >
      <div className={styles["content"]}>
        <TextInput onChange={onChange} value={currentValue} />
        <CmsButton
          className={"update"}
          title="עדכן"
          onClick={updateGeneralParam}
        />
      </div>
    </SlidePopup>
  );
}

export default EditGeneralInfoPopup;
