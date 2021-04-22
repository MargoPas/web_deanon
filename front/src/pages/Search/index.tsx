import * as React from 'react';
import NavBar from "../../components/NavBar";
import SearchForm from "../../components/Search";

export const Search: React.FC = () => {
    return (
        <div>
            <NavBar/>
            <SearchForm/>
        </div>
    );
}