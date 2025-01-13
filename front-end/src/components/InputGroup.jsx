import Input from "./Input";

const InputGroup = ({
  label,
  type,
  id,
  className,
  requiredField = true,
  placeholder,
  children,
  ...inputRest
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-base font-light capitalize ">
        {label} {requiredField && <span className="text-teal-500">*</span>}
      </label>
      {children}
    </div>
  );
};

export default InputGroup;
