import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Providers/AuthProvider";
import Router from "./Routers";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider publicRoutes={<Router.PublicRouter />}>
        <Router.AuthRouter />
      </AuthProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 3000,
          removeDelay: 1000,
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
