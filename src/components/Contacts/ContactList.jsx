import { Flex, List } from '@chakra-ui/react';
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
  return (
    <Flex
      minWidth="max-content"
      // alignItems="center"
      // justifyContent="center"

      gap={2}
      flexDirection="column"
      
    >
      {contactsFil && (
        <List spacing={4}>
          {contactsFil.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </List>
      )}
    </Flex>
  );
};
