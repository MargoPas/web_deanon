import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'


// Define a type for the slice state

export interface searchFormState {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string,
}

const initialState: searchFormState = {
    First_Name: "",
    Middle_Name: '',
    Last_Name: '',
}

export const searchFormSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeFirst: (state, action:PayloadAction<string>) => {
            state.First_Name = action.payload
        },
        changeMiddle: (state, action:PayloadAction<string>) => {
            state.Middle_Name = action.payload
        },
        changeLast: (state, action:PayloadAction<string>) => {
            state.Last_Name = action.payload
        },

    },
})

export const { changeFirst, changeMiddle, changeLast } = searchFormSlice.actions;

export default searchFormSlice.reducer