"use client";
import Api from "api/requests";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import Popups from "popups/popup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Actions from "redux-store/actions";

export default function MainCMSLayout({ children }) {
  const [initialRequestsDone, setInitialRequestsDone] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (token) {
      dispatch(Actions.setRefreshToken(token));
      Api.refreshToken().then(() => {
        setInitialRequestsDone(true);
      });
    } else {
      setInitialRequestsDone(true);
    }
  }, []);

  return (
    <>
      <div className="orange">{initialRequestsDone ? children : null}</div>
      <Popups className="orange" />
    </>
  );
}
