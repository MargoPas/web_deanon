import * as React from 'react';
import NavBar from "../../components/NavBar";
import {useEffect, useState} from "react";
import SlavesList from "../../components/SlavesList";
import { RouteComponentProps, useLocation } from 'react-router-dom';
interface IProps {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const ResultsPage: React.FC = () => {
    //console.log(props.location);

    let query = useQuery();

    const [bastards, setBastards] = useState([]);
    useEffect(() => {
        fetch('/api/uploading_people/find_people', {
            method: 'POST',
            body: JSON.stringify({ First_Name: query.get('first'),
                Middle_Name: query.get('middle'), Last_Name: query.get('last')}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response => {return response.json();}))
            .then(data => {
                if(bastards.length !== data.length) {
                    setBastards(data);
                }
            });
    },[]);
    return(
        <div>
            <NavBar/>
            <SlavesList slavesList={bastards}/>
        </div>
    )
}