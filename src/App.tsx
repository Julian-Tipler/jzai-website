import {
  createBrowserRouter,
  Link,
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import { Home } from "./views/Home";
import { Error } from "./views/Error";
import { redirect } from "react-router-dom";
import { CustomerSettings } from "./views/CustomerSettings";
import { CustomerLayout } from "./components/CustomerLayout";
import { CustomerCopilot } from "./views/CustomerCopilot";
import { CustomerCopilots } from "./views/CustomerCopilots";
import { LoginPage } from "./views/LoginPage";
import { CustomerSuccessPage } from "./views/CustomerSuccessPage";
import { CreateCopilot } from "./views/CreateCopilot";
import { QueryClient } from "@tanstack/react-query";
import supabase from "./clients/supabase";
import { copilotLoader } from "./loaders/copilot-loader";
import { Tables } from "./types/database.types";
import { WiseRoutes } from "./helpers/constants";

function App({ queryClient }: { queryClient: QueryClient }) {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      children: [
        {
          path: WiseRoutes.login.path,
          element: <LoginPage />,
          handle: {
            data: { title: WiseRoutes.login.title },
          },
        },
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            {
              index: true,
              element: <Home />,
              handle: {
                data: { title: "Home" },
              },
            },
          ],
        },
        {
          path: WiseRoutes.dashboard.path,
          element: <CustomerLayout />,
          loader: protectedLoader,
          children: [
            {
              index: true,
              element: <Navigate to={WiseRoutes.dashboard.copilots.path} />,
              handle: {
                crumb: () => WiseRoutes.dashboard.copilots.title,
                data: { title: WiseRoutes.dashboard.copilots.title },
              },
            },
            {
              path: WiseRoutes.dashboard.copilots.name,
              element: <Outlet />,
              handle: {
                crumb: () => WiseRoutes.dashboard.copilots.title,
                data: { title: WiseRoutes.dashboard.copilots.title },
              },
              children: [
                {
                  index: true,
                  element: <CustomerCopilots />,
                  handle: {
                    crumb: () => WiseRoutes.dashboard.copilots.title,
                    data: { title: WiseRoutes.dashboard.copilots.title },
                  },
                },
                {
                  path: WiseRoutes.dashboard.copilots.copilotId.name,
                  element: <CustomerCopilot />,
                  loader: async ({ params }) =>
                    await copilotLoader({ params, queryClient }),
                  handle: {
                    crumb: (data: Tables<"copilots">) => data.title,
                    data: { title: WiseRoutes.dashboard.copilots.title },
                  },
                },
                {
                  path: WiseRoutes.dashboard.copilots.create.name,
                  element: <CreateCopilot />,
                  handle: {
                    crumb: () => WiseRoutes.dashboard.copilots.create.title,
                    data: { title: WiseRoutes.dashboard.copilots.create.title },
                  },
                },
              ],
            },
            {
              path: WiseRoutes.dashboard.settings.name,
              element: <CustomerSettings />,
              handle: {
                crumb: () => WiseRoutes.dashboard.settings.title,
                data: { title: WiseRoutes.dashboard.settings.title },
              },
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
          handle: {
            data: { title: "Error" },
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
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
