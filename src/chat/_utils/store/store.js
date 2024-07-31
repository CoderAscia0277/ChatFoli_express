import { createSlice ,configureStore} from "@reduxjs/toolkit";

const Slice = createSlice({
    name:Slice,
    initialState:{
        foo:{},
        fuu:{}
    },reducers:{
        UPDATE_DATA : (state,new_data) => {
            const {key1,key2} = new_data.payload;
            state.foo = key1;
            state.fuu = key2;
        }
    }
})

export const Store = configureStore({reducer:Slice.reducers});
export const {UPDATE_DATA} = Slice.actions;