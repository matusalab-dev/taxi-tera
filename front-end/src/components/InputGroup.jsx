import Input from "./Input";

const InputGroup = ({
  label,
  type,
  id,
  className,
  placeholder,
  ...inputRest
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-base font-light capitalize">
        {label}
      </label>
      <Input type={type} id={id} placeholder={placeholder} {...inputRest} />
    </div>
  );
};

export default InputGroup;
