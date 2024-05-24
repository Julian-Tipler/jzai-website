import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import { Home } from "./views/Home";
import { Error } from "./views/Error";
import { Features } from "./views/Features";
import { Contact } from "./views/Contact";
import { redirect } from "react-router-dom";
import supabase from "./clients/supabase";
import { CustomerProfile } from "./views/CustomerProfile";
import { CustomerSettings } from "./views/CustomerSettings";
import { CustomerLayout } from "./components/CustomerLayout";

function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      children: [
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "features",
              element: <Features />,
            },
            {
              path: "contact",
              element: <Contact />,
            },
          ],
        },
        {
          path: "profile",
          element: <CustomerLayout />,
          loader: protectedLoader,
          children: [
            {
              index: true,
              element: <CustomerProfile />,
            },
            {
              path: "settings",
              element: <CustomerSettings />,
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

async function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  console.log(request);

  const auth = await supabase.auth.getSession();

  // something like this: const session = supabase.auth.session();
  if (!auth.data.session) {
    const params = new URLSearchParams();

    params.set("from", new URL(request.url).pathname);

    return redirect("/login?" + params.toString());
  }

  return { auth };
}

export default App;
