import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helper/http';

export const asyncLogin = createAsyncThunk(
  'asyncLogin',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      form.append('email', payload.email);
      form.append('password', payload.password);
      form.append('confirmPassword', payload.confirmPassword);

      const {data} = await http().post('/auth/login', form.toString());
      return data.results.token;
    } catch (error) {
      const message = error?.response?.message;
      if (message) {
        rejectWithValue(message);
      } else {
        rejectWithValue(error.message);
      }
    }
  },
);

export const asyncRegister = createAsyncThunk(
  'asyncRegister',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      form.append('fullName', payload.fullName);
      form.append('email', payload.email);
      form.append('password', payload.password);
      form.append('confirmPassword', payload.confirmPassword);

      const {data} = await http().post('/auth/register', form.toString());
      return data.results.token;
    } catch (error) {
      const message = error?.response?.message;
      if (message) {
        rejectWithValue(message);
      } else {
        rejectWithValue(error.message);
      }
    }
  },
);
