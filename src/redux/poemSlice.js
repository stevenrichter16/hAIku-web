import { cardActionAreaClasses } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    poemTopic: '',
    poemText: '',
    poemTextLength: 0,
    poemLines: ['', '', ''],
    poemList: [],
    poemDeleted: 0
}

export const poemSlice = createSlice({
    name: 'poem',
    initialState,
    reducers: {
        setPoemTopic: (state, action) => {
            return {
                ...state,
                poemTopic: action.payload
            }
        },
        setPoemText: (state, action) => {
            return {
                ...state,
                poemText: action.payload
            }
        },

        setPoemTextLength: (state, action) => {
            return {
                ...state,
                poemTextLength: action.payload
            }
        },

        setPoemLines: (state, action) => {
            return {
                ...action,
                poemLines: action.payload
            }
        },

        addPoem: (state, action) => {
            return {
                ...state,
                poems: [...state.poems, action.payload]
            }
        },

        setPoemDeleted: (state, action) => {
            return {
                ...state,
                poemDeleted: action.payload
            }
        }
    }
})

export const { setPoemTopic, setPoemText, setPoemTextLength, setPoemLines, setPoemDeleted } = poemSlice.actions
export default poemSlice.reducer
