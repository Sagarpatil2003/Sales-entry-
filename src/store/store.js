// store.js
import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../slice/HeaderSlice";
import detailReducer from "../slice/DetailSlice";

const store = configureStore({
  reducer: {
    header: headerReducer,
    detail: detailReducer,
  },
});

export default store;
