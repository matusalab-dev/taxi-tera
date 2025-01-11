import { createContext, useContext, useReducer } from "react";

const AuthsContext = createContext(null);
const AuthsDispatchContext = createContext(null);

const initialAuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
export default function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(authReducers, initialAuthState);
  console.log("dispatch provider", auth);

  return (
    <AuthsContext.Provider value={auth}>
      <AuthsDispatchContext.Provider value={dispatch}>
        {children}
      </AuthsDispatchContext.Provider>
    </AuthsContext.Provider>
  );
}

export function useAuths() {
  return useContext(AuthsContext);
}

export function useAuthsDispatch() {
  return useContext(AuthsDispatchContext);
}

function authReducers(authState, action) {
  switch (action.type) {
    case "setCredentials":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
      console.log("authState", authState);
      return {
        ...authState,
        userInfo: action.payload,
      };
    case "logout":
      localStorage.removeItem("userInfo");
      console.log("logout");

      return {
        ...authState,
        userInfo: null,
      };
    default:
      return authState;
  }
}
