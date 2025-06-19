import { configureStore } from "@reduxjs/toolkit";
import todooReducer from "./todoSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "todosData",

  storage,
};

const persistedReducer = persistReducer(persistConfig, todooReducer);

const store = configureStore({
  reducer: {
    todosData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
