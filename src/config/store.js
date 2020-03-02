import React, { useState } from 'react';

export const ListContext = React.createContext([]);

const Store = ({children}) => {
    let [myFavourite, setMyFacourite] = useState([]);
    return (
    <ListContext.Provider value={[myFavourite, setMyFacourite]}>
        {children}
    </ListContext.Provider>
    );
}

export default Store;