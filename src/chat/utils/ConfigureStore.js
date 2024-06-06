import {configureStore, createSlice} from '@reduxjs/toolkit';
import { chapter_01 } from './story_chap01';

const GlobalSlice = createSlice({
    name:'Slice',
    initialState:{
        onBusy:false,
        story:[chapter_01],
        isOptionChosen:false
    },
    reducers:{
     set_onBusy : (state,data) => {
        state.onBusy = data.payload;}
     },set_isOption: (state) =>{
        state.isOptionChosen = !state.isOptionChosen;
     }
});

export const {set_onBusy,set_isOption} = GlobalSlice.actions;

const Store = configureStore({reducer:GlobalSlice.reducer});

export default Store; 