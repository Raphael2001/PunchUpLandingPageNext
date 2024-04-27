"use client";
import React, { useRef, useState } from "react";

import basic from "./TableCreator.module.scss";
import { inputEvent } from "utils/types/inputs";
import { useAppSelector } from "utils/hooks/useRedux";
import TABLE_CELL_TYPES from "constants/TableCellType";
import ColoredCell from "./ColoredCell/ColoredCell";
import CheckBoxCell from "./CheckBoxCell/CheckBoxCell";
import ActionsCell from "./Actions/ActionsCell/ActionsCell";
import InputCell from "./InputCell/InputCell";
import { TableHeader, TableHeaderItem } from "utils/types/table";

type Props = {
  data: Array<Object>;
  header: TableHeader;
  className?: string;
  extraStyles?: any;
};

function TableCreator({ data, header, className, extraStyles = {} }: Props) {
  const styleRef = useRef({});

  const columWdith = 100 / Object.values(header).length;

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  const deviceState = useAppSelector((store) => store.deviceState);
  const [selectedCheckboxs, setSelectedCheckbox] = useState<string[]>([]);

  if (deviceState.isDesktop) {
    styleRef.current = { width: `${columWdith || 20}%` };
  } else {
    styleRef.current = {};
  }

  function onChangeCheckBox(e: inputEvent) {
    const { target } = e;
    const { id, name } = target;

    const headerItem = header[name];

    const value = {
      id,
      name,
      values: [""],
    };

    if (selectedCheckboxs.includes(id)) {
      const newValues = selectedCheckboxs.filter((item) => item !== id);
      setSelectedCheckbox(newValues);
      value.values = newValues;
    } else {
      const newValues = [...selectedCheckboxs, id];
      setSelectedCheckbox(newValues);
      value.values = newValues;
    }
    typeof headerItem.onChangeCheckbox === "function" &&
      headerItem.onChangeCheckbox(value);
  }

  return (
    <div className={`${styles("table-creator-wrapper")} ${className}`}>
      <div
        className={`${styles("table-row-wrapper")} ${styles("header-wrapper")}`}
      >
        {Object.values(header).map((headerItem, index) => {
          const title = headerItem.title;
          return (
            <div
              data-th={title}
              key={"table-header-item" + index}
              className={`${styles("table-item")} ${styles(
                "table-header-item"
              )}`}
              style={styleRef.current}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className={styles("body-wrapper")}>
        {data.map((dataItem, index) => {
          return (
            <div
              key={"table-row-item" + index}
              className={`${styles("table-row-wrapper")} ${styles(
                "table-row-body-wrapper"
              )}`}
            >
              {Object.keys(header).map((key, itemIndex) => {
                const value = dataItem[key] ?? dataItem;
                const title = header[key].title;
                const headerItem = header[key];
                return (
                  <div
                    style={styleRef.current}
                    data-th={title}
                    key={`table-body-item-${index}${itemIndex}`}
                    className={`${styles("table-item")} ${styles(
                      "table-body-item"
                    )}`}
                  >
                    <RenderCell
                      item={headerItem}
                      value={value}
                      name={key}
                      data={dataItem}
                      onChangeCheckBox={onChangeCheckBox}
                      selectedCheckboxs={selectedCheckboxs}
                      index={index}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TableCreator;

type CellProps = {
  item: TableHeaderItem;
  value: string;
  name: string;
  data: Object;
  onChangeCheckBox: (e: inputEvent) => void;
  selectedCheckboxs: Array<string>;
  index: number;
};

function RenderCell({
  item,
  value,
  name,
  data,
  onChangeCheckBox,
  selectedCheckboxs,
  index = 0,
}: CellProps) {
  const {
    type,
    options = {},
    uniqueField = "",
    actions = [],
    onChangeInput = () => {},
    dataset,
    displayField = "",
  } = item;

  function renderContent() {
    switch (type) {
      case TABLE_CELL_TYPES.CHECKBOX:
        return (
          <CheckBoxCell
            field={uniqueField}
            name={name}
            data={data}
            onChange={onChangeCheckBox}
            values={selectedCheckboxs}
          />
        );
      case TABLE_CELL_TYPES.INPUT:
        return (
          <InputCell
            name={name}
            onChange={onChangeInput}
            field={uniqueField}
            data={data}
          />
        );

      case TABLE_CELL_TYPES.ACTION_BUTTONS:
        return <ActionsCell data={data} actions={actions} index={index} />;
      case TABLE_CELL_TYPES.COLORED_CELL:
        return <ColoredCell value={value} options={options} />;
      case TABLE_CELL_TYPES.COUNT_ROWS:
        if (Array.isArray(value)) {
          return value.length;
        }
        if (typeof value === "object") {
          return Object.keys(value).length;
        }
        return value;

      case TABLE_CELL_TYPES.TEXT_FROM_DATASET:
        if (Array.isArray(dataset)) {
          const foundItem = dataset.find((item) => item._id === value);
          if (foundItem && Object.hasOwn(foundItem, displayField)) {
            return foundItem[displayField];
          }
          return value;
        }

        return value;
      case TABLE_CELL_TYPES.TEXT:
      default:
        return value;
    }
  }

  return renderContent();
}
