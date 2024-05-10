import {configureStore, createSlice} from '@reduxjs/toolkit';

const GlobalSlice = createSlice({
    name:'Slice',
    initialState:{
        onBusy:false,

    },
    reducers:{
     set_onBusy : (state,data) => {
        state.onBusy = data.payload;}
     },
});

export const {set_onBusy} = GlobalSlice.actions;

const Store = configureStore({reducer:GlobalSlice.reducer});

export default Store; 