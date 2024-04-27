import React from "react";

import styles from "./ColoredCell.module.scss";
import { TableColorCell } from "utils/types/table";

type Props = {
  options: TableColorCell;
  value: string;
};

function ColoredCell({ options, value }: Props) {
  const item = options[value];
  const { color, title } = item;

  return (
    <div className={`${styles["colored-cel-wrapper"]} item ${color}`}>
      {title}
    </div>
  );
}

export default ColoredCell;
