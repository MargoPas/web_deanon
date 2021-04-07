import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API'


export interface RootState {
    isAuth: boolean;
}
// Define the initial state using that type
const initialState: RootState = {
    isAuth: false,
}

export const rootSlice = createSlice({
    name: 'cookie',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        changeIsAuth: (state) => {
            state.isAuth = true;
        },
        clearState: (state) => {
            state.isAuth = false;
        },
    }
})

export const { clearState, changeIsAuth} = rootSlice.actions;

export default rootSlice.reducer