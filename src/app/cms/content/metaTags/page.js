"use client";

import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import POPUP_TYPES from "constants/popup-types";
import React from "react";
import { useSelector } from "react-redux";
import usePopup from "utils/hooks/usePopup";

import styles from "./metaTags.module.scss";
import Api from "api/requests";

function MetaTags(props) {
  const openPopup = usePopup();
  const metaTags = useSelector((store) => store.init.metaTags);
  const languages = useSelector((store) => store.init?.languages);

  function onDelete(item) {
    const id = item._id;
    const payload = { id };
    Api.deleteMetaTags({ payload });
  }

  function onUpdate(item) {
    openPopup(POPUP_TYPES.META_TAGS, { metaTagData: item });
  }

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

  const header = {
    route: {
      title: "נתיב",
      type: TABLE_CELL_TYPES.TEXT,
    },
    lang_id: {
      title: "שפה",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: languages,
      displayField: "lang",
    },
    fields: {
      title: "מספר תגיות",
      type: TABLE_CELL_TYPES.COUNT_ROWS,
    },
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["all-meta-tags-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(POPUP_TYPES.META_TAGS)}
          className="create"
          title="יצירת עמוד חדש"
        />
      </div>

      <TableCreator data={metaTags ?? []} header={header} />
    </div>
  );
}

export default MetaTags;
