import { createSlice,configureStore } from "@reduxjs/toolkit";

const localState = createSlice({
    name:'localState',
    initialState:{
        isRequesting:false,
        userText:'',
    },reducers:{
        update_isRequesting:(state,data) => {
            state.isRequesting = data.payload;
        },
        update_userText:(state,data) => {
            state.userText = data.payload;
        },
    }
})

export const localStore = configureStore({reducer:localState.reducer});
export const {update_isRequesting,update_userText} = localState.actions;