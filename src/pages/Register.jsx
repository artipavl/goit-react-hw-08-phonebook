import { Section } from "components/Section/Section";

export const Register = () => {
  return (
    <Section title="Register">
      <form>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" />
        <br />
        <input type="password" name="password" />
        <br />
        <button type="submit">submit</button>
      </form>
    </Section>
  );
};
