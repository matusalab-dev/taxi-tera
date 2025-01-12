import Input from "../components/Input";
import Button from "../components/Button";
const Register = () => {
  return (
    <section className="mt-12 space-y-6">
      <h3 className="text-2xl">Register</h3>
      <form className="space-y-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-base font-light capitalize">
            name
          </label>
          <Input type="text" id="name" placeholder="name" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="userName" className="text-base font-light capitalize">
            user name
          </label>
          <Input type="text" id="userName" placeholder="user name" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-base font-light capitalize">
            password
          </label>
          <Input type="password" id="password" placeholder="password" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirm" className="text-base font-light capitalize">
            confirm password
          </label>
          <Input type="password" id="confirm" placeholder="confirm password" />
        </div>
        <div className="flex justify-between">
          <Button
            as="Link"
            to="/login"
            type="submit"
            children="Cancel"
            color="outline"
            size="lg"
            className="!mt-7 border border-teal-500"
          />
          <Button
            as="button"
            type="submit"
            children="Register"
            color="teal"
            size="xs"
            className="!mt-4"
          />
        </div>
      </form>
    </section>
  );
};

export default Register;
