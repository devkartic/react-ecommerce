import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "./../reducers/FilterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
}

export const FilterContextProvider = ({children}) => {

    const { products } = useProductContext();
    // console.log("🚀 ~ file: FilterContext.js:16 ~ FilterContextProvider ~ products:", products) // Cntrl + Alt + l
    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView = () => {
        dispatch({type: "SET_GRID_VIEW"});
    }

    const setListView = () => {
        dispatch({type: "SET_LIST_VIEW"});
    }

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products});
    }, [products]);

    return (
        <FilterContext.Provider value={{...state, setGridView, setListView}}>
            {children}
        </FilterContext.Provider>
        );
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}