import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    searchedText: '',
    dataSorted: false,
    minRange: 0,
    maxRange: 0,
    type: [],
    category: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        search: (state, action) => {
            state.searchedText = action.payload
        },
        sorted: (state, action) => {
            state.dataSorted = action.payload;
        },
        minValue: (state, action) => {
            state.minRange = action.payload
        },
        maxValue: (state, action) => {
            state.maxRange = action.payload
        },
        typedSelected: (state, action) => {
            if (!state.type.includes(action.payload)) {
                state.type.push(action.payload)
            }
        },
        typedRemoved: (state, action) => {
            const updateType = state.type.filter(t => t !== action.payload);
            state.type = updateType;
        },
        categorySelected: (state, action) => {
            if (!state.category.includes(action.payload)) {
                state.category.push(action.payload)
            }
        },
        categoryRemoved: (state, action) => {
            const updateCategory = state.category.filter(t => t !== action.payload);
            state.category = updateCategory;
        },
        clearFilters: (state) => {
            state.searchedText = ''
            state.dataSorted = false
            state.minRange = 0
            state.maxRange = 0
            state.type = []
            state.category = []
        }
    }
})

export const { updateId, search, sorted, minValue, maxValue, typedSelected, typedRemoved, categorySelected, categoryRemoved,clearFilters } = filterSlice.actions
export default filterSlice.reducer; 