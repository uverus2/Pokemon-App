import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

// Styles

const CardWrap = styled.div`
    padding:15px;
    color: ${({ theme }) => theme.colors.secondaryBlue};
    background: ${({ theme }) => theme.colors.mainYellow};
    border: 2px solid ${({ theme }) => theme.colors.secondaryBlue};

    :hover{
        background: ${({ theme }) => theme.colors.secondaryBlue};
        color:${({ theme }) => theme.colors.mainYellow};
    }
`;

// Component

function SmallerCard(props) {
    const {onClick, name} = props;
    return (
        <CardWrap onClick={onClick}>
            <h4>{name}</h4>
        </CardWrap>
    )
}

SmallerCard.propTypes = {
    name: PropTypes.string.isRequired
}

export default SmallerCard;


