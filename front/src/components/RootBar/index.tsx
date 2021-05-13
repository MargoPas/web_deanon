import s from './RootBar.module.scss'
import * as React from 'react';
import {Avatar, Button, makeStyles, Typography} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeIsAuth, makeIsAdminFalse, makeIsAdminTrue} from "./@slice";
import Routes, {RoutesNames} from "../../pages/routes";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {fetchData} from '../../utils/API'

const useStyles = makeStyles((theme) => ({
    orange: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        color: "white",
        backgroundColor: theme.palette.secondary.light,
        margin: 10,
        fontSize: 40,
        fontFamily: "cursive"
    },
    purple: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        color: "white",
        backgroundColor: theme.palette.error.light,
        margin: 10,
        fontSize: 40,
    },
}))

const RootBar: React.FC = () => {
    const classes = useStyles();
    let isAuth = useAppSelector(state => state.rootState.isAuth);
    let isAdmin = useAppSelector(state => state.rootState.isAdmin);
    const dispatch = useAppDispatch();
    function GetIsAuth() {
        fetchData('/api/cookie', {
            credentials: "include",
            method: 'GET',
            referrerPolicy: "unsafe-url",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache": "no-cache"
            }
        })
            .then(response => {
                if (response.ok) {
                    if(isAuth == false) {
                        dispatch(changeIsAuth())
                    }
                }
                console.log(response.ok)
                return response.json();
            })
            .then(data => {
                console.log(data);
            });
    }
    function GetIsAdmin() {
        fetchData('/api/uploading_people/admin', {
            credentials: "include",
            method: 'GET',
        })
            .then(response => {
                console.log(response.ok)
                if(response.ok) {
                    return response.json()
                }
                else {
                    return false;
                }
            })
            .then(data => {
                if(data) {
                    if(!isAdmin) {dispatch(makeIsAdminTrue());}
                }
                else {
                    if(isAdmin) {
                        dispatch(makeIsAdminFalse());
                    }
                }
            });
    }
    useEffect(()=>{GetIsAuth(); GetIsAdmin();}, [isAuth, isAdmin]);
    return (
        <div className={'root'}>
            <div id={s.mainy}>
                <div className={s.about}>
                    <p>
                        Стали свидетелем несправедливости? Не можете держать в себе, как все нормальные люди?
                        Мы Вас не осуждаем. Идея данного приложения принадлежит не нам, а значит, людям до нас приходила в голову
                        мысль создания такого сайта, где все могли бы публиковать и находить информацию о жестокостях этого мира,
                        видимо, в надежде на то, что от этого кому-то станет лучше, а может и хуже (вероятно, виновникам несправедливости).
                        Так что можете чувствовать себя свободными пользоваться возможностями, (пока не) предоставляемыми этим местом.
                        Регистрируйтесь и вперёд с нами навстречу бесполезным разоблачениям и горьким реалиям нашей российкой жизни!
                    </p>
                    {isAuth ? <Link className={s.link} to={Routes.UNMASK}>
                        {RoutesNames.UNMASK}
                    </Link>:<p>Sign in to unmask!</p>}
                </div>
            </div>
            {isAdmin ? <Link className={s.admin} to={'/delete'}>delete from db</Link> :
            <p> </p>}
            <div className={s.aboutUs}>
                <p className={s.p}>Created by:</p>
                <div className={s.icons}>
                    <Avatar className={classes.orange}>PR</Avatar>
                    <Avatar className={classes.purple}>BR</Avatar>
                </div>
            </div>
        </div>
    )
}


export default RootBar;
