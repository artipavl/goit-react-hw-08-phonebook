import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { fetchAll } from 'redux/contacts/operations/fetchAll';
import { Route, Routes } from 'react-router-dom';
import { setAuthHeader } from 'API/API';
import { authCurrent } from '../redux/auth/operations/authCurrent';
import { Home } from 'pages/Home';
import { Contacts } from 'pages/Contacts';
import { Register } from 'pages/Register';
import { Login } from 'pages/Login';

export function App() {
  const [current, setCurrent] = useState(false);
  const error = useSelector(state => state.contacts.error);
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!current && token) {
      setAuthHeader(token);
      dispatch(authCurrent());
      setCurrent(true);
    }
  }, [dispatch, current, token]);

  useEffect(() => {
    error && alert(error.message);
  }, [error]);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
