import { useState } from "react";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import { Rotate3D } from "lucide-react";
import Button from "../components/Button";

const TaxiRoute = () => {
  const [route, setRoute] = useState({
    start: "",
    end: "",
  });
  // const [end, setEnd] = useState("");
  function handleSubmit({ e }) {
    e.preventDefault();
    console.log("val:", e.target.value);
  }
  return (
    <section>
      <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
        <InputGroup label="Start">
          <Input
            type="text"
            id="start"
            requiredField={false}
            name="start"
            placeholder="Start"
            value={route.start}
            onChange={(e) => setRoute({ ...route, start: e.target.value })}
          />
        </InputGroup>
        <InputGroup label="End">
          <Input
            type="text"
            name="end"
            requiredField={false}
            placeholder="Destination"
            value={route.end}
            onChange={(e) => setRoute({ ...route, end: e.target.value })}
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
