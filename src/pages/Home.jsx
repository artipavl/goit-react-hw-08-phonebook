import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { authLogout } from 'redux/auth/operations/authLogout';

export const Home = () => {
  const email = useSelector(s => s.auth.user.email);
    const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authLogout());
  }
  return (
    <>
      <header>
        <nav>
          <NavLink to="/contacts">contacts</NavLink>
          <br />
          <NavLink to="/register">register</NavLink>
          <br />
          <NavLink to="/login">login</NavLink>
        </nav>
        <div>
          <p>{email}</p>
          <button type="button" onClick={()=>onLogout()}>
            Logout
          </button>
        </div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
