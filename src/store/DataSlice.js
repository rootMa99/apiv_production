import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "dataS",
  initialState: [],
  reducers: {
    addData(s, p) {
      if (s.length === 0) {
        s.push(...p.payload);
      } else {
        s = [];
        s.push(...p.payload);
      }
    },
  },
});

export const dataAction = DataSlice.actions;
export default DataSlice;
