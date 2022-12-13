import css from 'components/Contacts/ContactList.module.css';

import { ContactItem } from 'components/Contacts/ContactItem';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.value);
  const filter = useSelector(state => state.filter.value);
  
  const contactsFil = useMemo(
    () =>
      filter
        ? contacts.filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
          )
        : contacts,
    [contacts, filter]
  );
  console.log(contactsFil);
  return (
    <>
      {contactsFil && (
        <ul className={css.list}>
          {contactsFil.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </>
  );
};
