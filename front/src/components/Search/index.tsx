import * as React from 'react';
import s from './Search.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import {changeFirst, changeLast, changeMiddle, clearState} from './@slice';
import {useEffect} from "react";
import {Link, useHistory} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import {Box, makeStyles} from "@material-ui/core";
import {Button, Icon} from '@blueprintjs/core'
import {purple, red} from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from '@material-ui/core/styles';
import {useState} from "react";
import {fetchData} from "../../utils/API";
import Routes, {RoutesNames} from "../../pages/routes";

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

const SearchForm: React.FC  = () => {
    const First_Name = useAppSelector(state => state.searchForm.First_Name);
    const Middle_Name = useAppSelector(state => state.searchForm.Middle_Name);
    const Last_Name = useAppSelector(state => state.searchForm.Last_Name);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [voted, setVoted] = useState(true);  // true значит ссылочки не будет

    function haveVoted() {
        fetchData('/api/voting/voted', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                if(!response.ok) {
                    setVoted(true);  // опять-таки, если не авторизовался, то не будет ссылки
                }
                return response.json();
            })
            .then(data => {
                if(data.message == 'no votes' && voted) {
                    setVoted(false);
                }
                else if(data.message == 'voted') {setVoted(true);}
            })
    }

    function findPerson(first: string, middle: string, last: string) {
        history.push(`/bastards/${first}/${middle}/${last}`);
        dispatch(clearState());
    }

    useEffect(() => {haveVoted();}, [voted]);

    return (
        <div className={s.root}>
            <div className={s.icon}>
                <Icon icon={'star-empty'} intent={'danger'} iconSize={60}/>
            </div>
            <div className={s.icon3}>
                <Icon icon={'star'} intent={'danger'} iconSize={40}/>
            </div>
            <div id={s.mainy}>
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
                    <Button disabled={!(Last_Name && First_Name && Middle_Name)}
                            icon="draw" intent={'danger'}
                            className={classes.submit} text="Отправить"
                            onClick={() => {
                                findPerson(First_Name, Middle_Name, Last_Name);
                            }}
                    />
                </div>
                <div className={s.right}>
                    {voted ? <p>Wanna <Link to={Routes.VOTE}>
                        vote
                    </Link>?</p> :
                    <p>XXXX</p>}
                </div>
            </div>
            <div className={s.icon2}>
                <Icon icon={'star-empty'} intent={'danger'} iconSize={60}/>
            </div>
        </div>
    )
}

export default SearchForm;