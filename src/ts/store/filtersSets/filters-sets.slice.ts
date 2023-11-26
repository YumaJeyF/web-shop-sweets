import { createSlice } from "@reduxjs/toolkit";
import { IOptionSets } from "../../types";

const initialState: IOptionSets = {
    nameFilter: '',
    page: 1
}

export const filtersSets = createSlice({
    name: 'filters-sets',
    initialState,
    reducers: {
        setPageSets(state, action) {
            state.page = action.payload;
        },
        setNameFilterSets(state, action) {
            state.nameFilter = action.payload;
        },
        setFiltersAndPageSets(state, action) {
            state.nameFilter = action.payload.filter;
            state.page = action.payload.page;
        }
    }
})

export const { actions, reducer } = filtersSets;