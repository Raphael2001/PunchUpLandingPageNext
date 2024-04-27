"use client";
import React, { useEffect, useState } from "react";
import Api from "api/requests";

import { useDispatch, useSelector } from "react-redux";

import POPUP_TYPES from "constants/popup-types";

import styles from "./texts.module.scss";

import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import usePopup from "utils/hooks/usePopup";

export default function TextsPage(props) {
  const [formatedTexts, setFormatedTexts] = useState([]);
  const texts = useSelector((store) => store.init?.texts);

  const dispatch = useDispatch();

  const openPopup = usePopup();

  useEffect(() => {
    const textsArray = [];
    if (texts) {
      for (const key in texts) {
        textsArray.push({ key, value: texts[key] });
      }
      setFormatedTexts(textsArray);
    }
  }, [texts]);

  const deleteAction = {
    color: TABLE_COLORS.RED,
    text: "מחיקה",
    onClick: onDelete,
  };
  const updateAction = {
    color: TABLE_COLORS.GREEN,
    text: "עדכון",
    onClick: onUpdate,
  };

  function onUpdate(item) {
    openPopup(POPUP_TYPES.TEXTS, { keyProps: item.key });
  }

  function onDelete(item) {
    const payload = { key: item.key };
    Api.deleteText({ payload });
  }

  const header = {
    key: { title: "מפתח", type: TABLE_CELL_TYPES.TEXT },
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["all-text-wrapper"]}>
      <div className={styles["add-buttom-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(POPUP_TYPES.TEXTS)}
          title={"הוסף"}
          className="create"
          extraStyles={styles}
        />
      </div>

      <TableCreator data={formatedTexts} header={header} />
    </div>
  );
}
