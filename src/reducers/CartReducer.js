const CartReducer = (state, action) => {
    if(action.type==='ADD_TO_CART'){
        const {id, color, amount, product} = action.payload;
        console.log("🚀 ~ file: CartReducer.js:5 ~ reducer ~ product:", product)
    }
    return state;
}

export default CartReducer;