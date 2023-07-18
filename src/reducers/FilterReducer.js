const FilterReducer = (state, action) => {
    switch (action.type){
        case "LOAD_FILTER_PRODUCTS":
            return {...state, 
                filter_products: [...action.payload],
                all_products: [...action.payload]
            }
        case "SET_GRID_VIEW":
            return {...state, 
                grid_view: true
            }
        case "SET_LIST_VIEW":
            return {...state, 
                grid_view: false
            }
        case "SET_SORTING_VALUE":
            return {...state,
                sorting_value: action.payload
            }
        case "SORTING_PRODUCTS":
            let new_sort_products;
            let temp_sort_products = [...action.payload];

            if(state.sorting_value==='lowest'){
                const sorting_products = (a, b) => {
                    return a.price - b.price;
                }
                new_sort_products = temp_sort_products.sort(sorting_products);
            }

            if(state.sorting_value==='highest'){
                const sorting_products = (a, b) => {
                    return b.price - a.price;
                }
                new_sort_products = temp_sort_products.sort(sorting_products);
            }

            if(state.sorting_value==='a-z'){
                new_sort_products = temp_sort_products.sort((a, b)=>{
                    return a.name.localeCompare(b.name);
                });
            }

            if(state.sorting_value==='z-a'){
                new_sort_products = temp_sort_products.sort((a, b)=>{
                    return b.name.localeCompare(a.name);
                });
            }

            return {...state,
                filter_products: new_sort_products
            }
        default:
            return state;
    }
}

export default FilterReducer;