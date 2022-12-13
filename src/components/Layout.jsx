import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { authLogout } from 'redux/auth/operations/authLogout';

export const Layout = () => {
  const email = useSelector(s => s.auth.user.email);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authLogout());
  };
  return (
    <>
      {!isLoggedIn && (
        <header>
          <nav>
            <NavLink to="/">Home</NavLink>
            <br />
            <NavLink to="/register">Register</NavLink>
            <br />
            <NavLink to="/login">Login</NavLink>
          </nav>
        </header>
      )}
      {isLoggedIn && (
        <header>
          <nav>
            <NavLink to="/">Home</NavLink>
            <br />
            <NavLink to="/contacts">Contacts</NavLink>
            <br />
          </nav>
          <div>
            <p>{email}</p>
            <button type="button" onClick={() => onLogout()}>
              Logout
            </button>
          </div>
        </header>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
