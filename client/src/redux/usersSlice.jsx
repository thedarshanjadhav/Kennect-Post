import {   createSlice } from "@reduxjs/toolkit";

// slice
const userSlice = createSlice({
    name: 'users',
    initialState:{
        currentUser: [],
   
    },
    reducers: {
        addUser : (state, action) =>{
            state.currentUser = action.payload; 
        },
       
        
       
    },

});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
