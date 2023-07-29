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
    totalPrice: 0,
    totalShipping: 50000
}

const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (id, color, amount, product) => {
        dispatch({type: 'ADD_TO_CART', payload: {id, color, amount, product}});
    }
    
    const setIncrease = (id) => {
        dispatch({type: 'SET_INCREASE', payload: id});
    };

    const setDecrease = (id) => {
        dispatch({type: 'SET_DECREASE', payload: id});
      };

    const removeItem = (id) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: id});
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR_CART'});
    }

    useEffect(()=>{
        dispatch({type: "CART_TOTAL_ITEMS"});
        dispatch({type: "CART_TOTAL_PRICE"});
        localStorage.setItem('thapaCart', JSON.stringify(state.cart));
    }, [state.cart]);

    return (<CartContext.Provider value={{...state, addToCart, removeItem, clearCart, setIncrease, setDecrease}}>
        {children}
        </CartContext.Provider>)
}


const useCartContext = () => {
    return useContext(CartContext);
}

export { CartContextProvider, useCartContext };