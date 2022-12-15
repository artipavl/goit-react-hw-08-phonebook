import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations/addContact';

export function Phonebook() {
  const contacts = useSelector(state => state.contacts.value);
  const dispatch = useDispatch();

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

  const submitForm = async e => {
    e.preventDefault();
    const submitButton = e.currentTarget.elements.submitButton;
    submitButton.disabled = true;
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        alert(`${name} is already in contacts.`);
        submitButton.disabled = false;
        return;
      }
    }
    try {
      await dispatch(addContact({ name, number }));
      submitButton.disabled = false;
    } catch (error) {
      console.log(error);
      submitButton.disabled = false;
    }

    setName('');
    setNumber('');
  };

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

  return (
    <form onSubmit={submitForm}>
      <Flex
        minWidth="max-content"
        alignItems="center"
        justifyContent="center"
        gap={6}
        flexDirection="column"
      >
        <FormControl w="inherit">
          <FormLabel>Name</FormLabel>
          <Input
            w={[null, 200, 300, 400]}
            value={name}
            onChange={changeForm}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormControl>
        <FormControl w="inherit">
          <FormLabel>Number</FormLabel>
          <Input
            w={[null, 200, 300, 400]}
            value={number}
            onChange={changeForm}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormControl>
        <Button type="submit" name="submitButton">
          add contacts
        </Button>
      </Flex>
    </form>
  );
}
