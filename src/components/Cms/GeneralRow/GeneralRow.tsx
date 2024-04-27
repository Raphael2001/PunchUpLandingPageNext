"use client";

import React, { useCallback, useEffect, useState } from "react";

import GeneralInfoInput from "../GeneralInfoInput/GeneralInfoInput";

import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";

import XIcon from "/public/assets/icons/close-icon.svg";
import Pencil from "/public/assets/icons/pencil.svg";
import styles from "./GeneralRow.module.scss";
import useGeneralInfo from "utils/hooks/useGeneralInfo";
import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";
import { useAppSelector } from "utils/hooks/useRedux";

import { copy } from "utils/functions";
import { LinkType } from "utils/types/links";

type Props = {
  name: string;
};

function GeneralRow(props: Props) {
  const { name } = props;
  const { cmsTitle } = useGeneralInfo(name);
  const openPopup = usePopup();
  return (
    <div className={styles["general-row-wrapper"]}>
      <div className={styles["title-wrapper"]}>
        <h3 className={styles["general-info-title"]}>{cmsTitle}</h3>
        <button
          className={styles["icon-wrapper"]}
          onClick={() => openPopup(POPUP_TYPES.EDIT_GENERAL_INFO, { name })}
        >
          <img src={Pencil.src} />
        </button>
      </div>
      <RenderInputs name={name} />
    </div>
  );
}

export default GeneralRow;

type inputsProps = {
  name: string;
};

function RenderInputs(props: inputsProps) {
  const { name } = props;
  const media = useAppSelector((store) => store.init.media);
  const links = useAppSelector((store) => store.init.links);

  const {
    multiValues,
    value,
    removeItemByIndex,
    upsertGeneralInfo,
    inputType,
  } = useGeneralInfo(name);

  const deleteAction = {
    icon: XIcon.src,
    onClick: onDelete,
  };

  const convertValueToMedia = useCallback(() => {
    const array: Array<any> = [];
    if (Array.isArray(value)) {
      for (const key in value) {
        const id = value[key];
        const mediaObj = media[id];
        array.push(mediaObj);
      }
    }
    return array;
  }, [media, value]);

  const convertValueToLinks = useCallback(() => {
    const array: Array<any> = [];
    if (Array.isArray(value)) {
      for (const key in value) {
        const id = value[key];

        const linkObj = links.find((l: LinkType) => l._id === id);
        array.push(linkObj);
      }
    }
    return array;
  }, [media, value]);

  const formatData = useCallback(() => {
    switch (inputType) {
      case GeneralInfoInputTypes.MEDIA._id:
        return convertValueToMedia();

      case GeneralInfoInputTypes.LINK._id:
        return convertValueToLinks();
      default:
        return copy(value);
    }
  }, [inputType, value, convertValueToMedia, convertValueToLinks]);

  const formatHeader = useCallback(() => {
    switch (inputType) {
      case GeneralInfoInputTypes.MEDIA._id:
        return { name: { title: "שם", type: TABLE_CELL_TYPES.TEXT } };

      case GeneralInfoInputTypes.LINK._id:
        return { name: { title: "שם", type: TABLE_CELL_TYPES.TEXT } };

      case GeneralInfoInputTypes.TEXT._id:
      default:
        return { key: { title: "תוכן", type: TABLE_CELL_TYPES.TEXT } };
    }
  }, [inputType]);

  const [tableData, setTableData] = useState<Array<any>>([]);

  const [tableHeader, setTableHeader] = useState({
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [deleteAction],
    },
  });

  useEffect(() => {
    if (multiValues) {
      const data = formatData();
      setTableData(data);
      const header = formatHeader();
      setTableHeader((prevState) => {
        return { ...header, ...prevState };
      });
    }
  }, [formatData, formatHeader, multiValues]);

  function onDelete(item: any, index: number) {
    const newArray = removeItemByIndex(index);

    upsertGeneralInfo(newArray);
  }

  return (
    <div className={styles["inputs"]}>
      <GeneralInfoInput name={name} />
      {multiValues && <TableCreator header={tableHeader} data={tableData} />}
    </div>
  );
}
