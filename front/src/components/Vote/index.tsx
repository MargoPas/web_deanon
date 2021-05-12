import React, {useEffect} from "react";
import s from "../Vote/Vote.module.scss";
import {Avatar, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {clearState} from "../Login/@slice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useHistory} from "react-router-dom";
import {Button} from "@blueprintjs/core";
import {setVote, changeIsAuth, voteForPerson} from "./@slice";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    }
}));

interface IProps {
    slavesList: Array<Slave>
}

interface Slave {
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    id: number;
    Description: string;
    Photo: any;
}

const Vote: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const people_id = useAppSelector(state => state.voteForm.people_id);
    let haveVoted = useAppSelector(state => state.voteForm.haveVoted);
    let isAuth = useAppSelector(state => state.voteForm.isAuth);
    const classes = useStyles();

    useEffect(()=> {
        if(haveVoted) {
            dispatch(clearState());
            history.push('/');
        }
    }, [haveVoted]);

    return (
        <div id={s.rooot}>
        <div className={s.root}>
            <h2 className={s.h2}>Here you go! Vote for worst of the worst ^*^</h2>
            <h2 className={s.h2_1}>U have only 1 chance ;)</h2>
            <div className={s.cards}>
                {props.slavesList.map(
                    (slaves) =>
                        <label className={s.hat}>
                            <input type={'radio'} name={'la'} value={slaves.id} onClick={() => {dispatch(setVote(slaves.id));}}/>
                            <p className={s.title}>
                                {slaves.First_Name + ' ' + slaves.Middle_Name + ' ' + slaves.Last_Name}
                            </p>
                            <Avatar className={classes.icon} src={'/api/uploading_people/photo/' + slaves.Photo} alt={'тут должно быть фото'}/>
                        </label>
                )}
                <div className={s.button}>
                    <Button
                    icon="small-tick" intent={'none'}
                    text="Проголосовать"
                    onClick={() => {dispatch(voteForPerson({people_id}));}}
                    />
                </div>

            </div>
        </div>
        </div>
    );
}

export default Vote;
