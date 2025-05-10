import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { API_URL } from '../../api';
import type { AuthResponse } from '../../models/authResponse';

interface Credentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'user/login',
  async (data: Credentials, thunkAPI) => {
    try {
      const res = await AuthService.login(data.email, data.password);
      console.log(res);
      const { accessToken, user } = res.data;

      localStorage.setItem('token', accessToken);
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const registration = createAsyncThunk(
  'user/registration',
  async (data: Credentials, thunkAPI) => {
    try {
      const res = await AuthService.registration(data.email, data.password);
      console.log(res);
      const { accessToken, user } = res.data;

      localStorage.setItem('token', accessToken);
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout();
    localStorage.removeItem('token');
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message);
  }
});

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      const { accessToken, user } = response.data;

      localStorage.setItem('token', accessToken);
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);
