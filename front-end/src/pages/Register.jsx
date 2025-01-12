import Input from "../components/Input";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
const Register = () => {
  return (
    <section className="mt-12 space-y-6">
      <h3 className="text-2xl">Register</h3>
      <form className="space-y-3">
        <InputGroup type="text" id="name" label="Name" placeholder="John Doe" />
        <InputGroup
          type="text"
          id="userName"
          label="User Name"
          placeholder="JohnDoe"
        />
        <InputGroup
          type="password"
          id="password"
          label="password"
          placeholder="********"
        />
        <InputGroup
          type="password"
          id="confirm"
          label="password"
          placeholder="********"
        />

        <div className="flex justify-between !mt-6">
          <Button
            as="Link"
            to="/login"
            type="submit"
            children="Cancel"
            color="outline"
            size="lg"
            className="border border-teal-500 "
          />
          <Button
            as="button"
            type="submit"
            children="Register"
            color="teal"
            size="lg"
            className=""
          />
        </div>
      </form>
    </section>
  );
};

export default Register;
