import * as React from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import s from './Register.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, registerUser, changeEmail } from './@slice';
import { Redirect } from 'react-router-dom';
import Routes from '../../pages/routes';

const RegisterForm: React.FC  = () => {
  const login = useAppSelector(state => state.registerForm.login);
  const password = useAppSelector(state => state.registerForm.password);
  const status = useAppSelector(state => state.registerForm.loading);
  const email = useAppSelector(state => state.registerForm.email)
  let isAuth = useAppSelector(state => state.registerForm.isAuth);
  const dispatch = useAppDispatch();

  return ( isAuth ? <Redirect to={Routes.ROOT}/> :
      <div className={s.root}>
        <h3>{status}</h3>
        <InputGroup id="username" placeholder="Enter your login..."
                    value={login}
                    onChange={(event) => dispatch(changeLogin(event.target.value))}/>
        <InputGroup id="password" placeholder="...and password"
                    value={password}
                    onChange={(event) => dispatch(changePassword(event.target.value))}/>
        <InputGroup id="email" placeholder="Your e-mail"
                    value={email}
                    onChange={(event) => dispatch(changeEmail(event.target.value))}/>
        <Button icon="send-to" intent="success" text="Войти" onClick={
          () => dispatch(registerUser({login, password, email}))
        }/>
      </div>
  )
}

export default RegisterForm;