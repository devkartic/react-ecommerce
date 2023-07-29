const CartReducer = (state, action) => {

    switch(action.type){
        case "CART_TOTAL_ITEMS":
            const totalItems = state.cart.reduce((initialValue, currentElement)=>{
                return initialValue + currentElement.amount;
            }, 0)
            return {...state, totalItems}

        case "CART_TOTAL_PRICE":
            const totalPrice = state.cart.reduce((initialValue, currentElement) => {
                let {price, amount} = currentElement;
                return initialValue + amount * price;
            }, 0)
            return {...state, totalPrice}

        case "ADD_TO_CART":
            const {id, color, amount, product} = action.payload;
            // console.log("🚀 ~ file: CartReducer.js:5 ~ reducer ~ product:", product)

            // Check is exist product befor adding cart
            const productExistInCart = state.cart.find((currentElement)=> currentElement.id === id + color);

            if(productExistInCart){
                // Update quantity if same product exist
                const updatedCart = state.cart.map((currentElement)=>{
                    if(currentElement.id === id + color){
                        let newAmount = currentElement.amount + amount;
                        // Prevent quantity amount stock limit
                        if(newAmount > currentElement.max) newAmount = currentElement.max;
                        return {...currentElement, amount: newAmount};
                    } else{
                        return currentElement;
                    }
                });

                return { ...state,
                    cart: updatedCart
                }
            }else{
                // Adding new product in cart
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

        case "SET_INCREASE":
            const increasedCart = state.cart.map((currentElement) => {
                if(currentElement.id === action.payload){
                    let newAmount = currentElement.amount + 1;
                    if(newAmount > currentElement.max) newAmount = currentElement.max;
                    return {...currentElement, amount: newAmount}
                }

                return currentElement;
            });

            return {...state, cart: increasedCart};

        case "SET_DECREASE":
            const decreasedCart = state.cart.map((currentElement) => {
                if(currentElement.id === action.payload){
                    let newAmount = currentElement.amount - 1;
                    if(newAmount<1)  newAmount = 1;
                    return {...currentElement, amount: newAmount}
                }

                return currentElement;
            });

            return {...state, cart: decreasedCart};

        case "REMOVE_FROM_CART":
            const updateCart = state.cart.filter((currentElement)=>{
                return currentElement.id !== action.payload;
            })
            return { ...state,
                cart: updateCart
            }

        case "CLEAR_CART":
            return { ...state,
                cart: []
            }
            
        default:
            return state;
    }
}

export default CartReducer;