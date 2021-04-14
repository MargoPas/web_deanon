import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'

// Define a type for the slice state
export interface Form {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string,
    Description: string,
    Photo: any,
}
export interface unmaskFormState {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string,
    Description: string,
    Photo: any,
    isAuth: boolean;
}
export interface Response {
    message: string;
}

const initialState: unmaskFormState = {
    First_Name: "",
    Middle_Name: '',
    Last_Name: '',
    Description: '',
    Photo: null,
    isAuth: false,
}

export const unmaskPerson = createAsyncThunk(
    'unmask',
    async (data: Form, thunkAPI) => {
        let form = new FormData();
        form.append('First_Name', data.First_Name)
        form.append('Middle_Name', data.Middle_Name)
        form.append('Last_Name', data.Last_Name)
        form.append('Description', data.Description)
        form.append('Photo', data.Photo)
        const postOptions = {
            body: form,
                //JSON.stringify({
                //First_Name: data.First_Name,
                //Middle_Name: data.Middle_Name,
                //Last_Name: data.Last_Name,
                //Description: data.Description,
                //Photo: data.Photo,
            //}),
            method: 'POST',
            credentials: "include",
            mode: "cors",
            referrerPolicy: "unsafe-url"
        };
        try {
            const response = await fetchData('/api/uploading_people/create', postOptions);
            if(!response.ok) {
                return thunkAPI.rejectWithValue(response.ok);
            }
            else {
                return await (response.json()) as Response;
            }
        } catch (err){
            alert('Uploading your complaint failed!')
            console.log("Problem occurred during fetch: ", err.message);
            return thunkAPI.rejectWithValue(err.response.ok);
        }
    })

export const unmaskFormSlice = createSlice({
    name: 'unmask',
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
        changeDesc: (state, action:PayloadAction<string>) => {
            state.Description = action.payload
        },
        changeIsAuth: (state) => {
            state.isAuth = true;
        },
        clearState: (state) => {
            state.isAuth = false;
        },
        changePhoto: (state, action:PayloadAction<any>) => {
            state.Photo = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(unmaskPerson.fulfilled, (state, action) => {
            state.First_Name = '';
            state.Middle_Name = '';
            state.Last_Name = '';
            state.Description = '';
            state.Photo = undefined;
            state.isAuth = true;
            //localStorage.setItem('token', action.payload.message.token);   это для жвт было, а мы решили кукать
        });
        builder.addCase(unmaskPerson.rejected, (state, action) => {
            state.First_Name = '';
            state.Middle_Name = '';
            state.Last_Name = '';
            state.Description = '';
            state.Photo = undefined;
            state.isAuth = false;
            alert("Something wrong happened during uploading")
        });
    }
})

export const { changeFirst, changeMiddle, changeLast, changeDesc, changeIsAuth,clearState, changePhoto } = unmaskFormSlice.actions;

export default unmaskFormSlice.reducer