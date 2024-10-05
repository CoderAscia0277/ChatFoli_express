import { createSlice,configureStore } from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'ClientSlice',
    initialState:{
        contactMessages:{}
    },
    reducers:{
        UPDATE_CONTACT(state,data){
            // const INFO = data.payload;
            // state.INFO = INFO;
            // state.MESSAGES = INFO.all_messages;

            // let message_array = [];
            // Object.keys(INFO.all_messages).forEach(keys => {
            //     INFO.all_messages[keys].map(data => {
            //         message_array = [data,...message_array];
            //     })
            // });
            // state.RECENT_MESSAGES = message_array;
        }
    }
});
 export const {UPDATE_CONTACT} = Slice.actions;
 export const messageStore = configureStore({reducer:Slice.reducer});