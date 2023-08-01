const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  data: {},
};

const event = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getId: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {getId} = event.actions;
export default event.reducer;
