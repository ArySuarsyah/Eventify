const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  data: {},
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {getUserData} = user.actions;
export default user.reducer;
