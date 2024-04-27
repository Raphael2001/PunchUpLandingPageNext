"use client";

import NotificationsTypes from "constants/NotificationsTypes";
import { useDispatch } from "react-redux";
import Actions from "redux-store/actions";

function useNotificationsHandler() {
  const dispatch = useDispatch();

  function onSuccessNotification() {
    dispatch(
      Actions.addNotification({
        type: NotificationsTypes.SUCCCESS,
        payload: { title: "עודכן בהצלחה", text: "המידע עודכן בהצלחה" },
      })
    );
  }
  return { onSuccessNotification };
}

export default useNotificationsHandler;
