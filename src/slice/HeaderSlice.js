import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: [],
  reducers: {
    addHeader: (state, action) => {
      state.push(action.payload);
    },
    
  },
});

export const { addHeader, } = headerSlice.actions;
export default headerSlice.reducer;
