import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import AppProviders from "./contexts/contextProvider.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TaxiRoute from "./pages/TaxiRoute.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import SavedRoutes from "./pages/SavedRoutes.jsx";
import SearchStands from "./pages/SearchStands.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route path="/search" element={<SearchStands />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/routes" element={<TaxiRoute />} />

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/saved-routes" element={<SavedRoutes />} />
      </Route>
      {/* if the route doesn't match to the above routes,
        redirect user to the not-found(404) page */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </QueryClientProvider>
  </StrictMode>
);
