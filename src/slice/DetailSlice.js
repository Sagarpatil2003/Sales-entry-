// DetailSlice.js
import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: [],
  reducers: {
    addDetail: (state, action) => {
      return [...state, action.payload];
    },
    removeDetail: (state, action) => {
      const indexToRemove = state.findIndex(detail => detail.id === action.payload);
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
      }
    },
  },
});

export const { addDetail, removeDetail } = detailSlice.actions;
export default detailSlice.reducer;
