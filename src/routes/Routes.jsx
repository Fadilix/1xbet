import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/authentication/LoginPage";
import RegisterPage from "../pages/authentication/RegisterPage";
import Historique from "../pages/Historique";
import { AuthContext } from "../contexts/LoginContext";
import { useContext } from "react";
import UserRechargement from "../pages/UserRechargement";
import UserRetraits from "../pages/UserRetraits";
import OperateurRecharge from "../pages/OperateurRecharge";
import OperateurRetrait from "../pages/OperateurRetrait";
import PageNotFound from "../pages/PageNotFound";

const routerConfig = [
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/register-3aH7K6W",
    Component: RegisterPage,
  },
  {
    path: "/home/:nom/rechargements",
    Component: UserRechargement,
    guard: (IsLoggedIn) => IsLoggedIn,
  },
  {
    path: "/home/:nom/retraits",
    Component: UserRetraits,
    guard: (IsLoggedIn) => IsLoggedIn,
  },
  {
    path: "/home/:nom/operateur/rechargements",
    Component: OperateurRecharge,
    guard: (IsLoggedIn) => IsLoggedIn,
  },
  {
    path: "/home/:nom/operateur/retraits",
    Component: OperateurRetrait,
    guard: (IsLoggedIn) => IsLoggedIn,
  },
  {
    path: "/historique",
    Component: Historique,
    guard: (IsLoggedIn) => IsLoggedIn,
  },
  {
    path: "/*",
    Component: PageNotFound,
  }
];

const useRouter = () => {
  const [IsLoggedIn] = useContext(AuthContext);
  const routes = routerConfig.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={route.guard ? (route.guard(IsLoggedIn) ? <route.Component /> : <LoginPage />) : <route.Component />}
    />
  ));

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};

export default useRouter;