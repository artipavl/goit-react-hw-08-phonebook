import { Section } from 'components/Section/Section';
import { Phonebook } from 'components/Phonebook/Phonebook';
import { ContactList } from 'components/Contacts/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAll } from 'redux/contacts/operations/fetchAll';

export function App() {
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    error && alert(error);
  }, [error]);

  return (
    <div>
      <Section title="Phonebook">
        <Phonebook />
      </Section>
      <Section title="Contacts">
        <Filter />
        <ContactList />
      </Section>
    </div>
  );
}
