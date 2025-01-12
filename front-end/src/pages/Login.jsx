import Button from "../components/Button";
import InputGroup from "../components/InputGroup";

const Login = () => {
  return (
    <section className="mt-12 space-y-6">
      <h3 className="text-2xl">Log In</h3>
      <form className="space-y-3">
        <InputGroup type="text" id="name" label="Name" placeholder="John Doe" />
        <InputGroup
          type="password"
          id="password"
          label="password"
          placeholder="********"
        />

        <div className="flex flex-col justify-between">
          <Button
            as="button"
            type="submit"
            children="Log in"
            color="teal"
            size="lg"
            className="!mt-4"
          />
          <div className="flex items-center gap-2 !mt-5 font-normal">
            <p className="font-light">new user?</p>
            <Button
              as="Link"
              to="/register"
              children="register"
              size="outline"
              color="outline"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
