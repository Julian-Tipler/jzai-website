import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import { Home } from "./views/Home";
import { Error } from "./views/Error";
import { redirect } from "react-router-dom";
import supabase from "./clients/supabase";
import { CustomerSettings } from "./views/CustomerSettings";
import { CustomerLayout } from "./components/CustomerLayout";
import { CustomerCopilot } from "./views/CustomerCopilot";
import { CustomerCopilots } from "./views/CustomerCopilots";
import { LoginPage } from "./views/LoginPage";
import { CustomerSuccessPage } from "./views/CustomerSuccessPage";
import { CreateCopilot } from "./views/CreateCopilot";

function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
          ],
        },
        {
          path: "/",
          element: <CustomerLayout />,
          loader: protectedLoader,
          children: [
            {
              index: true,
              path: "copilots",
              element: <CustomerCopilots />,
            },
            {
              path: "copilots/create",
              element: <CreateCopilot />,
            },
            {
              path: "copilots/:copilotId",
              element: <CustomerCopilot />,
            },
            {
              path: "settings",
              element: <CustomerSettings />,
            },
            {
              path: "success",
              element: <CustomerSuccessPage />,
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
  // to the from page upon successful authentication

  const auth = await supabase.auth.getSession();

  // Something like this: const session = supabase.auth.session();
  if (!auth.data.session) {
    const params = new URLSearchParams();

    params.set("from", new URL(request.url).pathname);

    return redirect("/login?" + params.toString());
  }

  return { auth };
}

export default App;
