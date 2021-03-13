import {createBrowserHistory} from "history";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {connectRouter} from "connected-react-router";
import counterReducer from './components/Counter/@slice';
import loginFormReducer from './components/Login/@slice';
import registerFormReducer from './components/Register/@slice';


export const history = createBrowserHistory();

const middleware = getDefaultMiddleware({thunk: true})

const reducer = {
  router: connectRouter(history),
  counter: counterReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer
  // auth:
}

export const store = configureStore({
  reducer,
  middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
