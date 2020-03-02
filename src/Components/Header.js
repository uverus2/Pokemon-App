import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

// Assets
import logo from "../assets/pokemon-23-logo-svg-vector.svg";

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

function Header(props) {
    return (
        <HeaderWrap>
            <Logo src={logo} alt=""/>
            <ButtonWrap> 
                <Link to="/"> <Button text="Home"/> </Link>
                <Link to="/"> <Button text="Compare"/> </Link>
                <Link to="/"> <Button text="Favourite"/> </Link>
            </ButtonWrap>
        </HeaderWrap>
    )
}

export default Header

