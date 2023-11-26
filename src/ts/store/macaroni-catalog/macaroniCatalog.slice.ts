import { createSlice } from "@reduxjs/toolkit";
import { IOptionSets } from "../../types";

const initialState: IOptionSets = {
    page: 1,
    nameFilter: 'Все'
}

const macaroniCatalog = createSlice({
    name: 'macaroni',
    initialState,
    reducers: {
        setPageMacaroni(state, action) {
            state.page = action.payload;
        },
        setFilterMacaroni(state, action) {
            state.nameFilter = action.payload;
        },
        setPageAndFilterMacaroni(state, action) {
            state.nameFilter = action.payload.filter;
            state.page = action.payload.page;
        }
    }
})

export const { actions, reducer } = macaroniCatalog;