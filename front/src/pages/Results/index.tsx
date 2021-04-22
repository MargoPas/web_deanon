import * as React from 'react';
import NavBar from "../../components/NavBar";
import Results from '../../components/Results';
import {useEffect, useState} from "react";
import SlavesList from "../../components/SlavesList";

interface IProps {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string
}

export const ResultsPage: React.FC<IProps> = (props) => {
    const [bastards, setBastards] = useState([]);
    useEffect(() => {
        fetch('/api/uploading_people/find_people', {
            method: 'GET',
            body: JSON.stringify({ First_Name: props.First_Name, Middle_Name: props.Middle_Name, Last_Name: props.Last_Name}),
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