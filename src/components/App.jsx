import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { fetchAll } from 'redux/contacts/operations/fetchAll';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Contacts } from 'pages/Contacts';
import { Register } from 'pages/Register';
import { Login } from 'pages/Login';

export function App() {
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    error && alert(error);
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
