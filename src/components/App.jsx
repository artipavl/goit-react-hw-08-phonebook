import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authCurrent } from '../redux/auth/operations/authCurrent';
import { useToast } from '@chakra-ui/react';

import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { setAuthHeader } from 'API/API';

import Layout from 'components/Layout';
const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Contacts = lazy(() => import('pages/Contacts'));

export function App() {
  const [current, setCurrent] = useState(false);
  const error = useSelector(state => state.auth.error);
  const token = useSelector(state => state.auth.token);
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (!current && token) {
      setAuthHeader(token);
      dispatch(authCurrent());
      setCurrent(true);
    }
  }, [dispatch, current, token]);

  useEffect(() => {
    error &&
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
  }, [error, toast]);

  return (
    <>
      {!isRefreshing && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<Register />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts" component={<Login />} />
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
}
