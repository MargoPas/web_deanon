import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'

// Define a type for the slice state
export interface Form {
  login: string;
  password: string;
  email: string;
}
export interface LoginFormState {
  login: string;
  password: string;
  email: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  isAuth: boolean;
}
export interface Response {
  type: string;
  message: string;
}
// Define the initial state using that type
const initialState: LoginFormState = {
  login: '',
  password: '',
  email: '',
  loading: 'idle',
  isAuth: false
}

export const registerUser = createAsyncThunk(
  'register',
  async (data: Form, thunkAPI) => {
    const postOptions = {
      body: JSON.stringify({ login: data.login, password: data.password, email: data.email }),
      method: 'POST',
    };
    const response = await fetchData('/api/register/', postOptions);
    let answer = await response.json() as Response;
    //if(answer.message=="success") {
      //changeIsAuth();
    //}
    return await (response.json()) as Response;
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
      state.email = action.payload
    },
    //changeIsAuth: (state) => {
      //state.isAuth = true;
    //}
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = 'pending'
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.password = '';
      state.login = '';
      state.email = '';
      state.isAuth = true;
    });
  }
})

export const { changeLogin, changePassword, changeEmail } = registerFormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectLogin = (state: RootState) => state.loginForm.login;
//export const selectPassword = (state: RootState) => state.loginForm.password;

export default registerFormSlice.reducer