"use client";

import React, { useMemo, useRef, useState } from "react";

import styles from "./MetaTagsPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import { SlidePopupRef } from "utils/types/popup";
import MetaTagsInputsSelect from "components/Cms/MetaTagsInputsSelect/MetaTagsInputsSelect";
import { copy, generateUniqueId } from "utils/functions";
import { MetaTagRow } from "utils/types/metaTags";
import CmsButton from "components/CmsButton/CmsButton";

import { useAppSelector } from "utils/hooks/useRedux";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import Api from "api/requests";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import Scrollbar from "components/ScrollBar/Scrollbar";

function MetaTagsPopup(props) {
  const { payload = {} } = props;
  const { metaTagData = {} } = payload;
  const [fields, setFields] = useState<Array<MetaTagRow>>(
    metaTagData.fields ?? []
  );
  const { onSuccessNotification } = useNotificationsHandler();

  const id = metaTagData?._id;

  const ref = useRef<SlidePopupRef>();

  const languages = useAppSelector((store) => store.init.languages);
  const animateOut = () => ref.current?.animateOut();

  function onSubmit(data: Object) {
    const payload = { ...data, fields };

    if (id) {
      payload["id"] = id;

      return Api.updateMetaTags({ payload, onSuccess });
    }

    Api.createMetaTags({ payload, onSuccess });

    function onSuccess() {
      animateOut();
      if (id) {
        onSuccessNotification();
      }
    }
  }

  function setField(id: string, field: string, value: string) {
    const itemsArray: Array<MetaTagRow> = copy(fields);

    const index = itemsArray.findIndex((i: MetaTagRow) => i.meta_tag_id === id);

    if (index > -1) {
      itemsArray[index] = { ...itemsArray[index], [field]: value };
    }

    setFields(itemsArray);
  }

  function setFieldType(id: string, type: string) {
    setField(id, "type", type);
  }
  function setFieldValue(id: string, value: string) {
    setField(id, "value", value);
  }
  function removeById(id: string) {
    setFields((prevState) =>
      prevState.filter((i: MetaTagRow) => i.meta_tag_id !== id)
    );
  }

  function addNewMeta() {
    const itemsArray: Array<MetaTagRow> = copy(fields);
    itemsArray.push({
      meta_tag_id: generateUniqueId(16),
      type: "",
      value: "",
    });
    setFields(itemsArray);
  }

  const inputs = useMemo(() => {
    return [
      {
        name: "route",
        label: "נתיב",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
        isDisabled: !!id,
      },
      {
        name: "lang_id",
        label: "שפה",
        inputType: FORM_INPUTS_TYPES.SELECT,
        rules: ["not_empty"],
        options: languages ?? [],
        field: "lang",
        isDisabled: !!id,
      },
    ];
  }, [languages]);

  const formData: FormDataType = {
    inputs,
    initialData: useMemo(() => metaTagData, []),
  };

  return (
    <SlidePopup ref={ref} className={styles["meta-tags-popup"]}>
      <div className={styles["content"]}>
        <Scrollbar>
          <FormCreator
            formData={formData}
            onSubmit={onSubmit}
            buttonText={id ? "עדכון" : "יצירה"}
          >
            {fields.map((item: MetaTagRow) => {
              return (
                <MetaTagsInputsSelect
                  key={"inputs" + item.meta_tag_id}
                  id={item.meta_tag_id}
                  setFieldType={setFieldType}
                  setFieldValue={setFieldValue}
                  remove={removeById}
                  valueArray={fields}
                />
              );
            })}
            <div className={styles["actions"]}>
              <CmsButton
                title={"הוספת תגית חדשה"}
                onClick={addNewMeta}
                className="create"
              />
            </div>
          </FormCreator>
        </Scrollbar>
      </div>
    </SlidePopup>
  );
}

export default MetaTagsPopup;
