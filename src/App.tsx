import { Button } from "@heroui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/SignIn";


function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} >
      {/* <Button className="cursor-pointer" color="danger" >Button is this</Button> */}
      <AuthPage/>
    </QueryClientProvider>
  )
}

export default App
