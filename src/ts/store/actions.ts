import { actions as actionsFilter } from "./filters-news/filters-news.slice";
import { actions as actionsFilterSets } from "./filtersSets/filters-sets.slice";
import { actions as actionsCart } from "./cart/cart.slice";
import { actions as actionsMacaroni } from "./macaroni-catalog/macaroniCatalog.slice";
import { actions as actionsTubes } from "./tubes-catalog/tubesCatalog";
import { actions as actionsEclairs } from "./eclairs-catalog/eclairsCatalog";
import { actions as actionsProfiteroles } from "./profiteroles-catalog/profiterolesCatalog";
import { actions as actionsUser } from "./user/user.slice";
import { actions as actionsAssemblleSets } from "./assemble-sets/assembleSets.slice";

export const allActions = {
    ...actionsFilter,
    ...actionsFilterSets,
    ...actionsCart,
    ...actionsMacaroni,
    ...actionsTubes,
    ...actionsEclairs,
    ...actionsProfiteroles,
    ...actionsUser,
    ...actionsAssemblleSets
}