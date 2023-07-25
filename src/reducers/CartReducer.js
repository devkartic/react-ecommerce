const CartReducer = (state, action) => {
    if(action.type==='ADD_TO_CART'){
        const {id, color, amount, product} = action.payload;
        console.log("🚀 ~ file: CartReducer.js:5 ~ reducer ~ product:", product)

        const cartProduct = {
            id: id + color,
            name: product.name,
            color,
            amount,
            price: product.price,
            image: product.image[0].url,
            max: product.stock
        }

        return { ...state,
            cart: [...state.cart, cartProduct]
        }


    }

    return state;
}

export default CartReducer;