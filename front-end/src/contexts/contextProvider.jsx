import AuthProvider from "./AuthContext";
import SavedRoutesProvider from "./savedRoutesContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <SavedRoutesProvider>{children}</SavedRoutesProvider>
    </AuthProvider>
  );
};

export default AppProviders;
