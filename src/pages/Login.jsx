import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { authLogin } from 'redux/auth/operations/authLogin';

import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Section } from 'components/Section/Section';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const initialValues = {
  email: '',
  password: '',
};

export const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    try {
      await dispatch(authLogin(values));
    } catch (error) {
      actions.setSubmitting(false);
    }
    actions.resetForm();
  };
  return (
    <Section title="Login">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {props => (
          <Form>
            <Flex
              minWidth="max-content"
              alignItems="center"
              justifyContent="center"
              gap={6}
              flexDirection="column"
            >
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    w="inherit"
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email address</FormLabel>
                    <Input
                      w={[null, 200, 300, 400]}
                      placeholder="email"
                      type={'email'}
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    w="inherit"
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input
                      w={[null, 200, 300, 400]}
                      placeholder="password"
                      type={'password'}
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                isLoading={props.isSubmitting}
              >
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Section>
  );
};

export default Login;
