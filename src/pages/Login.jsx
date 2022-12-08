import { Section } from "components/Section/Section";

export const Login = () => {
  return (
    <Section title="Register">
      <form>
        <input type="email" name="email" />
        <br />
        <input type="password" name="password" />
        <br />
        <button type="submit">submit</button>
      </form>
    </Section>
  );
};
