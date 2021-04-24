import React, {useState} from 'react';
import s from './SlavesList.module.scss'
import OneSlave from './OneSlave';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import {createMuiTheme} from "@material-ui/core/styles";
import {purple, red} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";

interface IProps {
  slavesList: Array<Slave>
}

interface Request {
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
}

interface Slave {
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
  Description: string;
  user_id: number;
  id: number;
  Photo: any;
}


const SlavesList: React.FC<IProps> = (props) => {
    const [isEmpty, setIsEmpty] = useState(true);
    if (props.slavesList.length !== 0) {
        if (isEmpty) {
            setIsEmpty(false)     // система Ниппель: даже не спрашивайте, как я к этому пришла, я только написала это и уже не помню с чего начинала, пздц
        }
    }
  return(
    <div className={s.root}>
        {isEmpty ?
            <div className={s.empty}>
                <p className={s.message}>
                    We haven't find this person in our database. But we sure you can tell us something interesting about him ;)
                </p>

                <EmojiNatureIcon color={'primary'} className={s.icon}/>

            </div> :
            <div id={s.mainy}>
            {props.slavesList.map(
                (slaves) =>
                    <div>
                        <OneSlave First_Name={slaves.First_Name} Middle_Name={slaves.Middle_Name}
                                  Last_Name={slaves.Last_Name} Description={slaves.Description} id={slaves.id} Photo={slaves.Photo}
                                  user_id={slaves.user_id}/>
                    </div>
            )}
        </div>}
    </div>
  )
}


export default SlavesList;

