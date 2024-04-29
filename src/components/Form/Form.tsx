"use client";

import React from "react";

import styles from "./Form.module.scss";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import FormCreator from "components/FormCreator/FormCreator";
import RedButton from "components/RedButton/RedButton";

type Props = {};

function Form(props: Props) {
  const formData: FormDataType = {
    inputs: [
      {
        name: "fullname",
        label: "שם מלא",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        rules: ["not_empty", "full_name"],
      },
      {
        name: "phone",
        label: "טלפון",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        rules: ["not_empty", "phone"],
        type: "tel",
      },
    ],
  };

  function onSubmit() {}

  return (
    <section id="lead-form" className={styles["form-wrapper"]}>
      <div className={styles["form-content"]}>
        <h3 className={styles["title"]}>השארת פרטים</h3>
        <h6 className={styles["subtitle"]}>תשאירו פרטים ונציג יחזור אליכם</h6>
        <div className={styles["form"]}>
          <FormCreator
            formData={formData}
            onSubmit={onSubmit}
            buttonText="שליחה"
            CustomButton={RedButton}
          />
        </div>
      </div>
    </section>
  );
}

export default Form;
