import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "./../reducers/FilterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: 'lowest',
    filters: {
        text: "",
    }
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

    const setSorting = (e) => {
        dispatch({type: "SET_SORTING_VALUE", payload: e.target.value});
    }

    // To filter the products
    const updateFilterValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: 'UPDATE_FILTER_VALUE', payload: {name, value}}, [])
    }

    // To sorting the products
    useEffect(()=>{
        dispatch({type: "FILTER_PRODUCTS"});
        dispatch({type: "SORTING_PRODUCTS"});
    }, [state.sorting_value, state.filters])

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products});
    }, [products]);

    return (
        <FilterContext.Provider value={{...state, setGridView, setListView, setSorting, updateFilterValue}}>
            {children}
        </FilterContext.Provider>
        );
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}