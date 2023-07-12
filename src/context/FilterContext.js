import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "./../reducers/FilterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
}

export const FilterContextProvider = ({children}) => {

    const { products } = useProductContext();
    // console.log("🚀 ~ file: FilterContext.js:15 ~ FilterContextProvider ~ products:", products);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products});
    }, [products]);

    return (
        <FilterContext.Provider value={{...state}}>
            {children}
        </FilterContext.Provider>
        );
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}