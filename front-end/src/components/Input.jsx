import React from "react";
import { cn } from "../utils/utils";

const Input = ({
  type = "search",
  name,
  className,
  placeholder = "are you looking for next taxi stand?",
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      className={` ${cn(
        "w-full px-5 py-2 text-base rounded-[4px]  text-light_black/70 focus:!border-grey-500 focus:outline-none focus-within:outline-grey-500 text-gray-400 bg-white border border-teal-500",
        className
      )}`}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
