import { Children } from "react";
import { cn } from "../utils/utils";
import { Link } from "react-router";

const sizes = {
  xs: "px-4 py-0 rounded-b-sm text-base",
  base: "px-4 py-4 rounded-b-sm text-base",
  md: "px-6 py-2 rounded-b-sm text-base",
  lg: "px-7 py-2 text-lg ",
  xl: "px-7 py-3 text-lg rounded-b-md rounded-t-none",
  outline: "p-0",
};

const colors = {
  black: "bg-colors-text-3 text-colors-primary-1",
  teal: "bg-teal-500 text-white",
  outline: "text-teal-500",
};

function Button({
  as = "button",
  to = "/",
  color,
  type,
  size,
  children,
  className,
}) {
  let colorVariants = colors[color];
  let sizeVariants = sizes[size];

  if (as === "Link" && to) {
    return (
      <Link
        className={`capitalize  ${colorVariants} ${sizeVariants} ${cn(
          "",
          className
        )} `}
        to={to}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`capitalize  ${colorVariants} ${sizeVariants} ${cn(
        "",
        className
      )} `}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
