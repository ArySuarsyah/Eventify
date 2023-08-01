const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  deviceToken: null,
};

const deviceToken = createSlice({
  name: 'deviceToken',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.deviceToken = action.payload;
    },
  },
});

export const {setToken} = deviceToken.actions;
export default deviceToken.reducer;
