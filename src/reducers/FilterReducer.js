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
            const {filter_products, sorting_value} = state;
            let temp_sort_products = [...filter_products];

            const sorting_products = (a, b) => {
                if(sorting_value==='lowest'){
                    return a.price - b.price;
                }

                if(sorting_value==='highest'){
                    return b.price - a.price;
                }

                if(sorting_value==='a-z'){
                    return a.name.localeCompare(b.name);
                }

                if(sorting_value==='z-a'){
                    return b.name.localeCompare(a.name);
                }
            }

            new_sort_products = temp_sort_products.sort(sorting_products);

            return {...state,
                filter_products: new_sort_products
            }
        default:
            return state;
    }
}

export default FilterReducer;