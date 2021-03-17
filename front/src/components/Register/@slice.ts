import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'
import {loginUser} from "../Login/@slice";

// Define a type for the slice state
export interface Form {
  login: string;
  password: string;
  e_mail: string;
  name: string;
}
export interface LoginFormState {
  login: string;
  password: string;
  e_mail: string;
  name: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  isAuth: boolean;
}
export interface Response {
  message: string;
}
// Define the initial state using that type
const initialState: LoginFormState = {
  login: '',
  password: '',
  e_mail: '',
  loading: 'idle',
  isAuth: false,
  name: ''
}

export const registerUser = createAsyncThunk(
  'register',
  async (data: Form, thunkAPI) => {
    const postOptions = {
      body: JSON.stringify({ login: data.login, password: data.password, e_mail: data.e_mail, name: data.name }),
      method: 'POST',
    };
    try {
      const response = await fetchData('/api/register/', postOptions);
      if(!response.ok) {
        console.log(response.ok);
        return thunkAPI.rejectWithValue(response.ok);
        //throw new Error('Unsuccessful registration');
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

export const registerFormSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeLogin: (state, action:PayloadAction<string>) => {
      state.login = action.payload
    },
    changePassword: (state, action:PayloadAction<string>) => {
      state.password = action.payload
    },
    changeEmail: (state, action:PayloadAction<string>) => {
      state.e_mail = action.payload
    },
    changeName: (state, action:PayloadAction<string>) => {
      state.name = action.payload
    },
    clearState: (state) => {
      state.isAuth = false;
      state.loading = 'idle';
    }
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = 'pending'
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.password = '';
      state.login = '';
      state.e_mail = '';
      state.name = '';
      state.isAuth = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.password = '';
      state.login = '';
      state.e_mail = '';
      state.name = '';
      state.isAuth = false;
      alert("Something wrong happened during registration")
    });
  }
})

export const { changeLogin, changePassword, changeEmail, changeName, clearState } = registerFormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectLogin = (state: RootState) => state.loginForm.login;
//export const selectPassword = (state: RootState) => state.loginForm.password;

export default registerFormSlice.reducer