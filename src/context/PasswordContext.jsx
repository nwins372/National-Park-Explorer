import { createContext, useState, useContext } from 'react';

const PassportContext = createContext();

export function PassportProvider({children}) {
    const [visitedParks, setVisitedParks] = useState([]);
    
    const stampPark = (park) => {
        if (!visitedParks.some(p => p.id === park.id)) {
            setVisitedParks([...visitedParks, park]);
        }
    };

    const removePark = (parkId) => {
        setVisitedParks(visitedParks.filter(p => p.id !== parkId));
    };

    const value = { visitedParks, stampPark, removePark };
    return ( 
        <PassportContext.Provider value={value}>
        {children}
        </PassportContext.Provider>
    );
}

export function usePassport() {
    return useContext(PassportContext);
}