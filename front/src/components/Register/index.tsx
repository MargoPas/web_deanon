import * as React from 'react';
import {Button, Icon} from '@blueprintjs/core';
import s from './Register.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, registerUser, changeEmail, changeName} from './@slice';
import {useHistory} from 'react-router-dom';
import {useEffect} from "react";
import {clearState} from "./@slice";
import {Box, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        width: 500,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginRight: 30,
        marginLeft: 25,
        marginTop: 30,
        width: '90%',
        alignItems: 'center',
    }
}));


const RegisterForm: React.FC  = () => {
  const login = useAppSelector(state => state.registerForm.login);
  const password = useAppSelector(state => state.registerForm.password);
  const e_mail = useAppSelector(state => state.registerForm.e_mail);
  const name = useAppSelector(state => state.registerForm.name);
  let isAuth = useAppSelector(state => state.registerForm.isAuth);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(()=> {
      if(isAuth) {
          dispatch(clearState());
          history.push('/');
      }
  }, [isAuth]);

  return (
      <div className={s.root}>
          <div className={classes.paper}>
              <Icon icon={'glass'} intent={'danger'} iconSize={70}/>
              <Box fontFamily={"Monospace"} fontSize={'h2.fontSize'} m={1}>
                  Sign up
              </Box>
              <form className={classes.form}>
                  <TextField
                      variant={'outlined'}
                      margin={'normal'}
                      required
                      fullWidth
                      id={'login'}
                      label={"Your login"}
                      value={login}
                      onChange={(event) => dispatch(changeLogin(event.target.value))}
                  />
                  <TextField
                      variant={'outlined'}
                      margin={'normal'}
                      required
                      fullWidth
                      id={'password'}
                      type = 'password'
                      label={"Your password"}
                      value={password}
                      onChange={(event) => dispatch(changePassword(event.target.value))}
                  />
                  <TextField
                      variant={'outlined'}
                      margin={'normal'}
                      required
                      fullWidth
                      id={'e-mail'}
                      label={"Your e-mail"}
                      value={e_mail}
                      onChange={(event) => dispatch(changeEmail(event.target.value))}
                  />
                  <TextField
                      variant={'outlined'}
                      margin={'normal'}
                      required
                      fullWidth
                      id={'name'}
                      label={"Your name"}
                      value={name}
                      onChange={(event) => dispatch(changeName(event.target.value))}
                  />
                  <Button disabled={!(password && name && e_mail && login)}
                          icon="log-in" intent={'danger'} className={classes.submit} text="Войти" onClick={
                      () => dispatch(registerUser({login, password, e_mail, name}))
                  }/>
              </form>
          </div>
      </div>
  )
}

export default RegisterForm;