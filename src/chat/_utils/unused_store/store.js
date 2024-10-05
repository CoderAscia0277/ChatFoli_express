import { createSlice ,configureStore} from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'Slice',
    initialState:{
        USER_PARAMS:{},
        ONLINE:0,
        NAME:'',
        UID:null,
        FRIENDS:null,
        FRIENDS_ONLINE:[],
        TEMPORARY_ID:null,
        ICON:null,
        SENDER:'',
        MESSAGE:'',
            
    },reducers:{
        UPDATE_DATA : (state,new_data) => {
            const updated = new_data.payload;
            Object.keys(updated).forEach(item => {
                state[item] = updated[item]
            });
        },
        UPDATE_USER_PARAMS : (state,new_params) => {
            state.USER_PARAMS = new_params.payload;
        }
    }
})

export const Store = configureStore({reducer:Slice.reducer});
export const {UPDATE_DATA,UPDATE_USER_PARAMS} = Slice.actions;