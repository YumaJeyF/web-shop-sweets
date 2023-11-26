import { combineReducers } from "@reduxjs/toolkit"
import { reducer as filterReducer } from "./filters-news/filters-news.slice"
import { reducer as filterSetsReducer } from "./filtersSets/filters-sets.slice";
import { reducer as cartReducer } from "./cart/cart.slice";
import { reducer as macaroniReducer } from "./macaroni-catalog/macaroniCatalog.slice";
import { reducer as tubesReducer } from "./tubes-catalog/tubesCatalog";
import { reducer as eclairsReducer } from "./eclairs-catalog/eclairsCatalog";
import { reducer as profiterolesReducer } from "./profiteroles-catalog/profiterolesCatalog";
import { reducer as userReducer } from "./user/user.slice";
import { reducer as assembleSetsReducer } from "./assemble-sets/assembleSets.slice";

export const reducers = combineReducers({
    filter: filterReducer,
    filterSets: filterSetsReducer,
    cart: cartReducer,
    macaroni: macaroniReducer,
    tubes: tubesReducer,
    eclairs: eclairsReducer,
    profiteroles: profiterolesReducer,
    user: userReducer,
    assembleSets: assembleSetsReducer
});