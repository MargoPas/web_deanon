import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchData} from "../../utils/API";
import { Response} from "../Login/@slice";


interface Form {
    id: number;
}


export interface deleteFormState {
    id: number,
}
const initialState: deleteFormState = {
    id: -1,
}

export const deletePerson = createAsyncThunk(
    'delete',
    async (data: Form, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({ id: data.id}),
            method: 'POST',
            credentials: "include",
        };
        try {
            const response = await fetchData('/api/uploading_people/delete_people', postOptions);
            if(!response.ok) {
                console.log(response.ok);
                return thunkAPI.rejectWithValue(response.ok);
            }
            else {
                return await (response.json()) as Response;
            }
        } catch (err){
            alert('Deleting failed!')
            console.log("Problem occurred during fetch: ", err.message);
            return thunkAPI.rejectWithValue(err.response.ok);
        }
    })


export const deleteFormSlice = createSlice({
    name: 'delete',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setPerson: (state, action:PayloadAction<number>) => {
            state.id = action.payload
        },
        clearState: (state) => {
            state.id = -1;
        },
    },
    extraReducers: builder => {
        builder.addCase(deletePerson.fulfilled, (state, action) => {
            state.id = -1;
        });
        builder.addCase(deletePerson.rejected, (state, action) => {
            state.id = -1;
            alert("Something wrong happened during deleting")
        });
    }
})

export const { setPerson, clearState } = deleteFormSlice.actions;


export default deleteFormSlice.reducer