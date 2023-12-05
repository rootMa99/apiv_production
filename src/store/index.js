import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";

const store = configureStore({ reducer: {
    datas:DataSlice.reducer
} });

export default store;