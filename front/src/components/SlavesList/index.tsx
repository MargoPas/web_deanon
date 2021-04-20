import React from 'react';

import {IProps as OneSlave} from './OneSlave';

interface IProps {
  slavesList: Array<OneSlave>
}

const SlavesList: React.FC<IProps> = (props) => {
  return(
    <div>
      {props.slavesList.map(
        (slaves) =>
          <div>{slaves}</div>
      )}
    </div>
  )
}

export default SlavesList;
