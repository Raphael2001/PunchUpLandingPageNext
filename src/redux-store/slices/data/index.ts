import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { copy, generateUniqueId } from "utils/functions";
import { GeneralInfo, init, language } from "utils/types/init";
import { notification } from "utils/types/notification";
import { popup } from "utils/types/popup";
let dataReducers = {};
let dataActions = {};
const Slices: Slice[] = [];

/* --------------------------------------------------------------- */

export const initSlice = createSlice({
  name: "init",
  initialState: {},
  reducers: {
    setInit: (state, action) => action.payload,
    updateInit: (state: init, action) => {
      return { ...state, ...action.payload };
    },

    addNewText: (state: init, action) => {
      const key = action.payload.key;
      const value = action.payload.value;

      const texts = { [key]: value, ...state.texts };

      state.texts = texts;
      return state;
    },
    deleteText: (state: init, action) => {
      const key = action.payload.key;
      delete state.texts[key];
      return state;
    },
    addMedia: (state: init, action) => {
      const mediaId = action.payload._id;
      state.media = { ...state.media, [mediaId]: action.payload };
      return state;
    },

    removeMedia: (state: init, action) => {
      const mediaId = action.payload;
      const media = { ...state.media };
      delete media[mediaId];
      return { ...state, media };
    },

    setGeneralInfo: (state: init, action: PayloadAction<GeneralInfo>) => {
      const { name } = action.payload;

      state.generalInfo[name] = action.payload;

      return state;
    },

    updateKey: (state, action) => {
      const { name, value } = action.payload;
      const { _id } = value;

      const field = copy(state[name]);
      const index = field.findIndex((m) => m._id === _id);
      state[name][index] = value;
      return state;
    },
    addNewKey: (state, action) => {
      const { name, value } = action.payload;

      state[name].push(value);
      return state;
    },

    deleteKeyById: (state: init, action) => {
      const { name, value } = action.payload;
      const { _id } = value;
      const field = copy(state[name]);

      const index = field.findIndex((l) => l._id === _id);

      if (index > -1) {
        field.splice(index);
      }

      state[name] = field;
      return state;
    },

    upsertLang: (state: init, action: PayloadAction<language>) => {
      const { _id } = action.payload;
      const indexOfLang = state.languages.findIndex(
        (l: language) => l._id === _id
      );

      if (indexOfLang > -1) {
        state.languages[indexOfLang] = action.payload;
      } else {
        state.languages.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
Slices.push(initSlice);

/* --------------------------------------------------------------- */

export const deviceSlice = createSlice({
  name: "deviceState",
  initialState: false,
  reducers: {
    setDeviceState: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
Slices.push(deviceSlice);

/* --------------------------------------------------------------- */

export const loaderSlice = createSlice({
  name: "loaderState",
  initialState: false,
  reducers: {
    setLoader: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
Slices.push(loaderSlice);

/* --------------------------------------------------------------- */

export const popupsSlice = createSlice({
  name: "popupsArray",
  initialState: [],
  reducers: {
    addPopup: (state: popup[], action: PayloadAction<popup>) => {
      const { payload = {}, type, priority = 1 } = action.payload;

      const popup = {
        payload,
        type,
        priority,
      };
      state.push(popup);
      state.sort((a, b) => a.priority - b.priority);
    },
    removePopup: (state) => {
      state.pop();
    },
  },
});

// Action creators are generated for each case reducer function
Slices.push(popupsSlice);

/* --------------------------------------------------------------- */

export const notificationsSlice = createSlice({
  name: "notificationsArray",
  initialState: [],
  reducers: {
    addNotification: (
      state: notification[],
      action: PayloadAction<notification>
    ) => {
      const id: string = generateUniqueId(16);
      state.push({
        type: action.payload.type,
        payload: { ...action.payload.payload, id },
      });
    },
    removeNotification: (
      state: notification[],
      action: PayloadAction<string>
    ) => {
      state.filter((item) => item.payload.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
Slices.push(notificationsSlice);

/* --------------------------------------------------------------- */

export const requestingSlice = createSlice({
  name: "requestingState",
  initialState: false,
  reducers: {
    requestStarted: (state, action) => true,
    requestEnded: (state, action) => false,
  },
});

// Action creators are generated for each case reducer function
Slices.push(requestingSlice);

/* --------------------------------------------------------------- */

export const burgerSlice = createSlice({
  name: "burgerState",
  initialState: false,
  reducers: {
    setBurger: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

// Action creators are generated for each case reducer function
Slices.push(burgerSlice);

/* --------------------------------------------------------------- */

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    updateUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUserData: () => {
      return false;
    },
  },
});
Slices.push(userDataSlice);

/* --------------------------------------------------------------- */

export const tokensSlice = createSlice({
  name: "tokens",
  initialState: {},
  reducers: {
    setAccessToken: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
    setRefreshToken: (state, action) => {
      return { ...state, refreshToken: action.payload };
    },
    resetTokens: (state, action) => ({}),
  },
});
Slices.push(tokensSlice);

// build export objects
for (const Slice of Slices) {
  dataActions = { ...dataActions, ...Slice.actions };
  const reducer = { [Slice.name]: Slice.reducer };
  dataReducers = { ...dataReducers, ...reducer };
}

export { dataActions };
export { dataReducers };
