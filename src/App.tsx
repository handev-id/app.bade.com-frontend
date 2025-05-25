import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Partner from "./pages/partner";
import Drivers from "./pages/partner/drivers";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <Home /> },
        {
          path: "/partner",
          children: [
            {
              path: "",
              index: true,
              element: <Partner />,
            },
            {
              path: "drivers",
              element: <Drivers />,
            },
          ],
        },
        {
          path: "/auth",
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
      ])}
    />
  );
};

export default App;
