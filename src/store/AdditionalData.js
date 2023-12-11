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
    maxMonthValue:{
        name:"",
        value:0
    },
    maxDayValue:{
        name:"",
        value:0
    },
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
    addMaxMonthValue(s,p){
        s.maxMonthValue.name=p.payload.name;
        s.maxMonthValue.value=p.payload.total;
    },
    addMaxDayValue(s,p){
        s.maxDayValue.name=p.payload.name;
        s.maxDayValue.value=p.payload.total;
    },
  },
});

export const additionalDataAction = AdditionalData.actions;
export default AdditionalData;
