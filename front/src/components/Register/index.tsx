import * as React from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import s from './Register.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, registerUser, changeEmail, changeName} from './@slice';
import {Redirect, useHistory} from 'react-router-dom';
import {useEffect} from "react";
import {clearState} from "./@slice";

const RegisterForm: React.FC  = () => {
  const login = useAppSelector(state => state.registerForm.login);
  const password = useAppSelector(state => state.registerForm.password);
  const status = useAppSelector(state => state.registerForm.loading);
  const e_mail = useAppSelector(state => state.registerForm.e_mail);
  const name = useAppSelector(state => state.registerForm.name);
  let isAuth = useAppSelector(state => state.registerForm.isAuth);
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
        <InputGroup id="login" placeholder="Your login"
                    value={login}
                    onChange={(event) => dispatch(changeLogin(event.target.value))}/>
        <InputGroup id="password" placeholder="Your password"
                    value={password}
                    onChange={(event) => dispatch(changePassword(event.target.value))}/>
        <InputGroup id="e_mail" placeholder="Your e-mail"
                    value={e_mail}
                    onChange={(event) => dispatch(changeEmail(event.target.value))}/>
        <InputGroup id="name" placeholder="Your name for rita"
                    value={name}
                    onChange={(event) => dispatch(changeName(event.target.value))}/>
        <Button icon="send-to" intent="success" text="Зарегистрироваться" onClick={
          () => dispatch(registerUser({login, password, e_mail, name}))
        }/>
      </div>
  )
}

export default RegisterForm;