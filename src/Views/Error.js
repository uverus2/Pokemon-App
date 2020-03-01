import React from 'react';

import {useHistory} from "react-router-dom";

function Error(props) {
    const history = useHistory();
    const goBack = ()=> {
        history.goBack();
    }
    return (
        <div>
            <h1>You have an error</h1>
            <button onClick={goBack}>Please go back</button>
        </div>
    )
}

export default Error

