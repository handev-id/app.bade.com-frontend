import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Partner from "./pages/partner";
import Drivers from "./pages/partner/drivers";
import PartnerLayout from "./pages/partner/layout";
import Cars from "./pages/partner/cars";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <Home /> },
        {
          path: "/partner",
          element: <PartnerLayout />,
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
            {
              path: "cars",
              element: <Cars />,
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
