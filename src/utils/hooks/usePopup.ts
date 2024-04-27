import { useDispatch } from "react-redux";
import Actions from "redux-store/actions";

function usePopup() {
  const dispatch = useDispatch();
  function openPopup(type: string, payload?: Object, priority?: number) {
    dispatch(
      Actions.addPopup({
        type,
        payload,
        priority,
      })
    );
  }

  return openPopup;
}

export default usePopup;
