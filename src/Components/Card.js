import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

// Components
import Button from "./Buttons";


// Context
import {ListContext} from "../config/store";

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

    button {
        max-width:280px;
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

   h3{
    font-weight:bold;
    color:${({ theme }) => theme.colors.secondaryBlue};
    padding-top:5px;
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
    const {name, image, speed, spDefence, spAttack, defense, attack, hp, type1, type2, height, weight, remove } = props;

    let [myFavourite, setMyFacourite] = useContext(ListContext);
    const [showButton, setButtonView] = useState(true);
    const [removeCard, setRemoveCard] = useState(true);
 
    const AddToProfileHandler = () => {
        // Add the pokemon to localStorage list
        myFavourite.push(name)
        const uniqueArray =  [...new Set(myFavourite)]
        // const removeStoreItem = uniqueArray.filter(e => e !== name);
        // removeStoreItem.push(name);

        console.log(uniqueArray)
        // Set the list
        setButtonView(false);
        localStorage.setItem('MyFarArray', uniqueArray);
       
    };

    const removeFromProfileHandler = () => {
        const localStorageExistingValues = localStorage.getItem("MyFarArray").split(",");
        const removeStoreItem = localStorageExistingValues.filter(e => e !== name);
        console.log(removeStoreItem);
        setMyFacourite(removeStoreItem);
        localStorage.setItem('MyFarArray', removeStoreItem);
        setRemoveCard(false);
    };

    return (
        <React.Fragment> 
        { removeCard && (
        <CardWrapper>
            <CardHeader>
                <h1>{name}</h1>
                <div>
                    <h2>{hp}</h2>
                    <h3>Height:{height * 10}cm</h3>
                    <h3>Weight:{weight/10}kg</h3>
                </div>
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
            {showButton && !remove && (<Button text="Add to favourite" onClick={AddToProfileHandler}/> )}
            {remove && (<Button text="Remove" onClick={removeFromProfileHandler}/> )}
        </CardWrapper>
        )}
        </React.Fragment>
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
    type2: PropTypes.string.isRequired,
    height:PropTypes.number.isRequired, 
    weight:PropTypes.number.isRequired
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
    type2:"",
    height: 10,
    weight: 10
  };

export default Card

