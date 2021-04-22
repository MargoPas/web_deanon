import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'


// Define a type for the slice state
export interface Form {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string,
}
export interface unmaskFormState {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string,
}
export interface Response {
    message: string;
}

const initialState: unmaskFormState = {
    First_Name: "",
    Middle_Name: '',
    Last_Name: '',
}

export const findPerson = createAsyncThunk(
    'search',
    async (data: Form, thunkAPI) => {
    const postOptions = {
        body: JSON.stringify({ First_Name: data.First_Name, Middle_Name: data.Middle_Name, Last_Name: data.Last_Name}),
        method: 'GET',
        credentials: "include",
        mode: "cors",
        referrerPolicy: "no-referrer"
    };
    try {
        const response = await fetchData('/api/uploading_people/find_people', postOptions);
        if(!response.ok) {
            console.log(response.ok);
            return thunkAPI.rejectWithValue(response.ok);
        }
        else {
            return await (response.json()) as Response;
        }
    } catch (err){
        alert('Registration failed!')
        console.log("Problem occurred during fetch: ", err.message);
        return thunkAPI.rejectWithValue(err.response.ok);
    }
})

export const searchFormSlice = createSlice({
    name: 'search',
    // `createSlice` will infer the state type from the `initialState` argument
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
    extraReducers: builder => {
        builder.addCase(findPerson.fulfilled, (state, action) => {
            state.First_Name = '';
            state.Middle_Name = '';
            state.Last_Name = '';
        });
        builder.addCase(findPerson.rejected, (state, action) => {
            state.First_Name = '';
            state.Middle_Name = '';
            state.Last_Name = '';
            alert("Something wrong happened during uploading")
        });
    }
})

export const { changeFirst, changeMiddle, changeLast } = searchFormSlice.actions;

export default searchFormSlice.reducer