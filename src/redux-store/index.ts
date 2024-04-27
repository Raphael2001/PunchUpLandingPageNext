import { configureStore } from "@reduxjs/toolkit";
import Reducers from "./reducers";

const Store = configureStore({
  reducer: Reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Removes all the immutable warnings
      serializableCheck: false,
    }),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
