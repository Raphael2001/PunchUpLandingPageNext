"use client";
import React from "react";
import { useSelector } from "react-redux";

import styles from "./general.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import Languages from "components/Cms/Languages/Languages";

import GeneralRow from "components/Cms/GeneralRow/GeneralRow";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import RotatingTextInputs from "components/Cms/RotatingTextInputs/RotatingTextInputs";
export default function GeneralPage() {
  const generalInfo = useSelector((store) => store.init?.generalInfo);
  const openPopup = usePopup();

  return (
    <div className={styles["general-info-wrapper"]}>
      <Languages />

      <CmsButton
        title={"הוספת פרמטר חדש"}
        className="create"
        onClick={() => openPopup(POPUP_TYPES.GENERAL_INFO)}
      />

      {generalInfo &&
        Object.values(generalInfo).map((param) => {
          return <GeneralRow key={param._id} name={param.name} />;
        })}
    </div>
  );
}
