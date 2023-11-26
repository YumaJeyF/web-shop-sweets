import { createSlice } from "@reduxjs/toolkit";
import { IOptionSets } from "../../types";

const initialState: IOptionSets = {
    page: 1,
    nameFilter: 'Все'
}

const eclairsCatalog = createSlice({
    name: 'eclairs-catalog',
    initialState,
    reducers: {
        setPageEclairs(state, action) {
            state.page = action.payload;
        },
        setFilterEclairs(state, action) {
            state.nameFilter = action.payload;
        },
        setFilterAndPageEclairs(state, action) {
            state.nameFilter = action.payload.filter;
            state.page = action.payload.page;
        }
    }
})

export const { actions, reducer } = eclairsCatalog;