import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./../reducers/CartReducer";

const CartContext = createContext();

const getCartDataFromLocalStorage = () => {
    let localCartData = localStorage.getItem('thapaCart');
    // console.log("🚀 ~ file: CartContext.js:8 ~ getCartDataFromLocalStorage ~ localCartData:", localCartData)
    if(localCartData.length === 0)  return [];
    return JSON.parse(localCartData);
}

const initialState = {
    // cart: [],
    cart: getCartDataFromLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
    totalShipping: 50000
}

const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (id, color, amount, product) => {
        dispatch({type: 'ADD_TO_CART', payload: {id, color, amount, product}});
    }

    const removeItem = (id) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: id});
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR_CART'});
    }

    useEffect(()=>{
        localStorage.setItem('thapaCart', JSON.stringify(state.cart));
    }, [state.cart]);

    return (<CartContext.Provider value={{...state, addToCart, removeItem, clearCart}}>
        {children}
        </CartContext.Provider>)
}


const useCartContext = () => {
    return useContext(CartContext);
}

export { CartContextProvider, useCartContext };