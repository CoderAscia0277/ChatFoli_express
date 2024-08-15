import { createSlice, configureStore } from "@reduxjs/toolkit";
import { UPDATE_DATA } from "./store";


const Slice = createSlice({
    name:'Slice',
    initialState:{
        ALL_MESSAGES:{},
        INFO:null,
        HISTORY:[]
    },
    reducers:{
        UPDATE_MESSAGES:(state,data) => {
           state.ALL_MESSAGES = data.payload; 
        },
        SEND_MESSAGE:(state,data) => {
            const {RECIEPIENT_UID,MESSAGE,NAME} = data.payload;
            const new_messages = state.ALL_MESSAGES[RECIEPIENT_UID];
            try{
                new_messages.push({NAME:NAME,LOG:MESSAGE,TIME:null});
                state.ALL_MESSAGES[RECIEPIENT_UID] = new_messages;
                // console.log(UID,MESSAGE);
            }catch(err){
                console.error(RECIEPIENT_UID,MESSAGE,NAME,new_messages,err);
            }
            
        },
        UPDATE_INFO:(state,data) => {
            state.INFO = data.payload;
        },
        UPDATE_HISTORY:(state,data) => {
            const arr = state.HISTORY;
            arr.push(data.payload);
            state.HISTORY = arr;
        },
        INCOMING_MESSAGE:(state,message) => {
            const {UID,MESSAGES} = message.payload;
            state.ALL_MESSAGES[UID] = MESSAGES;
            // messages.push(MESSAGE);
            // state.ALL_MESSAGES[SENDER_UID] = messages;
            console.log(MESSAGES,UID);
        }
    }
});

export const MessengerStore = configureStore({reducer:Slice.reducer});
export const {UPDATE_MESSAGES,UPDATE_INFO,UPDATE_HISTORY,SEND_MESSAGE,INCOMING_MESSAGE} = Slice.actions;