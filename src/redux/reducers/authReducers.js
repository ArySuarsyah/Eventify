const {createSlice} = require('@reduxjs/toolkit');
import {asyncLogin, asyncRegister} from '../actions/auth';

const initialState = {
  token: '',
  errorMessage: '',
  pin: '',
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: () => {
      return initialState;
    },
    deleteMessage: state => {
      state.errorMessage = '';
    },
    sendPin: (state, action) => {
      state.pin = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncLogin.pending, (state, action) => {
      console.log(action.payload);
      state.errorMessage = action.payload;
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      console.log(action.payload);

      state.errorMessage = action.payload;
    });
    builder.addCase(asyncRegister.pending, (state, action) => {
      state.errorMessage = action.payload;
    });
    builder.addCase(asyncRegister.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(asyncRegister.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
  },
});

export const {login, logout, deleteMessage, sendPin} = auth.actions;
export default auth.reducer;
