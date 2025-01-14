import Input from "../components/Input";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { registerUser } from "../api/api";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Access the client
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  // const mutate = useRegisterMutation();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
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
      <h3 className="text-2xl">Register</h3>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup label="name">
          <Input
            type="text"
            id="name"
            label="Name"
            placeholder="John Doe"
            {...register("name", { required: "Name is required" })}
          />
        </InputGroup>
        <InputGroup label="user Name">
          <Input
            type="text"
            id="username"
            label="User Name"
            placeholder="JohnDoe"
            {...register("username", { required: "User Name is required" })}
          />
        </InputGroup>
        <InputGroup label="email">
          <Input
            type="email"
            id="email"
            label="email"
            placeholder="JohnDoe@gmail.com"
            {...register("email", { required: "Email is required" })}
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
