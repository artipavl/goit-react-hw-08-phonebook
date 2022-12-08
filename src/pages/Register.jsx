import { Section } from 'components/Section/Section';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSignup } from 'redux/auth/operations/authSignup';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitForm = async e => {
    e.preventDefault();
    const submitButton = e.currentTarget.elements.submitButton;
    submitButton.disabled = true;

      try {
      await dispatch(authSignup({ name, email, password }));
      submitButton.disabled = false;
    } catch (error) {
      console.log(error);
      submitButton.disabled = false;
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Section title="Register">
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="text"
          name="name"
          id=""
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" name="submitButton">
          submit
        </button>
      </form>
    </Section>
  );
};
