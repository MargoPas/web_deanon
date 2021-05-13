import React, {useEffect} from "react";
import s from "./Delete.module.scss";
import {Avatar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useHistory} from "react-router-dom";
import {Button} from "@blueprintjs/core";
import {setPerson, clearState, deletePerson} from "./@slice";
import {fetchData} from "../../utils/API";


const useStyles = makeStyles((theme) => ({
    icon: {
        width: theme.spacing(15),
        height: theme.spacing(15),
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

const Delete: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const id = useAppSelector(state => state.deleteForm.id);
    const classes = useStyles();

    useEffect(() => {
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
                if(!data) {
                    alert('You\'re not admin.')
                    history.push('/');
                }
            });
    }, [])

    return (
        <div className={s.rooot}>
            <div className={s.root}>
                <p className={s.intro}>Choose person:</p>
                <div className={s.cards}>
                    {props.slavesList.map(
                        (slaves) =>
                            <label className={s.hat}>
                                <input type={'radio'} name={'la'} value={slaves.id} onClick={() => {dispatch(setPerson(slaves.id));}}/>
                                <p className={s.title}>
                                    {slaves.First_Name + ' ' + slaves.Middle_Name + ' ' + slaves.Last_Name}
                                </p>
                                <Avatar className={classes.icon} src={'/api/uploading_people/photo/' + slaves.Photo} alt={'тут должно быть фото'}/>
                            </label>
                    )}
                </div>
                <div className={s.button}>
                    <Button
                        icon="delete" intent={'none'}
                        text="Удалить"
                        onClick={() => {
                            dispatch(deletePerson({id}));
                            history.push('/');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Delete;