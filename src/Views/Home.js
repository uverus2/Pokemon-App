import React, {useEffect, useState} from 'react';
import styled from "styled-components";

// Components
import Card from "../Components/Card";
import Button from "../Components/Buttons";


const axios = require('axios');

const SearchWrap = styled.div`
    padding:20px 15px;
    display:grid;
    grid-template-columns: minmax(280px, 1fr);
    grid-template-rows: 50px 50px 1fr;
    grid-row-gap:10px;
    border-bottom: 10px solid ${({ theme }) => theme.colors.thirdNavy};
    justify-items:center;
    box-sizing:border-box;

    button, div{
        max-width:400px;
    }

    div{
        margin-top: 20px;
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
        max-width:400px;
    }
    
`;

 function Home(props) {
     // Refs
     let searchValue = React.createRef();
    //Limit the search
    let [limit, setLimit] = useState(20);
    //Store pokemons
     let [pokemon, setPokemonData] = useState([]);
     let [searchResult, setSearchResult] = useState([]);

     //Let new limit based on action
     const changeLimit = () => {
        setLimit(limit = limit + 20);
     };

     // Search for pokemon
     const searchHandler = async e => {
        const searchTerm = searchValue.current.value.toLowerCase();
        const grabData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        const singlePokemonData = [ grabData.data.species.name, grabData.data.sprites.front_default, grabData.data.types.map(i => i.type.name), grabData.data.stats.map(i => [i.stat.name + ": ", i.base_stat,])];
        setSearchResult(singlePokemonData);
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
                        const pokemonData = [ res.data.species.name, res.data.sprites.front_default, res.data.types.map(i => i.type.name), res.data.stats.map(i => [i.stat.name + ": ", i.base_stat,])];
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
                <Card key={i[0]} name={i[0]} image={i[1]} speed={i[3][0]} spDefence={i[3][1]} spAttack={i[3][2]} defense={i[3][3]} attack={i[3][4]} hp={i[3][5]} type1={i[2][0]} type2={i[2][1]} />
            );
        });
    };
    
    return (
        <React.Fragment>
            <SearchWrap>
                    <SearchInput type="text" ref={searchValue}/>
                    <Button text="Search Pokemon" onClick={searchHandler}/>
                {searchResult.length > 0 ? (
                    <Card key={searchResult[0]} name={searchResult[0]} image={searchResult[1]} speed={searchResult[3][0]} spDefence={searchResult[3][1]} spAttack={searchResult[3][2]} defense={searchResult[3][3]} attack={searchResult[3][4]} hp={searchResult[3][5]} type1={searchResult[2][0]} type2={searchResult[2][1]} />
                ) : ""}
            </SearchWrap>
        <CardWrap>
            {pokemon.length > 0 ? (
                pokemons
                
            ) : ""}
            
        </CardWrap>
        <LoadButtonWrap>
            <Button text="Load More" onClick={changeLimit}/>
        </LoadButtonWrap>
        </React.Fragment>
    )
}

export default Home

