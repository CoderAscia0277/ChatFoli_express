import {configureStore, createSlice} from '@reduxjs/toolkit';
import { chapter_01 } from './story_chap01';

const GlobalSlice = createSlice({
    name:'Slice',
    initialState:{
        onBusy:false,
        story:[chapter_01],
        isOptionChosen:false,
        theme:{},
        user_icon:'',
        character_icon:'',
        stored_progress:[],
    },
    reducers:{
     set_onBusy : (state,data) => {
        state.onBusy = data.payload;}
     ,set_isOption: (state) =>{
        state.isOptionChosen = !state.isOptionChosen;
     },
     set_default_context:(state,data) => {
        const {theme,user_icon,character_icon,stored_progress} = data.payload;
        state.theme = theme;
        state.user_icon = user_icon;
        state.character_icon = character_icon;
        state.stored_progress = stored_progress;
     }
    }
});

export const {set_onBusy,set_isOption,set_default_context} = GlobalSlice.actions;

const Store = configureStore({reducer:GlobalSlice.reducer});

export default Store; 