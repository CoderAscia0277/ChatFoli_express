import { createSlice ,configureStore} from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'Slice',
    initialState:{
       chatbox_image:'/images/Bedroom_Day.png'
            
    },reducers:{
        set_chatbox_image: (state,image) =>{
            state.chatbox_image = image.payload;
        }
    }
})

export const MessageDataStore = configureStore({reducer:Slice.reducer});
export const {set_chatbox_image} = Slice.actions;