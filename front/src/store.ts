import {createBrowserHistory} from "history";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {connectRouter} from "connected-react-router";
import loginFormReducer from './components/Login/@slice';
import registerFormReducer from './components/Register/@slice';
import rootReducer from './components/RootBar/@slice';
import unmaskFormReducer from "./components/UnmaskForm/@slice";
import searchFormReducer from "./components/Search/@slice";
import voteFormReducer from "./components/Vote/@slice";

export const history = createBrowserHistory();

const middleware = getDefaultMiddleware({thunk: true})

const reducer = {
  router: connectRouter(history),
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  rootState: rootReducer,
  unmaskForm: unmaskFormReducer,
  searchForm: searchFormReducer,
  voteForm: voteFormReducer,
}

export const store = configureStore({
  reducer,
  middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
