import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourite_loading : false,
  favourite_data : [],
  favourite_error: null
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    fetchListSuccess(state, action) {
        state.favourite_data = action.payload;
        state.favourite_error = null;
    },
    addToFavouriteSuccess (state, action){
        state.favourite_data.push(action.payload);
    },
    addToFavouriteFailure(state, action){
        state.favourite_error = action.payload;
    },
    fetchListFailure(state, action) {
        state.favourite_loading = true;
        state.favourite_data = [];
        state.favourite_error = action.payload;
    }
  }
});

export const { fetchListFailure, fetchListSuccess, addToFavouriteSuccess, addToFavouriteFailure } = favouriteSlice.actions;
export default favouriteSlice.reducer;
