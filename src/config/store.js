import React, { useState, useEffect } from 'react';


export const ListContext = React.createContext([]);

const axios = require("axios");

const Store = ({children}) => {
    let [myFavourite, setMyFacourite] = useState([]);

    useEffect(() => {
        (async() => {
            if(localStorage.getItem('MyFarArray')){
                setMyFacourite([]);
                const storedFavPokemons = localStorage.getItem('MyFarArray');
                const uniqueFavArray = [...new Set(storedFavPokemons.split(","))];
                setMyFacourite(uniqueFavArray);
            }
        })();
    },[]);

    return (
    <ListContext.Provider value={[myFavourite, setMyFacourite]}>
        {children}
    </ListContext.Provider>
    );
}

export default Store;