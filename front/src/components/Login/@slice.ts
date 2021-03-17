import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'

// Define a type for the slice state
export interface Form {
  login: string;
  password: string;
}
export interface LoginFormState {
  login: string;
  password: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  isAuth: boolean;
}
export interface Response {
  //type: string;
  message: string;
}
// Define the initial state using that type
const initialState: LoginFormState = {
  login: '',
  password: '',
  loading: 'idle',
  isAuth: false
}

export const loginUser = createAsyncThunk(
  'login/auth',
  async (data: Form, thunkAPI) => {
    //alert('fuck');
    const postOptions = {
      body: JSON.stringify({ login: data.login, password: data.password }),
      method: 'POST',
    };
    try {
      const response = await fetchData('/api/login/', postOptions);
      if(!response.ok) {
        console.log(response.ok);
        return thunkAPI.rejectWithValue(response.ok);
        //throw new Error('Unsuccessful registration');
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

export const loginFormSlice = createSlice({
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
    }
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

export const { changeLogin, changePassword, clearState } = loginFormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectLogin = (state: RootState) => state.loginForm.login;
//export const selectPassword = (state: RootState) => state.loginForm.password;

export default loginFormSlice.reducer
