"use client";

import Api from "api/requests";
import CmsButton from "components/CmsButton/CmsButton";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./TextsPopup.module.scss";
import AutoGrowTextArea from "components/forms/AutoGrowTextArea/AutoGrowTextArea";
function TextsPopup(props) {
  const { keyProps = "" } = props.payload;
  const languages = useSelector((store) => store.init?.languages);
  const texts = useSelector((store) => store.init?.texts);
  const ref = useRef();

  const isNew = !keyProps;

  const [key, setKey] = useState(keyProps);

  const [form, setForm] = useState(texts?.[keyProps] || {});

  function onChangeText(e) {
    const { value, name } = e.target;
    const newState = { ...form };
    newState[name] = value;

    setForm(newState);
  }

  function onChangeKey(e) {
    const { value } = e.target;

    setKey(value);
  }

  function getValueFromForm() {
    const value = {};
    for (const key in languages) {
      const language = languages[key];
      const { _id } = language;
      value[_id] = form[_id] || "";
    }
    return value;
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  function addText() {
    const value = getValueFromForm();

    const payload = { key, value };
    Api.addNewText({ payload, onSuccess });
  }

  function updateText() {
    const value = getValueFromForm();
    const payload = { key, value };

    Api.updateText({ payload, onSuccess });
  }

  console.log("languages", languages);

  return (
    <SlidePopup
      className={styles["texts-popup"]}
      ref={ref}
      extraStyles={styles}
    >
      <div className={styles["texts-title"]}>תרגומים</div>
      <TextRow languageName={"מפתח"} value={key} onChange={onChangeKey} />
      {languages &&
        languages.map((languageData, index) => {
          console.log("languageData", languageData);
          return (
            <TextRow
              key={"text-lang" + index}
              languageName={languageData.lang}
              value={form[languageData._id]}
              onChange={onChangeText}
              id={languageData._id}
            />
          );
        })}
      <div className={styles["button-wrapper"]}>
        {isNew && (
          <CmsButton
            extraStyles={styles}
            className="create"
            onClick={addText}
            title={"הוסף"}
          />
        )}

        {!isNew && (
          <CmsButton
            extraStyles={styles}
            className="update"
            onClick={updateText}
            title={"עדכן"}
          />
        )}
      </div>
    </SlidePopup>
  );
}

export default TextsPopup;

function TextRow(props) {
  const { languageName, value, id, onChange } = props;

  return (
    <div className={styles["text-row"]}>
      <span className={styles["language-name"]}> {languageName}</span>
      <div className={styles["input-wrapper"]}>
        <AutoGrowTextArea
          value={value}
          onChange={onChange}
          name={id}
          className={styles["input"]}
        />
      </div>
    </div>
  );
}
