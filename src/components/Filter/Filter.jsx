import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFiltre } from 'redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      justifyContent="center"
      gap={2}
      flexDirection="column"
      marginBottom={4}
    >
      <FormControl w="inherit">
        <FormLabel>Find contacts by name</FormLabel>
        <Input
          w={[null, 200, 300, 400]}
          value={filter}
          onChange={e => dispatch(changeFiltre(e.target.value))}
          type="text"
          name="filter"
          title="filter"
          required
        />
      </FormControl>
    </Flex>
  );
};
