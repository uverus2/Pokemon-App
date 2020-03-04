import React, {useContext, useState, useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

// Assets
import cyndaquil from "../assets/cyndaquil-error.gif";

// Components 
import Card from "../Components/Card";
import Button from "../Components/Buttons";

// Context
import {ListContext} from "../config/store";

const axios = require('axios');

const CardWrap = styled.div`
    display:grid;
    padding:0px 20px;
    justify-content:center;
    grid-template-columns: repeat( auto-fill, minmax(300px, 1fr));
    grid-gap:15px;
`;

const NoResults = styled.div`
    font-size:30px;
    font-weight:bold;
    color:${({ theme }) => theme.colors.secondaryBlue};
    text-align:center;
    padding:0px 25px;
    display:flex;
    justify-content:center;
    justify-items:center;

    button{
        max-width:400px;
        margin:20px 0px;
    }
    img{
        max-width:300px;
        margin:auto;
    }
`;

function Profile () {
    const [showEmptyMessage, setEmptyMessage] = useState(true);
    const [favPokemon, setfavPokemon] = useState([]);
    let [myFavourite, setMyFacourite] = useContext(ListContext);
    useEffect(() => {
        (async() => {
            if(myFavourite.length > 0){
                setEmptyMessage(false);
                const uniqueArray =  [...new Set(myFavourite)]
                let pokemonBrowse = await uniqueArray.map(async i => {
                        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => {
                             const pokemonData = [ res.data.species.name, res.data.sprites.front_default, res.data.types.map(i => i.type.name), res.data.stats.map(i => [i.stat.name + ": ", i.base_stat,]), res.data.height, res.data.weight];
                             return pokemonData;
                          });
                     });
                const resolvedPokemonBrowse = await Promise.all(pokemonBrowse);
                //setfavPokemon(resolvedPokemonBrowse);
                setfavPokemon(resolvedPokemonBrowse);
                // console.log(favPokemon);
            }
        })();
    },[myFavourite]);

    // useEffect(()=> {
    //     console.log(myFavourite)
    //     if(myFavourite.length > 0){
    //         setEmptyMessage(false);
    //     }else if (myFavourite.length < 0){
    //         setEmptyMessage(true);
    //     }
    //     console.log(myFavourite);
    // },[myFavourite]);
    

    let favPokemons;
    // If pokemon are present
    if(favPokemon.length > 0) {
           favPokemons = favPokemon.map(i => {
           return (
                <Card remove={true} key={i[0]} name={i[0]} image={i[1]} speed={i[3][0]} spDefence={i[3][1]} spAttack={i[3][2]} defense={i[3][3]} attack={i[3][4]} hp={i[3][5]} type1={i[2][0]} type2={i[2][1]} height={i[4]} weight={i[5]} />
            );
        });
    };

    return(
        <div>
            <NoResults> {showEmptyMessage && (<h1> You do not have pokemons added to your list </h1>)} </NoResults>
            <CardWrap> {favPokemons} </CardWrap>
            <NoResults> {!showEmptyMessage && myFavourite.length <= 0 && (
                <div>
                    <h1>You have removed all of your favourites </h1>
                    <Link to="/"> <Button text="Add More"/> </Link>
                    <img src={cyndaquil} alt="Add More" />
                </div>
            )} </NoResults>
        </div>
    )
};

export default Profile;