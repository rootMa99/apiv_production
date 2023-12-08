import { createSlice } from "@reduxjs/toolkit";


const AdditionalData=createSlice({
    name: "addtionalData",
    initialState:{
        date:"2023-11-27"
    },
    reducers:{
        addDate(s,p){
            s.date=p.payload;
        }
    }
})

export const additionalDataAction= AdditionalData.actions;
export default AdditionalData;
