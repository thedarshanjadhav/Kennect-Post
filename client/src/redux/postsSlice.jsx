import {   createSlice } from "@reduxjs/toolkit";

// slice
const postSlice = createSlice({
    name: 'posts',
    initialState:{
        posts:[],
        singlePost:null,
   
    },
    reducers: {
        getPost : (state, action) => {
            state.posts = action.payload.map(post => {
                return {id: post._id, newPost: post.newPost}
            })
        },
        addPost : (state, action) =>{
            state.posts.push(action.payload)
        },
        getSinglePost: (state, action) => {
            console.log('Single Post State:', action.payload); // Log state here
            state.singlePost = action.payload; // Update singlePost state
        },
        
       
    },

});

export const { getPost, addPost, getSinglePost } = postSlice.actions;
export default postSlice.reducer;
