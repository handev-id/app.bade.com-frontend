import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <Home /> },
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
