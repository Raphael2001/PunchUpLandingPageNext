"use client";

import React from "react";

import styles from "./links.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import { useSelector } from "react-redux";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import Api from "api/requests";

function Links() {
  const links = useSelector((store) => store.init.links);

  const openPopup = usePopup();

  function onDelete(item) {
    const payload = { id: item._id };
    Api.removeLink({ payload });
  }

  function onUpdate(item) {
    openPopup(POPUP_TYPES.LINKS, { linkData: item });
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
    name: { title: "שם", type: TABLE_CELL_TYPES.TEXT },
    link: { title: "לינק", type: TABLE_CELL_TYPES.TEXT },

    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["links-page"]}>
      <CmsButton
        title={"הוספת לינק חדש"}
        className={"create"}
        extraStyles={styles}
        onClick={() => openPopup(POPUP_TYPES.LINKS)}
      />
      <TableCreator header={header} data={links ?? []} />
    </div>
  );
}

export default Links;
