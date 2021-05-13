import * as React from 'react';
import NavBar from "../../components/NavBar";
import {useEffect, useState} from "react";
import Vote from "../../components/Vote";
import Delete from "../../components/Delete";

interface IProps {
    First_Name: string,
    Middle_Name: string,
    Last_Name: string
}

export const DeletePage: React.FC = () => {
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
            <Delete slavesList={bastards}/>
        </div>
    )
}