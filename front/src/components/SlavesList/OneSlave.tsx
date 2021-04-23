import React, {useState} from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core/styles";

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
  root: {
    top: 60,
    margin: 40,
    maxWidth: 800,
  },
  media: {
    height: 0,
    paddingTop: '56%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  header: {
    fontSize: '1.2rem'
  }
}));


const OneSlave: React.FC<IProps> = (props) => {
  const classes = useStyles();
  let First_Name = props.First_Name;
  let Middle_Name = props.Middle_Name;
  let Last_Name = props.Last_Name;
  let Description = props.Description;

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  return (
      <Card className={'article'}>
        <CardHeader className={classes.header} title={First_Name + ' ' + Middle_Name + ' ' + Last_Name}/>
        <img height={70} src={'http://' + props.Photo} alt={'тут должно быть фото'}/>
        <CardActions disableSpacing>
          <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label={'show more'}>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout={"auto"} unmountOnExit>
          <CardContent>
            <Typography className={"typ"} paragraph={true}>
              {Description.split("\n").map((i, key) => {
                return <p key={key}>{i}</p>
              })}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
  );
}

export default OneSlave;

