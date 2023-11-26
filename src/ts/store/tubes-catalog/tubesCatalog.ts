import { createSlice } from "@reduxjs/toolkit";
import { IOptionSets } from "../../types";

const initialState: IOptionSets = {
    page: 1,
    nameFilter: 'Все'
}

const tubesCatalog = createSlice({
    name: 'tubes-catalog',
    initialState,
    reducers: {
        setPageTubes(state, action) {
            state.page = action.payload;
        },
        setFilterTubes(state, action) {
            state.nameFilter = action.payload;
        },
        setFilterAndPageTubes(state, action) {
            state.nameFilter = action.payload.filter;
            state.page = action.payload.page;
        }
    }
})

export const { actions, reducer } = tubesCatalog;