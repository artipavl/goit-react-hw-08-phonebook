import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const setAuthHeader = token => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  axios.defaults.headers.Authorization = '';
};

export const postSignup = async article => {
  const response = await axios.post('/users/signup', article);
  return response;
};

export const postLogin = async article => {
  const response = await axios.post('/users/login', article);
  return response;
};

export const postLogout = async () => {
  const response = await axios.post('/users/logout');
  return response;
};

export const getCurrent = async () => {
  const response = await axios.get('/users/current');
  return response;
};



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
