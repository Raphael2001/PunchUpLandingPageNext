"use client";

import React, { useRef } from "react";

import styles from "./LinksPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import LINKS_TYPES from "constants/LinksTypes";
import { useSelector } from "react-redux";
import FormCreator from "components/FormCreator/FormCreator";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import Api from "api/requests";

function LinksPopup(props) {
  const { payload = {} } = props;
  const { linkData = {} } = payload;
  const { _id } = linkData;
  const media = useSelector((store) => store.init?.media);

  const ref = useRef();

  function onSubmit(payload) {
    if (_id) {
      payload["id"] = _id;
    }

    Api.upsertLink({ payload, onSuccess });
    function onSuccess() {
      animateOut();
    }
  }

  const animateOut = () => ref.current.animateOut();

  const formData = {
    inputs: [
      {
        name: "name",
        rules: ["not_empty"],
        label: "שם",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
      {
        name: "link_type",
        rules: ["not_empty"],
        label: "סוג לינק",
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        options: Object.values(LINKS_TYPES),
      },
      {
        name: "link",
        rules: ["not_empty"],
        label: "לינק",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
      {
        name: "media",
        rules: ["not_empty"],
        label: "מדיה",
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        options: media ? Object.values(media) : [],
        field: "name",
      },
      {
        name: "title",
        rules: ["no_validation"],
        label: "כותרת",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
    ],

    initialData: linkData,
  };

  return (
    <SlidePopup ref={ref} className={styles["links-popup"]}>
      <div className={styles["content"]}>
        <FormCreator
          formData={formData}
          buttonText={_id ? "עדכון" : "יצירה"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default LinksPopup;
