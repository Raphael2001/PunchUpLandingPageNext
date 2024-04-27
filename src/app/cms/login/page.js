"use client";
import Api from "api/requests";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserIcon from "/public/assets/icons/male-user.png";

import styles from "./cmslogin.module.scss";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import FormCreator from "components/FormCreator/FormCreator";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import LoginButton from "components/Cms/LoginButton/LoginButton";
import AppleButtons from "components/AppleButtons/AppleButtons";

export default function Login() {
  const tokens = useSelector((store) => store.tokens);
  const router = useRouter();
  const [formClassName, setFormClassName] = useState("");

  useEffect(() => {
    if (tokens.accessToken) {
      router.push(Routes.cmsHome);
    }
  }, [tokens]);

  function onSubmit(payload) {
    Api.login({ payload });
  }

  const formData = {
    inputs: [
      {
        name: "username",
        rules: ["not_empty"],
        label: "שם משתמש",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
      },
      {
        name: "password",
        rules: ["not_empty"],
        label: "סיסמא",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        type: "password",
      },
    ],
  };

  return (
    <div className={styles["cms-login-wrapper"]}>
      <div className={styles["login-form-blur"]} />

      <div
        className={`${styles["login-form-wrapper"]} ${formClassName}`}
        onAnimationEnd={() => setFormClassName(styles["end"])}
      >
        <div className={styles["buttons"]}>
          <AppleButtons />
        </div>
        <div className={styles["user-icon"]}>
          <img src={UserIcon.src} />
        </div>
        <div className={styles["inputs"]}>
          <FormCreator
            formData={formData}
            CustomButton={LoginButton}
            buttonText={"התחברות"}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
