import { configureStore } from "@reduxjs/toolkit";
import todooReducer from "./todoSlice";
const store = configureStore({
  reducer: {
    todos: todooReducer,
  },
});
export default store;
