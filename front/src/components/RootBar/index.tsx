import s from './RootBar.module.scss'
import * as React from 'react';
import {Avatar, makeStyles, Typography} from "@material-ui/core";
import {deepOrange, deepPurple} from "@material-ui/core/colors";

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
            </div>
        </div>
            <div className={s.aboutUs}>
                <h2>При участии:</h2>
            <div className={s.icons}>
            <Avatar className={classes.orange}>PR</Avatar>
            <Avatar className={classes.purple}>BR</Avatar>
            </div>
            </div>
        </div>
    )
}


export default RootBar;

