import { createSlice, configureStore } from "@reduxjs/toolkit";


const Slice = createSlice({
    name:'Slice',
    initialState:{
        HISTORY:[
            {UID:'09925388028',NAME:'B3SA_027',LOG:"Bro let's go on a raid tonight!"},
            {UID:'096523545092',NAME:'Akira_010',LOG:"Cool! How about 10 tonight?"},
        ]
    },
    reducers:{
        UPDATE_HISTORY:(state,data) => {
            const arr = state.HISTORY;
            arr.push(data.payload);
            state.HISTORY = arr;
        }
    }
});

export const MessengerStore = configureStore({reducer:Slice.reducer});
export const {UPDATE_HISTORY} = Slice.actions;