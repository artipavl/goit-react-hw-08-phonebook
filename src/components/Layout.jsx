import {
  IconButton,
  useColorMode,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { authLogout } from 'redux/auth/operations/authLogout';
import { Section } from './Section/Section';

export const Layout = () => {
  const [openNav, setOpenNav] = useState(false);
  const email = useSelector(s => s.auth.user.email);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const { colorMode, toggleColorMode } = useColorMode();

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authLogout());
  };

  const opas = openNav ? 1 : 0
  return (
    <>
      {!isLoggedIn && (
        <Box as="header">
          <Section>
            <Box
              display="flex"
              justifyContent="space-between"
              py={2}
              w="100%"
              m={0}
            >
              <Box
                as="nav"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
              >
                <Box>
                  <NavLink to="/">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Home
                    </Text>
                  </NavLink>
                </Box>
                {/* <Box>
                <NavLink to="/contacts">
                  <Text p={2} display="block" h="100%" textAlign="center">
                    Contacts
                  </Text>
                </NavLink>
              </Box> */}
                <Box>
                  <NavLink to="/register">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Register
                    </Text>
                  </NavLink>
                </Box>
                <Box>
                  <NavLink to="/login">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Login
                    </Text>
                  </NavLink>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
              >
                {/* <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
              >
                <Text>{email}</Text>
                <Button type="button" onClick={() => onLogout()}>
                  Logout
                </Button>
              </Box> */}
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="Toggle Color Mode"
                  icon={
                    colorMode === 'light' ? (
                      <MoonIcon boxSize={4} />
                    ) : (
                      <SunIcon boxSize={4} />
                    )
                  }
                />
              </Box>
            </Box>
          </Section>
        </Box>
      )}
      {isLoggedIn && (
        <Box as="header">
          <Section>
            <Box
              display="flex"
              justifyContent="space-between"
              py={2}
              w="100%"
              m={0}
              opacity={[ opas ,1]}
              backgroundColor={openNav ? { md: 'red' } : { md: 'blue' }}
            >
              <Box
                as="nav"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
              >
                <Box>
                  <NavLink to="/">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Home
                    </Text>
                  </NavLink>
                </Box>
                <Box>
                  <NavLink to="/contacts">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Contacts
                    </Text>
                  </NavLink>
                </Box>
                {/* <Box>
                <NavLink to="/register">
                  <Text p={2} display="block" h="100%" textAlign="center">
                    Register
                  </Text>
                </NavLink>
              </Box>
              <Box>
                <NavLink to="/login">
                  <Text p={2} display="block" h="100%" textAlign="center">
                    Login
                  </Text>
                </NavLink>
              </Box> */}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={4}
                >
                  <Text>{email}</Text>
                  <Button type="button" onClick={() => onLogout()}>
                    Logout
                  </Button>
                </Box>
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="Toggle Color Mode"
                  icon={
                    colorMode === 'light' ? (
                      <MoonIcon boxSize={4} />
                    ) : (
                      <SunIcon boxSize={4} />
                    )
                  }
                />
              </Box>
            </Box>
          </Section>
        </Box>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
