import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginUser } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isLoading, errors },
  } = useForm();

  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });
  const onSubmit = async (data) => {
    console.log("user data:", data);

    mutation.mutate(data);
  };
  return (
    <section className="mt-12 space-y-6">
      <h3 className="text-2xl">Log In</h3>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup label="user name">
          <Input
            type="text"
            id="username"
            label="user Name"
            placeholder="JohnDoe"
            {...register("username", { required: "User name is required" })}
          />
        </InputGroup>
        <InputGroup label="password">
          <Input
            type="password"
            id="password"
            label="password"
            placeholder="********"
            {...register("password", { required: "Password is required" })}
          />
        </InputGroup>

        <div className="flex flex-col justify-between">
          <Button
            as="button"
            type="submit"
            children="Log in"
            color="teal"
            size="lg"
            disabled={isSubmitting}
            className={`!mt-4 ${isSubmitting && "!animate-pulse"}`}
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
