import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { useForm } from 'react-hook-form';

// Components
import Card from "../Components/Card";
import Button from "../Components/Buttons";

 

const axios = require('axios');

const SearchWrap = styled.div`
    padding:20px 15px;
    display:grid;
    grid-template-columns: minmax(280px, 1fr);
    grid-template-rows: 50px 50px 1fr;
    grid-row-gap:15px;
    border-bottom: 10px solid ${({ theme }) => theme.colors.thirdNavy};
    justify-items:center;
    box-sizing:border-box;

    button, div{
        max-width:400px;
    }

    button {
        max-width:300px;
    }
`;

const SearchInput = styled.input`
    width:100%;
    max-width:600px;
    height:35px;
    border-radius:25px;
    border: 3px solid ${({ theme }) => theme.colors.secondaryBlue};
    :focus {
        outline: none;
    };

    padding-left:10px;
    font-size:16px;
    font-weight:bold;
    color:${({ theme }) => theme.colors.secondaryBlue};

`;

const CardWrap = styled.div`
    display:grid;
    padding:20px 20px;
    justify-content:center;
    grid-template-columns: repeat( auto-fill, minmax(300px, 1fr));
    grid-gap:15px;
`;

const LoadButtonWrap = styled.div`
    padding:20px;
    display:flex;
    justify-content:center;

    button{
        max-width:700px;
    }
`;

 function Home(props) {
     // Refs
     const { register, handleSubmit, errors } = useForm();

    //Limit the search
    let [limit, setLimit] = useState(20);

    //Store pokemons
     let [pokemon, setPokemonData] = useState([]);
     let [searchResult, setSearchResult] = useState([]);
     let [errorMessage, setMessageValue] = useState(false);

     //Let new limit based on action
     const changeLimit = () => {
        setLimit(limit = limit + 20);
     };

     // Search for pokemon
     const onSubmit = async data => {
        try{
            const searchTerm = data.searchPokemon.toLowerCase();
            const grabData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            const singlePokemonData = [ grabData.data.species.name, grabData.data.sprites.front_default, grabData.data.types.map(i => i.type.name), grabData.data.stats.map(i => [i.stat.name + ": ", i.base_stat,]),grabData.data.height, grabData.data.weight];
            console.log(singlePokemonData);
            setSearchResult(singlePokemonData);
            setMessageValue(false);
        }catch(e) {
            console.log(e);
            setMessageValue(true);
        }
     };

    // Listen on change of limit
    useEffect(() => {
        (async () => {
            try {
                // Grab Pokemons
                const grabData = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);
                const searchResultsArray = grabData.data.results.map(i => i.url);

                // Store pokemons
                 let pokemonBrowse = await searchResultsArray.map(async i => {
                   return await axios.get(`${i}`).then(res => {
                        const pokemonData = [ res.data.species.name, res.data.sprites.front_default, res.data.types.map(i => i.type.name), res.data.stats.map(i => [i.stat.name + ": ", i.base_stat,]), res.data.height, res.data.weight];
                        return pokemonData;
                     });
                });

                const resolvedPokemonBrowse = await Promise.all(pokemonBrowse);

                // Store Pokemons
                setPokemonData(resolvedPokemonBrowse);
    
            }catch (e) {
                console.log(e);
            }
        })();
    }, [limit]);

    let pokemons;
    // If pokemon are present
    if(pokemon.length > 0) {
         pokemons = pokemon.map(i => {
           return (
                <Card key={i[0]} name={i[0]} image={i[1]} speed={i[3][0]} spDefence={i[3][1]} spAttack={i[3][2]} defense={i[3][3]} attack={i[3][4]} hp={i[3][5]} type1={i[2][0]} type2={i[2][1]} height={i[4]} weight={i[5]} />
            );
        });
    };
    
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}> 
            {errorMessage && (<h1>No Results Found</h1>)}
            {errors.searchPokemon && (<h1> {errors.searchPokemon.message}</h1>)}
            <SearchWrap>
                <SearchInput type="text" name="searchPokemon" ref={register({required: "Please Enter a Pokemon name"})}/>
                <Button text="Search Pokemon"/>
                {searchResult.length > 0 ? (<Card key={searchResult[0]} name={searchResult[0]} image={searchResult[1]} speed={searchResult[3][0]} spDefence={searchResult[3][1]} spAttack={searchResult[3][2]} defense={searchResult[3][3]} attack={searchResult[3][4]} hp={searchResult[3][5]} type1={searchResult[2][0]} type2={searchResult[2][1]} height={searchResult[4]} weight={searchResult[5]} />) : ""}
            </SearchWrap>
            </form>
            <CardWrap>
                {pokemon.length > 0 ? (pokemons) : ""}
            </CardWrap>
            <LoadButtonWrap>
                <Button text="Load More" onClick={changeLimit}/>
            </LoadButtonWrap>
        </React.Fragment>
    )
}

export default Home

