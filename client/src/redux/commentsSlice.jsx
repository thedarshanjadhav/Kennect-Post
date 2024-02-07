import {   createSlice } from "@reduxjs/toolkit";

// slice
const commentSlice = createSlice({
    name: 'comments',
    initialState:{
        comments:[],
        singlePost:null,
   
    },
    reducers: {
        getComment : (state, action) => {
            state.posts = action.payload.map(post => {
                return {id: post._id, newComment: post.newComment}
            })
        },
        addComment : (state, action) =>{
            state.posts.push(action.payload)
        },
       
        
       
    },

});

export const { getComment, addComment } = commentSlice.actions;
export default commentSlice.reducer;
