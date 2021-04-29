import * as React from 'react';
import NavBar from "../../components/NavBar";
import MyBar from "../../components/Statistics";

let data = [
    {
        'personId': 1,
        'votes': 5,
    },
    {
        'personId': 2,
        'votes': 2,
    },
    {
        'personId': 3,
        'votes': 10
    }
]

export const Stat: React.FC = () => (
    <div>
        <NavBar/>
        <MyBar dataPoints={data}/>
    </div>
)