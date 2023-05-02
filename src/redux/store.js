import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/user";
import { api } from "./features/baseApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import auth from "./features/auth";

export const store = configureStore({
  reducer: {
    auth: auth,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
