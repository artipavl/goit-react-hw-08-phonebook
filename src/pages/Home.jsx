import { Heading } from '@chakra-ui/react';
import { Section } from 'components/Section/Section';

const Home = () => {
  return (
    <Section>
      <Heading as="h1" textAlign={'center'}>
        Hello, this project was carried out as part of the "React" practice.
      </Heading>
    </Section>
  );
};

export default Home;