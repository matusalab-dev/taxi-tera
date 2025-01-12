import { Check } from "lucide-react";
import Button from "../components/Button";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-12 ">
      <h1 className="text-2xl">Taxi Tera,</h1>
      <p>All your trips in one place</p>

      <div className="flex gap-4 mt-10">
        <Button
          as="Link"
          to="/login"
          size="md"
          color="teal"
          children="Login"
          className="hover:text-white/90"
        />
        <Button
          as="Link"
          to="/register"
          size="md"
          color=""
          children="Register"
          className="text-gray-400 border border-teal-500 hover:text-teal-500/90"
        />
      </div>
      <div className="absolute left-0 right-0 w-full h-full px-8 py-10 mt-8 bg-gray-100">
        <h3>Logging in lets you</h3>
        <ul className="mt-3">
          <li>
            <p className="flex items-center gap-1 text-base font-light">
              <Check size={20} />
              Save new places you've discovered
            </p>
          </li>
          <li>
            <p className="flex items-center gap-1 text-base font-light">
              <Check size={20} />
              Browse routes you've saved
            </p>
          </li>
          <li>
            <p className="flex items-center gap-1 text-base font-light">
              <Check size={20} /> Be the first to try out new features
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
