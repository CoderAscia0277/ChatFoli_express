import { createSlice ,configureStore} from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'Slice',
    initialState:{
        ONLINE:0,
        NAME:'',
        UID:null,
        FRIENDS:null,
        FRIENDS_ONLINE:[],
        TEMPORARY_ID:null,
        SENDER:'',
        MESSAGE:'',
            
    },reducers:{
        UPDATE_DATA : (state,new_data) => {
            const updated = new_data.payload;
            Object.keys(updated).forEach(item => {
                state[item] = updated[item]
            });
        },
    }
})

export const Store = configureStore({reducer:Slice.reducer});
export const {UPDATE_DATA} = Slice.actions;