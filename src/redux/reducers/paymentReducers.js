const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  dataPayment: {},
  paymentMethod: '',
};

const payment = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.dataPayment = action.payload;
    },
    selectPayment: (state, action) => {
      console.log(action.payload);
      state.paymentMethod = action.payload;
    },
  },
});

export const {getData, selectPayment} = payment.actions;
export default payment.reducer;
