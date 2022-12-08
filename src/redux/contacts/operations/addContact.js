import { createAsyncThunk } from '@reduxjs/toolkit';
import { postContacts } from 'API/API';


export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (article, thunkAPI) => {
    try {
      const response = await postContacts(article);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
