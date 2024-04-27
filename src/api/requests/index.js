import ApiManager from "api/ApiManager";
import API_METHODS from "constants/ApiMethods";

import store from "redux-store/index";
import Actions from "redux-store/actions";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import { chekcForJWTexp } from "utils/functions";

class ApiRequests {
  #accessTokenHeaders = async () => {
    let token = store.getState()?.tokens.accessToken;
    const isExpired = chekcForJWTexp(token);

    if (isExpired) {
      function onSuccess(data) {
        token = data.access_token;
      }

      await this.refreshToken({ onSuccess });
    }

    return { Authorization: `Bearer ${token}` };
  };

  #refreshTokenHeaders = () => {
    const token = store.getState()?.tokens.refreshToken;
    return { Authorization: `Bearer ${token}` };
  };

  Init = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setInit(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.GET, "initCms", onSuccess);
  };

  addNewText = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addNewText(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "texts", onSuccess);
  };

  updateText = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addNewText(props.payload));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.PUT, "texts", onSuccess);
  };

  deleteText = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.deleteText(props.payload));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.DELETE, "texts", onSuccess);
  };

  login = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setAccessToken(res.body.access_token));
      store.dispatch(Actions.setRefreshToken(res.body.refresh_token));
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        res.body.refresh_token
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    return ApiManager.execute(props, API_METHODS.POST, "login", onSuccess);
  };

  refreshToken = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setAccessToken(res.body.access_token));
      if (res.body?.refresh_token) {
        store.dispatch(Actions.setRefreshToken(res.body.refresh_token));
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          res.body.refresh_token
        );
      }

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = this.#refreshTokenHeaders();

    return ApiManager.execute(props, API_METHODS.GET, "refresh", onSuccess);
  };

  upsertLanguage = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.upsertLang(res.body.value));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.PUT, "languages", onSuccess);
  };

  deleteLanguage = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(
        Actions.deleteKeyById({ value: res.body.value, name: "languages" })
      );

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.DELETE,
      "languages",
      onSuccess
    );
  };

  upsertGeneralInfo = async (props = {}, multiValues = false) => {
    function onSuccess(res) {
      store.dispatch(Actions.setGeneralInfo(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.PUT, "generalInfo", onSuccess);
  };

  addMedia = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addMedia(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "media", onSuccess);
  };

  removeMedia = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.removeMedia(props.payload.id));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.DELETE, "media", onSuccess);
  };
  upsertLink = async (props = {}) => {
    function onSuccess(res) {
      if (props.payload?.id) {
        store.dispatch(Actions.updateKey({ name: "links", value: res.body }));
      } else {
        store.dispatch(Actions.addNewKey({ value: res.body, name: "links" }));
      }
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "links", onSuccess);
  };
  removeLink = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.deleteKeyById({ name: "links", value: res.body }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.DELETE, "links", onSuccess);
  };
  createMetaTags = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(
        Actions.addNewKey({
          name: "metaTags",
          value: res.body,
        })
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "metaTags", onSuccess);
  };

  updateMetaTags = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(
        Actions.updateKey({
          name: "metaTags",
          value: res.body,
        })
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.PUT, "metaTags", onSuccess);
  };

  deleteMetaTags = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(
        Actions.deleteKeyById({ value: res.body, name: "metaTags" })
      );

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.DELETE, "metaTags", onSuccess);
  };
}

const Api = new ApiRequests();
Object.freeze(Api);
export default Api;
