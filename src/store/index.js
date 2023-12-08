import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";
import AdditionalData from "./AdditionalData";

const store = configureStore({ reducer: {
    datas:DataSlice.reducer,
    additionalData:AdditionalData.reducer
} });

export default store;