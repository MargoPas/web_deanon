import * as React from 'react';
import NavBar from "../../components/NavBar";
import MyBar from "../../components/Statistics";

let data = [
    {
        'last_name': 1,
        'count': 5,
    },
    {
        'last_name': 2,
        'count': 2,
    },
    {
        'last_name': 3,
        'count': 10
    }
]

export const Stat: React.FC = () => (
    <div>
        <NavBar/>
        <MyBar/>
    </div>
)