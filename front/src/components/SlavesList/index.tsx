import React from 'react';
import s from './SlavesList.module.scss'
import OneSlave from './OneSlave';

interface IProps {
  slavesList: Array<Slave>
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
  return(
    <div className={s.root}>
      <div id={s.mainy}>
        {props.slavesList.map(
          (slaves) =>
              <div>
                <OneSlave First_Name={slaves.First_Name} Middle_Name={slaves.Middle_Name}
                          Last_Name={slaves.Last_Name} Description={slaves.Description} id={slaves.id} Photo={slaves.Photo}
                          user_id={slaves.user_id}/>
              </div>
        )}
      </div>
    </div>
  )
}

export default SlavesList;
