// import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations/addContact';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

// import { Section } from 'components/Section/Section';

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

// export default Login;

// export function Phonebook() {
//   const contacts = useSelector(state => state.contacts.value);
//   const dispatch = useDispatch();

  // const [name, setName] = useState(() =>
  //   JSON.parse(window.localStorage.getItem('name'))
  //     ? JSON.parse(window.localStorage.getItem('name'))
  //     : ''
  // );
  // const [number, setNumber] = useState(() =>
  //   JSON.parse(window.localStorage.getItem('number'))
  //     ? JSON.parse(window.localStorage.getItem('number'))
  //     : ''
  // );

  // useEffect(() => {
  //   window.localStorage.setItem('name', JSON.stringify(name));
  // }, [name]);

  // useEffect(() => {
  //   window.localStorage.setItem('number', JSON.stringify(number));
  // }, [number]);

//   const submitForm = async e => {
//     e.preventDefault();
//     const submitButton = e.currentTarget.elements.submitButton;
//     submitButton.disabled = true;
//     for (const contact of contacts) {
//       if (contact.name.toLowerCase() === name.toLowerCase()) {
//         alert(`${name} is already in contacts.`);
//         submitButton.disabled = false;
//         return;
//       }
//     }
//     try {
//       await dispatch(addContact({ name, number }));
//       submitButton.disabled = false;
//     } catch (error) {
//       console.log(error);
//       submitButton.disabled = false;
//     }

//     setName('');
//     setNumber('');
//   };

  // const changeForm = e => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   switch (name) {
  //     case 'name':
  //       setName(value);
  //       break;
  //     case 'number':
  //       setNumber(value);
  //       break;

  //     default:
  //       break;
  //   }
  // };

//   return (
//     <form onSubmit={submitForm}>
//       <Flex
//         minWidth="max-content"
//         alignItems="center"
//         justifyContent="center"
//         gap={6}
//         flexDirection="column"
//       >
//         <FormControl w="inherit">
//           <FormLabel>Name</FormLabel>
//           <Input
//             w={[null, 200, 300, 400]}
//             value={name}
//             onChange={changeForm}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </FormControl>
//         <FormControl w="inherit">
//           <FormLabel>Number</FormLabel>
//           <Input
//             w={[null, 200, 300, 400]}
//             value={number}
//             onChange={changeForm}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </FormControl>
//         <Button type="submit" name="submitButton">
//           add contacts
//         </Button>
//       </Flex>
//     </form>
//   );
// }
