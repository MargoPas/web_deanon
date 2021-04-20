// @ts-ignore
import React, { useEffect } from 'react';
import SlavesList from '../../components/SlavesList';
import NavBar from '../../components/NavBar';

const News: React.FC = () => {
  useEffect(() => {
    //getNewsList();
  },[]);
  return(
    <div>
      <NavBar/>
      <SlavesList newsList={[]}/>
    </div>
  )
}

export default News;
