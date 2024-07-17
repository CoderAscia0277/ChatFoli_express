import {configureStore, createSlice} from '@reduxjs/toolkit';
import { chapter_01 } from './story_chap01';

const GlobalSlice = createSlice({
    name:'Slice',
    initialState:{
        onBusy:false,
        story:[chapter_01],
        isOptionChosen:false,
        theme:{ 'dark':'rgb(23 23 23)','light':'#FBF6F3'},
        user_icon:'http://localhost:5000/images/image_01.png',
        character_icon:'http://localhost:5000/images/image_02.jpg',
        stored_progress:[],
        userText: '',
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
     },
     update_userText:(state,data) => {
         state.userText = data.payload;
     }
    }
});

export const {set_onBusy,set_isOption,set_default_context,update_userText} = GlobalSlice.actions;

const Store = configureStore({reducer:GlobalSlice.reducer});

export default Store; 