import { createSlice ,configureStore} from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'Slice',
    initialState:{
        USERNAME:'',
        ONLINE:0,
        LIST_ACTIVE:[],
        MSG_SENDER:'',
        MSG_SENT:'',
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