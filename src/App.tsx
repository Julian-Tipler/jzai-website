import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarLayout } from "./components/SidebarLayout";
import { Home } from "./views/Home";
import { Error } from "./views/Error";
import { Company } from "./views/Company";
import { Features } from "./views/Features";
import { Contact } from "./views/Contact";
import { Team } from "./views/Team";

function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      children: [
        {
          path: "/",
          element: <SidebarLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "/company",
              element: <Company />,
            },
            {
              path: "/features",
              element: <Features />,
            },
            {
              path: "/team",
              element: <Team />,
            },
            {
              path: "/contact",
              element: <Contact />,
            },
          ],
        },
        {
          path: "*",
          element: <Error message="404" />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </>
  );
}

export default App;
