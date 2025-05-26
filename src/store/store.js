import { configureStore } from "@reduxjs/toolkit";
import todooReducer from "./todoSlice";
const store = configureStore({
  reducer: {
    todosData: todooReducer,
  },
});
export default store;
