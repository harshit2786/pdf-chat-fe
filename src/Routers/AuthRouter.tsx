import { useRoutes } from "raviger";
import DashboardPage from "../Pages/Dashboard";
import FolderPage from "../Pages/Folder";

export const routes = {
  "/": () => <DashboardPage />,
  "/folder/:id": ({ id }: { id: string }) => <FolderPage params={{ id }} />,
};

export default function AuthRouter() {
  return <>{useRoutes(routes) || <></>}</>;
}
