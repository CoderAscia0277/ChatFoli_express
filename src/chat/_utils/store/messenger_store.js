import { createSlice, configureStore } from "@reduxjs/toolkit";


const Slice = createSlice({
    name:'Slice',
    initialState:{
        HISTORY:null
    },
    reducers:{
        UPDATE_HISTORY:(state,data) => {
            state.HISTORY = data.payload;
        }
    }
});

export const MessengerStore = configureStore({reducer:Slice.reducer});
export const {UPDATE_HISTORY} = Slice.actions;