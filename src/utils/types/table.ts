import { onChangeCheckboxValue } from "./inputs";

export interface TableAction {
  icon?: string;
  text?: string;
  onClick: (item: Object, index?: number) => void;
  color?: string;
}

export interface TableColorCell {
  [key: string]: {
    color: string;
    title: string;
  };
}

export interface cellInput {
  value: string | number;
  id: string;
  name: string;
}

export interface TableHeaderItem {
  title: string;
  type: string;
  options?: TableColorCell;
  uniqueField?: string;
  onChangeCheckbox?: (value: onChangeCheckboxValue) => void;
  actions?: Array<TableAction>;
  onChangeInput?: (e: cellInput) => void;
  dataset?: Array<datasetItem>;
  displayField?: string;
}

type datasetItem = {
  _id: string;
};

export interface TableHeader {
  [key: string]: TableHeaderItem;
}
