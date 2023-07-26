const CartReducer = (state, action) => {

    switch(action.type){
        case "ADD_TO_CART":
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

        case "REMOVE_FROM_CART":
            console.log(action.payload);
            const updateCart = state.cart.filter((currentElement)=>{
                return currentElement.id !== action.payload;
            })
            return { ...state,
                cart: updateCart
            }
            
        default:
            return state;
    }
}

export default CartReducer;