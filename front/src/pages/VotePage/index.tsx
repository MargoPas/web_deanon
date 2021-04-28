import * as React from 'react';
import NavBar from "../../components/NavBar";
import {useEffect, useState} from "react";
import Vote from "../../components/Vote";

interface IProps {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string
}

export const VotePage: React.FC = () => {
    const [bastards, setBastards] = useState([]);
    useEffect(() => {
        fetch('/api/uploading_people/all_people', {
            method: 'GET',
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
    },[bastards]);
    return(
        <div>
            <NavBar/>
            <Vote slavesList={bastards}/>
        </div>
    )
}