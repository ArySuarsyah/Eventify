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
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error?.response?.data?.results[0]?.msg) {
        return rejectWithValue(error?.response?.data?.results[0]?.msg);
      }
      return rejectWithValue(error.message);
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
      return data.results.token;
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error?.response?.data?.results[0]?.msg) {
        return rejectWithValue(error?.response?.data?.results[0]?.msg);
      }
      return rejectWithValue(error.message);
    }
  },
);
