import React, { useState } from 'react';
import styled from "styled-components";
import { useForm } from 'react-hook-form';

// Components
import Card from "../Components/Card";
import Button from "../Components/Buttons";
import SmallerCard from "../Components/SmallerCard";

const axios = require('axios');


// Styles

const CompareWrap = styled.div `
    border-bottom: 10px solid ${({ theme }) => theme.colors.thirdNavy};
    box-sizing:border-box;
`;

const CompareInput = styled.input `
    max-width:700px;
    height:35px;
    border-radius:25px;
    border: 3px solid ${({ theme }) => theme.colors.secondaryBlue};    
    padding-left:10px;
    font-size:16px;
    font-weight:bold;
    color:${({ theme }) => theme.colors.secondaryBlue};
    width:100%;
    :focus {
        outline: none;
    };

`;

const ButtonWrap = styled.div `
    display:flex;
    padding:30px;
    justify-items:center;
    button{
        max-width:400px;
        margin:20px auto;
    }
`;

const CompareInputsWrap = styled.div `
    display:grid;
    padding:0px 20px;
    grid-template-columns: 100%;
    grid-template-rows:35px 35px 35px;
    grid-row-gap:10px;
    justify-items:center;
    align-items:center;

    @media(min-width: 601px){
        grid-template-columns: auto 10% auto ;
        grid-template-rows:50px;
    }
    @media(min-width: 1550px){
        grid-template-columns: auto 2% auto;
    }
`;

const ErrorsWrap = styled.div `
    text-align:center;
    padding:20px 0px;
    font-weight:bold;
    font-size:25px;
    color:red;

    h2{
        padding:5px 0px;
    }
`;

const ResultsContainer = styled.div `
    padding:20px 20px;
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
    grid-gap:15px;
`;

const SuggestionWrap = styled.div `
    display:grid;
    padding:20px;
    grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
    grid-gap:15px;
    text-align:center;
    h1{
        font-size:25px;
        color:${({ theme }) => theme.colors.secondaryBlue};
        font-weight:bold;
        margin-bottom:10px;
    }
`;

const SmallCardWrap = styled.div `
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
    grid-gap:5px;

`;

// Component

