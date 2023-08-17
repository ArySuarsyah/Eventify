import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helper/http';

export const asyncLogin = createAsyncThunk(
  'asyncLogin',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams({
        email: payload.email,
        password: payload.password,
        confirmPassword: payload.confirmPassword,
      }).toString();

      const {data} = await http().post('/auth/login', form);

      return data.results.token;
    } catch (error) {
      const message = error?.response?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const asyncRegister = createAsyncThunk(
  'asyncRegister',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams({
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
        confirmPassword: payload.confirmPassword,
      }).toString();

      const {data} = await http().post('/auth/register', form);
      console.log(data);
      return data.results.token;
    } catch (error) {
      const message = error?.response?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
