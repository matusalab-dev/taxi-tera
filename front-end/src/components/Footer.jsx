import { cn } from "../utils/utils";

const Footer = ({ className }) => {
  return (
    <footer className={`${cn("", className)}`}>
      <h3 className="flex flex-col max-w-max">
        Taxi <span className="px-2 text-white bg-teal-500">Tera</span>
      </h3>
    </footer>
  );
};

export default Footer;
