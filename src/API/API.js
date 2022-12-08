import axios from 'axios';

axios.defaults.baseURL = 'https://6390e6c10bf398c73a963e5b.mockapi.io/api/v1';

export const getContacts = async () => {
  const response = await axios.get('/contacts');
  return response;
};

export const deleteContacts = async id => {
  const response = await axios.delete(`/contacts/${id}`);
  return response;
};

export const postContacts = async article => {
  const response = await axios.post('/contacts', article);
  return response;
};