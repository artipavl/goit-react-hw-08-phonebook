import { Section } from "components/Section/Section";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "redux/auth/operations/authLogin";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const submitForm = async e => {
      e.preventDefault();
      const submitButton = e.currentTarget.elements.submitButton;
      submitButton.disabled = true;

      try {
        await dispatch(authLogin({ email, password }));
        submitButton.disabled = false;
      } catch (error) {
        console.log(error);
        submitButton.disabled = false;
      }

      setEmail('');
      setPassword('');
  };
  
  return (
    <Section title="Register">
      <form onSubmit={e => submitForm(e)}>
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
