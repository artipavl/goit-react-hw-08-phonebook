import { Container, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const Section = ({ title = '', children, ...athe }) => {
  return (
    <Container
      {...athe}
      w={['290px', '738px', '738px', '994px']}
      alignItems="center"
      maxWidth="none"
    >
      {title && (
        <Heading as="h1" size="xl" textAlign="center" m={4}>
          {title}
        </Heading>
      )}
      {children}
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};
