import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Route,
  Search,
  User,
} from "lucide-react";
import { Link, Outlet } from "react-router";
import { useAuthsDispatch } from "../contexts/AuthContext";
import Footer from "./Footer";

const SideBar = ({ toggle }) => {
  // const dispatch = useAuthsDispatch();
  // console.log("auth-dispatch", useAuthsDispatch());

  return (
    <section
      id="sidebar"
      className={`block sm:overflow-y-scroll overflow-hidden rounded-tr-lg transition-all duration-150 rounded-tl-lg sm:rounded-none sm:w-[30%] sm:min-w-96 w-full sm:h-full p-5 pb-12 h-12 bg-white text-black overflow-y-visible z-[1000] fixed top-2/4 sm:top-0 right-0 ${
        !toggle && "hidden"
      }`}
    >
      <nav className="">
        <ul className="flex items-start justify-between w-full">
          <li className="pr-6 border-r-2">
            <Link
              to="/search"
              className="text-gray-400  capitalize max-w-[10ch] flex gap-1 text-base font-normal"
            >
              <Search />
              search
            </Link>
          </li>
          <li className="pr-6 border-r-2">
            <Link
              to="/routes"
              className="text-gray-400 capitalize max-w-[10ch] flex gap-1 text-base font-normal"
            >
              <Route />
              route
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-gray-400 w-[13ch] items-start flex justify-end gap-1 text-sm font-light leading-tight"
            >
              <User />
              <div className="flex flex-col gap-1 text-teal-500">
                <span className="text-sm font-normal text-gray-400">
                  Log in to
                </span>
                My Taxi Tera
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      {/* <button
        onClick={() => handleToggle()}
        className={`z-[1000] fixed top-2/4 sm:top-1/2 right-0 bg-white ${
          !toggle && "right-[30%]"
        }`}
      >
        {toggle ? (
          <ChevronRightIcon size={40} />
        ) : (
          <ChevronLeftIcon size={40} className="animate-pulse" />
        )}
      </button> */}
      <Outlet />
      <Footer className="absolute bottom-0 top-full" />
    </section>
  );
};

export default SideBar;
