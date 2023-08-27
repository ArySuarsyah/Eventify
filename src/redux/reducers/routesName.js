import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  route: '',
};

const route = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    getRoutes: (state, action) => {
      state.route = action.payload;
    },
  },
});

export const {getRoutes} = route.actions;
export default route.reducer;
