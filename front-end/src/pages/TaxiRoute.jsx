import Input from "../components/Input";
import InputGroup from "../components/InputGroup";

const TaxiRoute = () => {
  return (
    <section>
      <div className="flex flex-col gap-4 mt-10">
        <InputGroup label="Start">
          <Input
            type="text"
            id="start"
            requiredField={false}
            name="Start"
            placeholder="Start"
          />
        </InputGroup>
        <InputGroup label="End">
          <Input
            type="text"
            name="destination"
            requiredField={false}
            placeholder="Destination"
          />
        </InputGroup>
      </div>
    </section>
  );
};

export default TaxiRoute;
