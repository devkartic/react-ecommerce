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
        case "UPDATE_FILTER_VALUE":
            const {name, value} = {...action.payload}
            return {...state,
                filters: {...state.filters, 
                    [name]: value
                },
            }
        case "FILTER_PRODUCTS":
            const {all_products} = state;
            let temp_filter_products = [...all_products]
            const {text, category, company, color} = state.filters;

            if(text){
                temp_filter_products = temp_filter_products.filter((currentElement)=>{
                    return currentElement.name.toLowerCase().includes(text);
                });
            }

            if(category.toLowerCase()!=="all"){
                temp_filter_products = temp_filter_products.filter((currentElement)=>{
                    return currentElement.category.toLowerCase() === category.toLowerCase();
                });
            }

            if(company.toLowerCase()!=="all"){
                temp_filter_products = temp_filter_products.filter((currentElement)=>{
                    return currentElement.company.toLowerCase() === company.toLowerCase();
                });
            }

            if(color.toLowerCase()!=='all'){
                temp_filter_products = temp_filter_products.filter((currentElement)=>{
                    return currentElement.colors.includes(color);
                });
            }

            return {...state,
                filter_products: temp_filter_products
            }
        default:
            return state;
    }
}

export default FilterReducer;