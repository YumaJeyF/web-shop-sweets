import { createSlice } from "@reduxjs/toolkit";
import { ISaveParams } from "../../types";

const initialState: ISaveParams = {
    nameFilter: '',
    page: 1
}

export const filtersNews = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setNameFilters(state, action) {
            state.nameFilter = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setFilters(state, action) {
            state.nameFilter = action.payload.filter;
            state.page = action.payload.page;
        }
    }
})

export const { actions, reducer} = filtersNews;