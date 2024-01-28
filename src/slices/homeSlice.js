import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imgUrls: {},
    genres: {}
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getApiConfiguration: (state, action) => {
            state.imgUrls = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        }
    }
})

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;