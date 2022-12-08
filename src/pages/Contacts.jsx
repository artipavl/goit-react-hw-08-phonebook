import { Section } from 'components/Section/Section';
import { Phonebook } from 'components/Phonebook/Phonebook';
import { ContactList } from 'components/Contacts/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAll } from 'redux/contacts/operations/fetchAll';

export const Contacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

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
};
