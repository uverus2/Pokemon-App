import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const CardWrapper = styled.div`
    padding: 20px 0px;
    width:100%;
    background-image: linear-gradient(to right, ${({ theme }) => theme.colors.secondaryBlue} , ${({ theme }) => theme.colors.mainYellow});
    text-align:center;

    ul{ 

        text-align:left;
        padding: 20px 20px;
    }

    ul li{
        padding:5px 0px;
        color:black;
        font-size:20px;
        font-weight:bolder;
        text-transform:capitalize;
    }
    
`;

const CardHeader = styled.div`
   display:flex; 
   justify-content:space-between;
   padding: 0 20px;

   h1{
       text-transform:capitalize;
       font-size:25px;
       font-weight:bold;
       color:${({ theme }) => theme.colors.mainYellow};
   }

   h2{
        text-transform:uppercase;
        font-weight:bold;
        color:${({ theme }) => theme.colors.secondaryBlue};
   }
`;

const PokemonTypes = styled.div`
   padding: 20px 20px;
   text-align:left;
   text-transform:capitalize;
   color:${({ theme }) => theme.colors.mainYellow};
   font-size:20px;
`;

const ImageContainer = styled.div`
   width:100%;
   margin: 10px 0px;
   background:${({ theme }) => theme.colors.secondaryBlue};
   box-sizing:border-box;
   border:solid 10px ${({ theme }) => theme.colors.thirdNavy};
   img {
    width:100%;
    height:100%;
    max-width:250px;
    max-height:250px;
   }
`;

function Card(props) {
    const {name, image, speed, spDefence, spAttack, defense, attack, hp, type1, type2 } = props;
    return (
        < CardWrapper>
            <CardHeader>
                <h1>{name}</h1>
                <h2>{hp}</h2>
            </CardHeader>
            <PokemonTypes>
                <h3>{type1}</h3>
                <h3>{type2}</h3>
            </PokemonTypes>
            <ImageContainer>
                <img src={image} alt={image}/>
            </ImageContainer>
            <ul>
                <li><h4>{speed}</h4></li>
                <li><h4>{spDefence}</h4></li>
                <li><h4>{spAttack}</h4></li>
                <li><h4>{defense}</h4></li>
                <li><h4>{attack}</h4></li>
            </ul>
            
        </ CardWrapper>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    speed: PropTypes.array.isRequired,
    spDefence: PropTypes.array.isRequired,
    spAttack: PropTypes.array.isRequired,
    defense: PropTypes.array.isRequired,
    attack: PropTypes.array.isRequired,
    hp: PropTypes.array.isRequired,
    type1: PropTypes.string.isRequired,
    type2: PropTypes.string.isRequired
}

Card.defaultProps = {
    name: 'Name',
    image: "www.https://via.placeholder.com/150x150",
    speed: "Speed:40",
    spDefence: "Special Defence:40",
    spAttack: "Special Attack:40",
    defense: "Defense:40",
    attack: "Attack:40",
    hp: "HP:40",
    type1:"Poison",
    type2:""

  };

export default Card

