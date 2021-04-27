import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchData} from "../../utils/API";
import { Response} from "../Login/@slice";


interface Form {
    people_id: number;
}


export interface voteFormState {
    people_id: number,
    haveVoted: boolean,
    isAuth: boolean,
}
const initialState: voteFormState = {
    people_id: -1,
    haveVoted: false,
    isAuth: false,
}

export const voteForPerson = createAsyncThunk(
    'vote',
    async (data: Form, thunkAPI) => {
        //alert('fuck');
        const postOptions = {
            body: JSON.stringify({ people_id: data.people_id}),
            method: 'POST',
            credentials: "include",
            mode: "cors",
            referrerPolicy: "unsafe-url"
        };
        try {
            const response = await fetchData('/api/voting/create', postOptions);
            if(!response.ok) {
                console.log(response.ok);
                return thunkAPI.rejectWithValue(response.ok);
            }
            else {
                return await (response.json()) as Response;
            }
        } catch (err){
            alert('Voting failed!')
            console.log("Problem occurred during fetch: ", err.message);
            return thunkAPI.rejectWithValue(err.response.ok);
        }
    })


export const voteFormSlice = createSlice({
    name: 'vote',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setVote: (state, action:PayloadAction<number>) => {
            state.people_id = action.payload
        },
        changeIsAuth: (state) => {
            state.isAuth = !state.isAuth;
        },
        clearState: (state) => {
            state.people_id = -1;
        },
    },
    extraReducers: builder => {
        builder.addCase(voteForPerson.fulfilled, (state, action) => {
            state.people_id = -1;
            state.haveVoted = true
        });
        builder.addCase(voteForPerson.rejected, (state, action) => {
            state.people_id = -1;
            state.haveVoted = false;
            alert("Something wrong happened during voting")
        });
    }
})

export const { setVote, clearState, changeIsAuth } = voteFormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectLogin = (state: RootState) => state.loginForm.login;
//export const selectPassword = (state: RootState) => state.loginForm.password;

export default voteFormSlice.reducer