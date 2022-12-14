import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Section } from 'components/Section/Section';
// import { ErrorMessage, Field, Formik } from "formik";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authLogin } from 'redux/auth/operations/authLogin';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = async e => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const submitButton = e.currentTarget.elements.submitButton;
    submitButton.disabled = true;
    try {
      await dispatch(authLogin({ email, password }));
      submitButton.disabled = false;
    } catch (error) {
      console.log(error);
      submitButton.disabled = false;
    }

    setEmail('');
    setPassword('');
  };

  return (
    <Section title="Login" paddingTop={4}>
      <form onSubmit={e => submitForm(e)}>
        <Flex
          minWidth="max-content"
          alignItems="center"
          justifyContent="center"
          gap={2}
          flexDirection="column"
        >
          <FormControl w="inherit">
            <FormLabel>Email address</FormLabel>
            <Input
              w={[null, 200, 300, 400]}
              placeholder="email"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl w="inherit">
            <FormLabel>Password</FormLabel>
            <Input
              w={[null, 200, 300, 400]}
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" name="submitButton">
            Login
          </Button>
        </Flex>
      </form>
    </Section>
  );
};
