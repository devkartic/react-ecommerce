import axios from 'axios';
import {createContext, useContext, useEffect, useReducer} from "react";
import reducer from '../reducers/ProductReducer';

const AppContext = createContext(null);

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
}

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const getProducts = async (url) => {
        dispatch({type: 'SET_LOADING'});
        try {
            const response = await axios.get(url);
            const products = await response.data;
            dispatch({type: 'API_PRODUCTS', payload: products});
        } catch (error) {
          dispatch({type: 'API_ERROR'});
        }
    };

    // For single product
    const getSingleProduct = async (url) => {
        dispatch({type: 'SET_SINGLE_LOADING'});
        try {
            const response = await axios.get(url);
            const singleProduct = await response.data;
            dispatch({type: 'API_SINGLE_PRODUCT', payload: singleProduct});
        } catch (error) {
          dispatch({type: 'API_ERROR'});
        }
    };

    useEffect(() => {
        getProducts(API);
    }, []);

    return <AppContext.Provider value={{...state, getSingleProduct}}>{children}</AppContext.Provider>
}

// Custom Hook
const useProductContext = () => {
    return useContext(AppContext);
}

export {AppProvider, useProductContext};