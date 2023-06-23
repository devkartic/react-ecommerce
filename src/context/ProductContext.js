import { createContext, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
    return <AppContext.Provider value="Test Context">{children}</AppContext.Provider>
}

// Custom Hook
const useProductContext = () => {
    return useContext(AppContext);
}

export {AppProvider, useProductContext};