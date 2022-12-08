import { useEffect, useState } from 'react';
import css from 'components/Phonebook/Phonebook.module.css';
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
    <form onSubmit={submitForm} className={css.phonebookForm}>
      <label>
        <span className={css.phonebookLableTitle}>Name</span>
        <input
          value={name}
          onChange={changeForm}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        <span className={css.phonebookLableTitle}>Number</span>
        <input
          value={number}
          onChange={changeForm}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" name="submitButton" className={css.phonebookButton}>
        add contacts
      </button>
    </form>
  );
}
