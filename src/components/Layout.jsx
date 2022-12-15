import { IconButton, useColorMode, Box, Button, Text } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
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

  const opas = openNav ? 1 : 0;
  return (
    <>
      {!isLoggedIn && (
        <Box as="header" position="relative">
          <Section h={16}>
            <IconButton
              position="absolute"
              right={2}
              top={2}
              zIndex="99999"
              marginLeft="auto"
              display={['block', 'none']}
              onClick={() => setOpenNav(!openNav)}
              aria-label="Toggle"
              icon={
                openNav ? (
                  <CloseIcon boxSize={4} />
                ) : (
                  <HamburgerIcon boxSize={4} />
                )
              }
            />
            <Box
              position={['absolute', 'relative']}
              left="0"
              top="0"
              display="flex"
              gap={['16px', '0']}
              bg={[colorMode === 'light' ? 'white' : 'gray.800', 'inherit']}
              flexDirection={['column', 'unset']}
              justifyContent={['start', 'space-between']}
              py={2}
              paddingTop={['32px', '0px']}
              w="100%"
              m={0}
              zIndex="1"
              opacity={[opas, 1]}
              visibility={[openNav ? 'visible' : 'hidden', 'visible']}
              h={['100vh', 'inherit']}
            >
              <Box
                as="nav"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={['column', 'unset']}
                gap={4}
              >
                <Box>
                  <NavLink onClick={() => setOpenNav(!openNav)} to="/">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Home
                    </Text>
                  </NavLink>
                </Box>
                {/* <Box>
                <NavLink onClick={() => setOpenNav(!openNav)} to="/contacts">
                  <Text p={2} display="block" h="100%" textAlign="center">
                    Contacts
                  </Text>
                </NavLink>
              </Box> */}
                <Box>
                  <NavLink onClick={() => setOpenNav(!openNav)} to="/register">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Register
                    </Text>
                  </NavLink>
                </Box>
                <Box>
                  <NavLink onClick={() => setOpenNav(!openNav)} to="/login">
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
        <Box as="header" position="relative">
          <Section h={16}>
            <IconButton
              position="absolute"
              right={2}
              top={2}
              zIndex="99999"
              marginLeft="auto"
              display={['block', 'none']}
              onClick={() => setOpenNav(!openNav)}
              aria-label="Toggle"
              icon={
                openNav ? (
                  <CloseIcon boxSize={4} />
                ) : (
                  <HamburgerIcon boxSize={4} />
                )
              }
            />
            <Box
              position={['absolute', 'relative']}
              left="0"
              top="0"
              display="flex"
              gap={['16px', '0']}
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              flexDirection={['column', 'unset']}
              justifyContent={['start', 'space-between']}
              py={2}
              paddingTop={['32px', '0px']}
              w="100%"
              m={0}
              zIndex="1"
              opacity={[opas, 1]}
              visibility={[openNav ? 'visible' : 'hidden', 'visible']}
              h={['100vh', 'inherit']}
            >
              <Box
                as="nav"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={['column', 'unset']}
                gap={4}
              >
                <Box>
                  <NavLink onClick={() => setOpenNav(!openNav)} to="/">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Home
                    </Text>
                  </NavLink>
                </Box>
                <Box>
                  <NavLink onClick={() => setOpenNav(!openNav)} to="/contacts">
                    <Text p={2} display="block" h="100%" textAlign="center">
                      Contacts
                    </Text>
                  </NavLink>
                </Box>
                {/* <Box>
                <NavLink onClick={() => setOpenNav(!openNav)} to="/register">
                  <Text p={2} display="block" h="100%" textAlign="center">
                    Register
                  </Text>
                </NavLink>
              </Box>
              <Box>
                <NavLink onClick={() => setOpenNav(!openNav)} to="/login">
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
                flexDirection={['column', 'unset']}
                gap={4}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection={['column', 'unset']}
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
