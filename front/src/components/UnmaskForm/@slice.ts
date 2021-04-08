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
    Photo: any,                           // удалить потом !!!!!
}
export interface Response {
    //type: string;
    message: string;
}
// Define the initial state using that type
const initialState: unmaskFormState = {
    First_Name: "",
    Middle_Name: '',
    Last_Name: '',
    Description: '',
    Photo: undefined,                          // удалить потом !!!!!!!
}

export const unmaskPerson = createAsyncThunk(
    'login/auth',
    async (data: Form, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({
                First_Name: data.First_Name,
                Middle_Name: data.Middle_Name,
                Last_Name: data.Last_Name,
                Description: data.Description,
                Photo: data.Photo,
            }),
            method: 'POST',
            credentials: "include",
            mode: "cors",
            referrerPolicy: "unsafe-url"
        };
        try {
            const response = await fetchData('/api/uploading_people/', postOptions);
            if(!response.ok) {
                console.log(response.ok);
                return thunkAPI.rejectWithValue(response.ok);
            }
            else {
                return await (response.json()) as Response;
            }
        } catch (err){
            alert('Authorization failed!')
            console.log("Problem occurred during fetch: ", err.message);
            return thunkAPI.rejectWithValue(err.response.ok);
        }
    })

export const unmaskFormSlice = createSlice({
    name: 'login',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        changeLogin: (state, action:PayloadAction<string>) => {
            state.login = action.payload
        },
        changePassword: (state, action:PayloadAction<string>) => {
            state.password = action.payload
        },
        changeIsAuth: (state) => {
            console.log(state.isAuth);
            state.isAuth = true;
            console.log(state.isAuth)
        },
        clearState: (state) => {
            state.isAuth = false;
            state.loading = 'idle';
        },
        changeImageTest: (state, action:PayloadAction<any>) => {   //   тестирование добавления картинки, удалить потом!!!!!!
            state.image = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = 'pending'
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.password = '';
            state.login = '';
            state.isAuth = true;
            //localStorage.setItem('token', action.payload.message.token);   это для жвт было, а мы решили кукать
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = 'failed';
            state.password = '';
            state.login = '';
            state.isAuth = false;
            alert("Something wrong happened during login")
        });
    }
})

export const { changeLogin, changePassword, clearState, changeImageTest } = unmaskFormSlice.actions;

export default unmaskFormSlice.reducer