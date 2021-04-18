import * as React from 'react';
import NavBar from "../../components/NavBar";
import UnmaskForm from '../../components/UnmaskForm';

export const Unmask: React.FC = () => {
    return (
        <div>
            <NavBar/>
            <UnmaskForm/>
        </div>
    );
}