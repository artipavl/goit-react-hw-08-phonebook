import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteContacts } from 'API/API';


export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await deleteContacts(id);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
