import * as React from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import s from './LoginForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, loginUser } from './@slice';
import { Redirect } from 'react-router-dom';
import Routes from '../../pages/routes';
import {useEffect} from "react";
import {clearState} from './@slice'
import {useHistory} from 'react-router-dom'

const LoginForm: React.FC  = () => {
  const login = useAppSelector(state => state.loginForm.login);
  const password = useAppSelector(state => state.loginForm.password);
  const status = useAppSelector(state => state.loginForm.loading);
  let isAuth = useAppSelector(state => state.loginForm.isAuth);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(()=> {
      if(isAuth) {
          dispatch(clearState());
          history.push('/');
      }
  }, [isAuth]);

  return (
    <div className={s.root}>
      <h3>{status}</h3>
      <InputGroup id="username" placeholder="Enter your login..."
                  value={login}
                  onChange={(event) => dispatch(changeLogin(event.target.value))}/>
      <InputGroup id="password" placeholder="...and password"
                  value={password}
                  onChange={(event) => dispatch(changePassword(event.target.value))}/>
      <Button icon="send-to" intent="success" text="Войти" onClick={
        () => dispatch(loginUser({login, password}))
      }/>
    </div>
  )
}

export default LoginForm;
