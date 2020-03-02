import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const Button = styled.button`
    padding:15px;
    width:100%;
    color: ${({ theme }) => theme.colors.secondaryBlue};
    background: ${({ theme }) => theme.colors.mainYellow};
    border: 2px solid ${({ theme }) => theme.colors.secondaryBlue};
    font-weight:bold;
    border-radius:25px;
    :hover{
        background: ${({ theme }) => theme.colors.secondaryBlue};
        color:${({ theme }) => theme.colors.mainYellow};
    }
    :focus{
        outline:none;
    }
`;

function Buttons(props) {
    const {text, onClick} = props;
    return (
        <Button onClick={onClick}> {text} </Button>
    )
}

Buttons.propTypes = {
    text: PropTypes.string.isRequired
}

Buttons.defaultProps = {
    text: 'Click Me'
  };

export default Buttons

