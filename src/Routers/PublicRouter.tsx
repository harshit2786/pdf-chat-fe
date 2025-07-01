import { useRoutes } from "raviger";
import LandingPage from "../Pages/LandingPage";
import AuthPage from "../Pages/SignIn";


export const routes = {
    "/" : () => <LandingPage/>,
    "/login" : () => <AuthPage/>
}

export default function PublicRouter() {
  return (
    <>
      {useRoutes(routes) || <AuthPage/>}
    </>
  );
}