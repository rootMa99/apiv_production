import { createSlice } from "@reduxjs/toolkit";


const AdditionalData=createSlice({
    name: "addtionalData",
    initialState:{
        date:"2023-11-27",
        month:[
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
          ]
    },
    reducers:{
        addDate(s,p){
            s.date=p.payload;
        }
    }
})

export const additionalDataAction= AdditionalData.actions;
export default AdditionalData;
