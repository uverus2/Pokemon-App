import React from 'react';
import {useHistory} from "react-router-dom";
import styled from "styled-components";

// Components 
import Button from "../Components/Buttons";


//Styles
const ErrorWrap = styled.div`
        max-width:600px;
        margin:auto;
        height:100vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;

    button{
        width:100%;
        max-width:300px;
        margin:20px 0;
    }
    h1{
        text-align:center;
        font-size:35px;
        line-height:40px;
        padding:0px 10px;
        font-weight:bold;
        color: ${({theme}) => theme.colors.thirdNavy}
    }
`;

// Component
function Error() {
    const history = useHistory();
    const goBack = ()=> {
        history.goBack();
    };
    return (
        <ErrorWrap>
            <h1>The page you have visited does not exist. Please return!</h1>
            <Button text="Please go back" onClick={goBack}/>
        </ErrorWrap>
    )
}

export default Error

