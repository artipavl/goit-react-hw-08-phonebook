import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, ListItem, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations/deleteContact';

export const ContactItem = ({ contact }) => {
  const { name, number, id } = contact;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onButtonClick = async (e, id) => {
    setIsLoading(true);
    try {
      await dispatch(deleteContact(id));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ListItem>
      <Flex
        // alignItems="center"
        // justifyContent="center"
        justify="space-between"
        gap={4}
      >
        <Box display="flex" alignItems="center">
          <Text as="span" maxWidth={['100px', '300px', '400px']} noOfLines={1}>
            {name}
          </Text>
          <Text as="span" maxWidth={['100px', '300px', '400px']} noOfLines={1}>
            : {number}
          </Text>
        </Box>

        <IconButton
          type="button"
          onClick={e => onButtonClick(e, id)}
          aria-label="Delete"
          isLoading={isLoading}
          icon={<DeleteIcon />}
        />
      </Flex>
    </ListItem>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
