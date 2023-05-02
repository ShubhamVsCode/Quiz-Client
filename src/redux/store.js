import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/user";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import auth from "./features/auth";
import quiz from "./features/quiz";

export const store = configureStore({
  reducer: {
    auth: auth,
    quiz: quiz,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
