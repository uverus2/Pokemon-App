import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


// Assets
import logo from "../assets/pokemon-23-logo-svg-vector.svg";
import cyndaquilRun from "../assets/cyndaquil.gif";

// Components 
import Button from "./Buttons";

const HeaderWrap = styled.div`
    display:flex;
    flex-direction:column;
`;

const Logo = styled.img`
    max-width:300px;
    max-height:150px;
    margin:auto;
    padding:30px 0;
`;

const ButtonWrap = styled.div`
    display:grid;
    padding:10px;
    justify-content:center;
    grid-template-columns: repeat(3 , minmax(80px,120px));
    grid-column-gap:20px;
    grid-row-gap:20px;
    grid-template-rows:1fr;
`;

const Running = styled.div`
    width:100%;
    display:flex;
    justify-content:space-around;
    img{
        width:125px;
        height:125px;
        animation: move 5s steps(20) infinite normal ;
    }

    @keyframes move {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }

    }
`;

function Header(props) {
    return (
        <HeaderWrap>
            <Logo src={logo} alt=""/>
            <ButtonWrap> 
                <Link to="/"> <Button text="Home"/> </Link>
                <Link to="/compare"> <Button text="Compare"/> </Link>
                <Link to="/profile"> <Button text="Favourite"/> </Link>
            </ButtonWrap>
            <Running>
                <img src={cyndaquilRun} alt="Cyndaquil Running"/>
                <img src={cyndaquilRun} alt="Cyndaquil Running"/>
            </Running>
            
        </HeaderWrap>
    )
}

export default Header

