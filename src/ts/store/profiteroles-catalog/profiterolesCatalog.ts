import { createSlice } from "@reduxjs/toolkit";
import { IOptionSets } from "../../types";

const initialState: IOptionSets = {
    page: 1,
    nameFilter: 'Все'
}

const profiterolesCatalog = createSlice({
    name: 'profiteroles-catalog',
    initialState,
    reducers: {
        setPageProfiteroles(state, action) {
            state.page = action.payload;
        },
        setFilterProfiteroles(state, action) {
            state.nameFilter = action.payload;
        },
        setFilterAndPageProfiteroles(state, action) {
            state.nameFilter = action.payload.filter;
            state.page = action.payload.page;
        }
    }
})

export const { actions, reducer } = profiterolesCatalog;