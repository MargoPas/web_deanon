import * as React from "react";

interface IProps {
    First: string;
    Middle: string;
    Last: string;
}

const Results: React.FC<IProps>  = (props) => {
    const first = props.First;
    const mid = props.Middle;
    const last = props.Last;
    function getSlaves() {
        fetch('/api/uploading_people/find_people')    // доделать!!! - меня прервали камбэком фоток
    }
    return (
        <div>

        </div>
    )
}

export default Results;