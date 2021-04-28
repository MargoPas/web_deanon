import React, {useEffect} from "react";
import s from "../Vote/Vote.module.scss";
import {Avatar} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {makeStyles} from "@material-ui/core/styles";
import {clearState} from "../Login/@slice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useHistory} from "react-router-dom";
import {unmaskPerson} from "../UnmaskForm/@slice";
import {Button} from "@blueprintjs/core";
import {setVote, changeIsAuth, voteForPerson} from "./@slice";
import {fetchData} from "../../utils/API";


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
    people_id: number;
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
        <div className={s.root}>
            <h2 className={s.h2}>Here we go! Vote for worst of the worst ^*^</h2>
            <div className={s.cards}>
                {props.slavesList.map(
                    (slaves) =>
                        <div className={s.hat}>
                            <input type={'radio'} value={slaves.people_id} onClick={() => {dispatch(setVote(slaves.people_id));}}/>
                            <p>
                                {slaves.First_Name + ' ' + slaves.Middle_Name + ' ' + slaves.Last_Name}
                            </p>
                            <Avatar className={classes.icon} src={'http://' + slaves.Photo} alt={'тут должно быть фото'}/>
                        </div>
                )}
            </div>
            <Button
                icon="draw" intent={'danger'}
                text="Проголосовать"
                onClick={() => {dispatch(voteForPerson({people_id}));}}
            />
        </div>
    );
}

export default Vote;