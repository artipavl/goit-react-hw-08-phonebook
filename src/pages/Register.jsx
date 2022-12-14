import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Section } from 'components/Section/Section';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSignup } from 'redux/auth/operations/authSignup';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = async e => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    const submitButton = e.currentTarget.elements.submitButton;
    submitButton.disabled = true;

      try {
      await dispatch(authSignup({ name, email, password }));
      submitButton.disabled = false;
    } catch (error) {
      console.log(error);
      submitButton.disabled = false;
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Section title="Register">
      <form onSubmit={e => submitForm(e)}>
        <Flex
          minWidth="max-content"
          alignItems="center"
          justifyContent="center"
          gap={2}
          flexDirection="column"
        >
          <FormControl w="inherit">
            <FormLabel>Name</FormLabel>
            <Input
              w={[null, 200, 300, 400]}
              placeholder="name"
              type="text"
              name="name"
              id=""
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
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
            Register
          </Button>
        </Flex>
      </form>
    </Section>
  );
};
