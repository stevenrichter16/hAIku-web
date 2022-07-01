import { configureStore } from '@reduxjs/toolkit'
import poemReducer from './poemSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        poem: poemReducer,
        user: userReducer
    }
})