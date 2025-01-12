import { ChevronRightIcon, Route, Search, User } from "lucide-react";
import { Link } from "react-router";
import { useAuthsDispatch } from "../contexts/AuthContext";

const SideBar = ({ toggle }) => {
  // const dispatch = useAuthsDispatch();
  // console.log("auth-dispatch", useAuthsDispatch());

  return (
    <section
      id="sidebar"
      className={`block rounded-tr-lg transition-all duration-150 rounded-tl-lg sm:rounded-none sm:w-[30%] sm:min-w-96 w-full sm:h-full p-5 h-96 bg-white text-black overflow-y-visible z-[1000] fixed top-2/4 sm:top-0 right-0 ${
        !toggle && "hidden"
      }`}
    >
      <nav>
        <ul className="flex items-start justify-between w-full border-b-2">
          <li>
            <Link
              to="/"
              className="max-w-[10ch] inline-block text-base font-normal"
            >
              <Search />
              search
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="max-w-[10ch] inline-block text-base font-normal"
            >
              <Route />
              routes
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="max-w-[8ch] inline-block text-base font-normal"
            >
              <User />
              log in to taxi tera
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default SideBar;
