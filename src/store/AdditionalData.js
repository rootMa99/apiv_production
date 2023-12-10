import { createSlice } from "@reduxjs/toolkit";

const gettoday = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const AdditionalData = createSlice({
  name: "addtionalData",
  initialState: {
    date: gettoday(),
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  reducers: {
    addDate(s, p) {
      s.date = p.payload;
    },
  },
});

export const additionalDataAction = AdditionalData.actions;
export default AdditionalData;
