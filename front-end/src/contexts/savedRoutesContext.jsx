import { createContext, useContext, useReducer } from "react";

const SavedRoutesContext = createContext(null);
const SavedRoutesDispatchContext = createContext(null);

const initialSavedRouteState = {
  savedRoutes: localStorage.getItem("savedRoutes")
    ? JSON.parse(localStorage.getItem("savedRoutes"))
    : null,
};
export default function SavedRoutesProvider({ children }) {
  const [savedRoute, dispatch] = useReducer(
    savedRoutesReducers,
    initialSavedRouteState
  );

  return (
    <SavedRoutesContext.Provider value={savedRoute}>
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

function savedRoutesReducers(savedRoutes, action) {
  switch (action.type) {
    case "saveRoute":
      localStorage.setItem("savedRoutes", JSON.stringify(action.payload));

      return {
        ...savedRoutes,
        savedRoutes: action.payload,
      };
    case "removeRoute":
      localStorage.removeItem("savedRoutes");
      return {
        ...savedRoutes,
        savedRoutes: null,
      };
    default:
      return savedRoutes;
  }
}
