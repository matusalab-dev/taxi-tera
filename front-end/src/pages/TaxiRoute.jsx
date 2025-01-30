import { useState } from "react";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import { Rotate3D } from "lucide-react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findRoute } from "../api/api";
import { useFindRoutes } from "../api/queries/location-queries";

const TaxiRoute = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useFindRoutes();
  const onSubmit = (data) => {
    const startCoordinates = data.start.split(",").map(Number);
    const endCoordinates = data.end.split(",").map(Number);

    console.log("Route data:", startCoordinates, endCoordinates);
    mutation.mutate({ startCoordinates, endCoordinates });
  };

  return (
    <section>
      <form
        className="flex flex-col gap-4 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputGroup label="Start">
          <Input
            type="text"
            id="start"
            name="start"
            placeholder="Start"
            {...register("start", { required: "start location is required" })}
          />
        </InputGroup>
        <InputGroup label="End">
          <Input
            type="text"
            name="end"
            placeholder="Destination"
            {...register("end", {
              required: "Destination location is required",
            })}
          />
        </InputGroup>
        <Button
          type="submit"
          as="button"
          color="teal"
          size="lg"
          children="Find My Way"
        />
      </form>
    </section>
  );
};

export default TaxiRoute;
