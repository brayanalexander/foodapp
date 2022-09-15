import { GET_ALL_RECIPES, GET_DIETS, LOADER, FILTER_DIET, FILTER_ORDER, FILTER_DBAPI, GET_SERACH, GET_RECIPE, CREATE_RECIPE, DELETE_RECIPE,CREATE_FALSE } from "../actions";

const initiState = {
    recipes: [],
    allRecipes: [],
    recipe: {},
    diets: [],
    loader: false,
    create: false,
    delete: {}
}

const rootReducer = (state = initiState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_SERACH:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
                create: action.payload
            }
            case CREATE_FALSE:
                return{
                    ...state,
                    create:action.payload
                }
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(el => el.id !== action.id),
                allRecipes: state.allRecipes.filter(el => el.id !== action.id),
                delete: action.payload
            }
        case LOADER:
            return {
                ...state,
                loader: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_DIET:
            let result;
            if (action.payload === "All") {
                result = state.allRecipes
            } else {
                result = state.allRecipes.filter(el => el.diets.includes(action.payload))
            }
            return {
                ...state,
                recipes: result
            }
        case FILTER_ORDER:

            let orderRecipes = action.payload === "ID" ? state.recipes.sort(function (a, b) {
                return a.id - b.id
            }) :
                action.payload === "Asc" ? state.recipes.sort(function (a, b) {
                    if (a.title.toUpperCase() > b.title.toUpperCase()) {
                        return 1;
                    }
                    if (a.title.toUpperCase() < b.title.toUpperCase()) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                }) :
                    action.payload === "Desc" ? state.recipes.sort(function (a, b) {
                        if (a.title.toUpperCase() > b.title.toUpperCase()) {
                            return -1;
                        }
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {
                            return 1;
                        }
                        // a must be equal to b
                        return 0;
                    }) :
                        action.payload === "maxHealthScore" ? state.recipes.sort(function (a, b) {

                            return b.healthScore - a.healthScore
                        }) :
                            state.recipes.sort(function (a, b) {
                                return a.healthScore - b.healthScore
                            });

            return {
                ...state,
                recipes: orderRecipes
            }
        case FILTER_DBAPI:
            let res = action.payload === "Mibd" ? state.allRecipes.filter(el => el.fromDB)
                : state.allRecipes.filter(el => !el.fromDB)

            return {
                ...state,
                recipes: action.payload === "All" ? state.allRecipes : res
            }
        default:
            return state
    }
}

export default rootReducer;