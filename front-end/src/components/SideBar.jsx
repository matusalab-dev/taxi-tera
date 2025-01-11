import { ChevronRightIcon } from "lucide-react";

import { useAuthsDispatch } from "../contexts/AuthContext";

const SideBar = ({ toggle }) => {
  const dispatch = useAuthsDispatch();
  console.log("auth-dispatch", useAuthsDispatch());

  return (
    <section
      id="sidebar"
      className={`block rounded-tr-lg transition-all duration-150 rounded-tl-lg sm:rounded-none sm:block sm:w-1/3 sm:min-w-96 w-full sm:h-full p-5 h-96 bg-white text-black overflow-y-visible z-[1000] fixed top-2/4 sm:top-0 right-0 ${
        !toggle && "hidden sm:hidden"
      }`}
    >
      <h3>side bar</h3>
      <button
        onClick={() => {
          dispatch({
            type: "setCredentials",
            payload: { name: "admin", password: "123456" },
          });
        }}
      >
        log in
      </button>
      <br />
      <button
        onClick={() => {
          dispatch({ type: "logout" });
        }}
      >
        log out
      </button>
    </section>
  );
};

export default SideBar;
