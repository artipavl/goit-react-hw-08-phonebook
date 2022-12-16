import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, Form, Formik} from 'formik';
import * as yup from 'yup';

import { addContact } from 'redux/contacts/operations/addContact';

let schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
      'Name is not valid'
    )
    .required(),
  number: yup.string().required(),
});


export const Phonebook = () => {
  const contacts = useSelector(state => state.contacts.value);
  const dispatch = useDispatch();
  const toast = useToast();

    const [name, setName] = useState(() =>
      JSON.parse(window.localStorage.getItem('name'))
        ? JSON.parse(window.localStorage.getItem('name'))
        : ''
    );
    const [number, setNumber] = useState(() =>
      JSON.parse(window.localStorage.getItem('number'))
        ? JSON.parse(window.localStorage.getItem('number'))
        : ''
    );

    useEffect(() => {
      window.localStorage.setItem('name', JSON.stringify(name));
    }, [name]);

    useEffect(() => {
      window.localStorage.setItem('number', JSON.stringify(number));
    }, [number]);

  const changeForm = e => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const onSubmit = async (values, actions) => {
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === values.name.toLowerCase()) {
        toast({
          title: 'Error',
          description: `${values.name} is already in contacts.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        actions.setSubmitting(false);
        return;
      }
    }
    try {
      await dispatch(addContact(values));
      setName('');
      setNumber('');
      actions.resetForm();
    } catch (error) {
      actions.setSubmitting(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={{name,number}}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {props => (
          <Form onChange={changeForm}>
            <Flex
              minWidth="max-content"
              alignItems="center"
              justifyContent="center"
              gap={6}
              flexDirection="column"
            >
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    w="inherit"
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input
                      w={[null, 200, 300, 400]}
                      placeholder="name"
                      // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                      type={'text'}
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="number">
                {({ field, form }) => (
                  <FormControl
                    w="inherit"
                    isInvalid={form.errors.number && form.touched.number}
                  >
                    <FormLabel>Number</FormLabel>
                    <Input
                      w={[null, 200, 300, 400]}
                      placeholder="number"
                      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                      type={'text'}
                      // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.number}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button type="submit" isLoading={props.isSubmitting}>
                add contacts
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};