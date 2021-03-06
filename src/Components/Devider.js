import React from 'react';
import devider from "../assets/Vector.svg";
import styled from "styled-components";

// Styles

const DeviderWrap = styled.div`
    width:100%;
    padding:20px 0px;
    img{
        width:100%;
    }
`;

// Component

function Devider() {
    return (
        <DeviderWrap>
            <img src={devider} alt="Devider" />
        </DeviderWrap>
    )
}

export default Devider

