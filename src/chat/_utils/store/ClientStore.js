import { createSlice,configureStore } from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'ClientSlice',
    initialState:{
        INFO:{},
        CONTACTS:[]
    },
    reducers:{
        UPDATE_ALL(state,data){
            const {INFO,CONTACTS} = data.payload;
            state.INFO = INFO;
            state.CONTACTS = CONTACTS;
        }
    }
});
 export const {UPDATE_ALL} = Slice.actions;
 export const ClientStore = configureStore({reducer:Slice.reducer});