import * as React from 'react';
import NavBar from "../../components/NavBar";
import Results from '../../components/Results';
import {useEffect} from "react";
import SlavesList from "../../components/SlavesList";

export const ResultsPage: React.FC = (props) => {
    useEffect(() => {
        //getNewsList();
    },[]);
    return(
        <div>
            <NavBar/>
            <SlavesList slavesList={[]}/>
        </div>
    )
}