import {configureStore} from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import commentsReducer from './commentsSlice'
import usersReducer from './usersSlice'

const store = configureStore({
    reducer:{
        posts: postsReducer,
        comments: commentsReducer,
        users: usersReducer
    }
})

export default store;