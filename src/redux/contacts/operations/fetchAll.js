import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts } from 'API/API';


export const fetchAll = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await getContacts();
    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});
