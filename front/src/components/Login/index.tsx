import * as React from 'react';
import s from './LoginForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, loginUser } from './@slice';
import {useEffect} from "react";
import {clearState} from './@slice'
import {useHistory} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import {Box, makeStyles} from "@material-ui/core";
import {Button, Icon} from '@blueprintjs/core'

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



const LoginForm: React.FC  = () => {
  const login = useAppSelector(state => state.loginForm.login);
  const password = useAppSelector(state => state.loginForm.password);
  const status = useAppSelector(state => state.loginForm.loading);
  let isAuth = useAppSelector(state => state.loginForm.isAuth);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(()=> {
      if(isAuth) {
          dispatch(clearState());
          history.push('/');
      }
  }, [isAuth]);

  return (
      <div className={s.root}>
          <div className={classes.paper}>
              <Icon icon={'heart-broken'} intent={'danger'} iconSize={60}/>
              <Box fontFamily={"Monospace"} fontSize={'h2.fontSize'} m={1}>
                  Sign in
              </Box>
              <form className={classes.form}>
                  <TextField
                      variant={'outlined'}
                      margin={'normal'}
                      required
                      fullWidth
                      id={'username'}
                      label={"Your login"}
                      name={'login'}
                      value={login}
                      onChange={(event) => dispatch(changeLogin(event.target.value))}
                  />
                  <TextField
                      variant={'outlined'}
                      margin={'normal'}
                      required
                      fullWidth
                      name={'password'}
                      label={"Your password"}
                      type={'password'}
                      id={'password'}
                      value={password}
                      onChange={(event) => dispatch(changePassword(event.target.value))}
                  />
                  <Button disabled={!(password && login)}
                      icon="log-in" intent={'danger'} className={classes.submit} text="Войти" onClick={
                      () => dispatch(loginUser({login, password}))
                  }/>
              </form>
          </div>
      </div>
  )
}


export default LoginForm;
