import * as React from 'react';
import s from './UnmaskForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFirst, changeDesc, changeLast, unmaskPerson, changePhoto, clearState, changeIsAuth, changeMiddle } from './@slice';
import {useEffect} from "react";
import {useHistory} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import {Box, makeStyles} from "@material-ui/core";
import {Button, Icon} from '@blueprintjs/core'
import {purple, red} from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[500],
        },
        secondary: {
            main: purple[500],
        },
    },
});


const UnmaskForm: React.FC  = () => {
    const First_Name = useAppSelector(state => state.unmaskForm.First_Name);
    const Middle_Name = useAppSelector(state => state.unmaskForm.Middle_Name);
    const Last_Name = useAppSelector(state => state.unmaskForm.Last_Name);
    const Description = useAppSelector(state => state.unmaskForm.Description);
    const Photo = useAppSelector(state => state.unmaskForm.Photo);
    let isAuth = useAppSelector(state => state.unmaskForm.isAuth);
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
            <div id={s.mainy}>
                <div className={s.icon}>
                    <Icon icon={'heart-broken'} intent={'danger'} iconSize={60}/>
                </div>
                <div className={s.left}>
                    <ThemeProvider theme={theme}>
                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        color={'primary'}
                        required
                        fullWidth
                        id={'fname'}
                        label={"First name..."}
                        name={'First_Name'}
                        value={First_Name}
                        onChange={(event) => dispatch(changeFirst(event.target.value))}
                    />
                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        required
                        fullWidth
                        id={'mname'}
                        label={"Middle name..."}
                        name={'Middle_Name'}
                        value={Middle_Name}
                        onChange={(event) => dispatch(changeMiddle(event.target.value))}
                    />
                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        required
                        fullWidth
                        id={'lname'}
                        label={"Last name..."}
                        name={'Last_Name'}
                        value={Last_Name}
                        onChange={(event) => dispatch(changeLast(event.target.value))}
                    />
                    </ThemeProvider>
                    <input className={s.input} type={'file'} name={'file'} accept={'image/*'} onChange={(event) => {
                        if(!event.target.files || event.target.files.length == 0) {
                            changePhoto(null)
                            return
                        }
                        changePhoto(event.target.files[0]);
                    }}/>
                    <Button disabled={!(Last_Name && First_Name && Description)}
                                icon="log-in" intent={'danger'} className={classes.submit} text="Войти" onClick={
                    () => dispatch(unmaskPerson({First_Name, Middle_Name, Last_Name, Description, Photo}))
                }/>
                </div>
                <div className={s.right}>
                    <p className={s.p_text}>
                        Describe this shitty person! Don't be<p className={s.p_red}>shy</p>
                    </p>
                    <textarea
                        className={s.textarea}
                        rows={10}
                        onChange={(ev) => {dispatch(changeDesc(ev.target.value))}}>
                        Let's fuck up his life
                    </textarea>
                </div>
            </div>
        </div>
    )
}


export default UnmaskForm;