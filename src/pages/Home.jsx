import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Home = () => {
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
          <p>mango@mail.com</p>
          <button type='button'>Logout</button>
        </div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
