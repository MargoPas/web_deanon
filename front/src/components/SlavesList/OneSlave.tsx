import React, {useState} from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar} from "@material-ui/core";
import s from "./OneSlave.module.scss"
export interface IProps {
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
  Description: string;
  user_id: number;
  id: number;
  Photo: any;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(20),
    height: theme.spacing(20),

  }
}));



const OneSlave: React.FC<IProps> = (props) => {
  const classes = useStyles();
  let First_Name = props.First_Name;
  let Middle_Name = props.Middle_Name;
  let Last_Name = props.Last_Name;
  let Description = props.Description;

  return (
      <div id={s.framy}>
        <div className={s.frame}>
        <div className={s.hat}>
          <p className={s.head}>{First_Name + ' ' + Middle_Name + ' ' + Last_Name}</p>
          <Avatar className={classes.icon} src={'http://' + props.Photo} alt={'тут должно быть фото'}/>
        </div>
        <CardContent>
          <Typography className={"typ"} paragraph={true}>
            {Description.split("\n").map((i, key) => {
              return <p key={key}>{i}</p>
            })}
          </Typography>
        </CardContent>
        </div>
      </div>

  );
}

export default OneSlave;

