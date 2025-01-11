import { AuthProvider } from "./context/AuthContext";
import { SavedRoutesProvider } from "./context/SavedRoutesContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <SavedRoutesProvider>{children}</SavedRoutesProvider>
    </AuthProvider>
  );
};

export default AppProviders;
