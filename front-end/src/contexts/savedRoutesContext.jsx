import { createContext, useContext, useReducer } from "react";

const SavedRoutesContext = createContext(null);
const SavedRoutesDispatchContext = createContext(null);

const initialAuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
export default function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(savedRoutesReducers, initialAuthState);

  return (
    <SavedRoutesContext.Provider value={auth}>
      <SavedRoutesDispatchContext.Provider value={dispatch}>
        {children}
      </SavedRoutesDispatchContext.Provider>
    </SavedRoutesContext.Provider>
  );
}

export function useSavedRoutes() {
  return useContext(SavedRoutesContext);
}

export function useSavedRoutesDispatch() {
  return useContext(SavedRoutesDispatchContext);
}

function savedRoutesReducers(authState, action) {
  switch (action.type) {
    case "setCredentials":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);

      return {
        ...authState,
        userInfo: action.payload,
      };
    case "logout":
      localStorage.removeItem("userInfo");
      return {
        ...authState,
        userInfo: null,
      };
    default:
      return authState;
  }
}
