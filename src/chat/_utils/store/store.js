import { createSlice ,configureStore} from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'Slice',
    initialState:{
        ONLINE:0,
        LIST_OF_TEMPORARY_ID_WITH_CORRESPONDING_ACTIVE_USERS:{},
        LIST_OF_ACTIVE_USERNAMES:[],
        SENDER:'',
        MESSAGE:'',
    },reducers:{
        UPDATE_DATA : (state,new_data) => {
            const updated = new_data.payload;
            Object.keys(updated).forEach(item => {
                state[item] = updated[item]
            });
        }
    }
})

export const Store = configureStore({reducer:Slice.reducer});
export const {UPDATE_DATA} = Slice.actions;