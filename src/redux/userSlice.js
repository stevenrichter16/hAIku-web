import { cardActionAreaClasses } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    password: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            return {
                ...state,
                email: action.payload
            }
        },
        setPassword: (state, action) => {
            return {
                ...state,
                password: action.payload
            }
        }
    }
})

export const { setEmail, setPassword } = userSlice.actions
export default userSlice.reducer