function Compare() {

    const [pokemonOne, setPokemonOneData] = useState([]);
    const [pokemonTwo, setPokemonTwoData] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    const [pokemonValueOne, setPokemonValueOne] = useState([]);
    const [pokemonValueTwo, setPokemonValueTwo] = useState([]);

    const [pokemonOneValue, setPokemonOneValue] = useState("");
    const [pokemonTwoValue, setPokemonTwoValue] = useState("");


    const returnValue = (data) => {
        return [data.data.species.name, data.data.sprites.front_default, data.data.types.map(i => i.type.name), data.data.stats.map(i => [i.stat.name + ": ", i.base_stat, ]), data.data.height, data.data.weight]
    };

    // Hanldes click and assign value
    const assignValue = (e, value) => {
        if (value === 1) {
            setPokemonOneValue(e.target.innerText);
            setPokemonValueOne([])
        }
        if (value === 2) {
            setPokemonTwoValue(e.target.innerText);
            setPokemonValueTwo([])
        }
    };

    // Handle Value changes on Inputs
    const handleChange = e => {

        if (e.target.name === "pokemonOne") {
            setPokemonOneValue(e.target.value);
        }

        if (e.target.name === "pokemonTwo") {
            setPokemonTwoValue(e.target.value);
        }

    };

    const retriveResults = (pokemonValue, value) => {
        (async() => {
            const namesArray = [];
            const grabData = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=200`);
            grabData.data.results.map(i => {
                return namesArray.push(i.name);
            });
            const search = namesArray.filter(i => i.includes(value));
            pokemonValue([search]);
        })();
    }

    // Outputs a suggestion 
    const suggestionsHandlerOne = e => {

        const value = e.target.value;

        if (value === "" || value.length < 0) {
            setPokemonValueOne([]);
            setPokemonOneValue("");
        } else {
            retriveResults(setPokemonValueOne, value);
        }
    };


    const suggestionsHandlerTwo = e => {

        const value = e.target.value;

        if (value === "" || value.length < 0) {
            setPokemonValueTwo([]);
            setPokemonTwoValue("");
        } else {
            retriveResults(setPokemonValueTwo, value);
        }
    };




    // generating comparison
    const onSubmit = async data => {
        try {
            setPokemonOneData([]);
            setPokemonTwoData([]);
            const pokemonOneData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.pokemonOne.toLowerCase()}`);
            const pokemonTwoData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.pokemonTwo.toLowerCase()}`);
            const pokemonOne = returnValue(pokemonOneData);
            const pokemonTwo = returnValue(pokemonTwoData);

            setPokemonOneData(pokemonOne);
            setPokemonTwoData(pokemonTwo);

        } catch (e) {
            console.log(e)
        }
    };

    let values;
    let values2;

    // Assigns Unique values to array for search
    const assignToValues = (state, number, countValue, increment) => {
            return state.map(i => {
                    return i.map(pokemon => {
                            return ( < SmallerCard name = { pokemon }
                                onClick = {
                                    (e) => assignValue(e, number) }
                                key = { countValue += increment }
                                />)
                            });
                    });
            }
            if (pokemonValueOne.length > 0) {
                let count = 0;
                values = assignToValues(pokemonValueOne, 1, count, 1);
            }

            if (pokemonValueTwo.length > 0) {
                let count = 0;
                values2 = assignToValues(pokemonValueTwo, 2, count, 100);
            }

            return ( <
                    React.Fragment >
                    <
                    form autoComplete = "off"
                    onSubmit = { handleSubmit(onSubmit) } >
                    <
                    CompareWrap >
                    <
                    ErrorsWrap >
                    <
                    h2 > { errors.pokemonOne && errors.pokemonOne.message } < /h2> <
                    h2 > { errors.pokemonTwo && errors.pokemonTwo.message } < /h2> <
                    /ErrorsWrap> <
                    SuggestionWrap >
                    <
                    div >
                    <
                    h1 > Pokemon One Search < /h1> <
                    SmallCardWrap > { values } < /SmallCardWrap> <
                    /div> <
                    div >
                    <
                    h1 > Pokemon Two Search < /h1> <
                    SmallCardWrap > { values2 } < /SmallCardWrap> <
                    /div> <
                    /SuggestionWrap> <
                    CompareInputsWrap >
                    <
                    CompareInput type = "text"
                    value = { pokemonOneValue }
                    name = "pokemonOne"
                    onChange = { handleChange }
                    onKeyUp = { suggestionsHandlerOne }
                    ref = { register({ required: "Please Enter a Pokemon One value" }) }
                    /> <
                    h1 > VS < /h1> <
                    CompareInput type = "text"
                    value = { pokemonTwoValue }
                    onKeyUp = { suggestionsHandlerTwo }
                    onChange = { handleChange }
                    name = "pokemonTwo"
                    ref = { register({ required: "Please Enter a Pokemon Two value" }) }
                    /> <
                    /CompareInputsWrap> <
                    ButtonWrap >
                    <
                    Button text = "Compare Pokemon" / >
                    <
                    /ButtonWrap> <
                    /CompareWrap> <
                    /form> <
                    ResultsContainer > {
                        pokemonOne.length > 0 ? ( <
                            Card key = { pokemonOne[0] }
                            name = { pokemonOne[0] }
                            image = { pokemonOne[1] }
                            speed = { pokemonOne[3][0] }
                            spDefence = { pokemonOne[3][1] }
                            spAttack = { pokemonOne[3][2] }
                            defense = { pokemonOne[3][3] }
                            attack = { pokemonOne[3][4] }
                            hp = { pokemonOne[3][5] }
                            type1 = { pokemonOne[2][0] }
                            type2 = { pokemonOne[2][1] }
                            height = { pokemonOne[4] }
                            weight = { pokemonOne[5] }
                            />) : ""}

                            {
                                pokemonTwo.length > 0 ? ( <
                                    Card key = { pokemonTwo[0] }
                                    name = { pokemonTwo[0] }
                                    image = { pokemonTwo[1] }
                                    speed = { pokemonTwo[3][0] }
                                    spDefence = { pokemonTwo[3][1] }
                                    spAttack = { pokemonTwo[3][2] }
                                    defense = { pokemonTwo[3][3] }
                                    attack = { pokemonTwo[3][4] }
                                    hp = { pokemonTwo[3][5] }
                                    type1 = { pokemonTwo[2][0] }
                                    type2 = { pokemonTwo[2][1] }
                                    height = { pokemonTwo[4] }
                                    weight = { pokemonTwo[5] }
                                    />) : ""} <
                                    /ResultsContainer> <
                                    /React.Fragment>
                                )
                            }


                            export default Compare