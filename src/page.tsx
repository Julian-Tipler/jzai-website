import { QueryClient } from "@tanstack/react-query";
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import supabase from "./clients/supabase";
import { PublicLayout } from "./(public)/layout";
import { ROUTES } from "./helpers/constants";
import { copilotLoader } from "./loaders/copilot-loader";
import { Tables } from "./types/database.types";
import { Home } from "./(public)/home/page";
import { Login } from "./(public)/login/page";
import { CustomerCopilot } from "./(private)/dashboard/copilots/copilot/page";
import { CreateCopilot } from "./(private)/dashboard/copilots/create/page";
import { CustomerCopilots } from "./(private)/dashboard/copilots/page";
import { CustomerSupport } from "./(private)/dashboard/support/page";
import { Error } from "./(public)/error/page";
import { PrivateLayout } from "./(private)/layout.tsx";

function App({ queryClient }: { queryClient: QueryClient }) {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      children: [
        {
          path: ROUTES.login.path,
          element: <Login />,
          handle: {
            data: { title: ROUTES.login.title },
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
          path: ROUTES.dashboard.path,
          element: <PrivateLayout />,
          loader: protectedLoader,
          children: [
            {
              index: true,
              element: <Navigate to={ROUTES.dashboard.copilots.path} />,
              handle: {
                crumb: () => ROUTES.dashboard.copilots.title,
                data: { title: ROUTES.dashboard.copilots.title },
              },
            },
            {
              path: ROUTES.dashboard.copilots.name,
              element: <Outlet />,
              handle: {
                crumb: () => ROUTES.dashboard.copilots.title,
                data: { title: ROUTES.dashboard.copilots.title },
              },
              children: [
                {
                  index: true,
                  element: <CustomerCopilots />,
                  handle: {
                    crumb: () => ROUTES.dashboard.copilots.title,
                    data: { title: ROUTES.dashboard.copilots.title },
                  },
                },
                {
                  path: ROUTES.dashboard.copilots.copilotId.name,
                  element: <CustomerCopilot />,
                  loader: async ({ params }) =>
                    await copilotLoader({ params, queryClient }),
                  handle: {
                    crumb: (data: Tables<"copilots">) =>
                      data.title ?? "Copilot",
                    data: {
                      title: ROUTES.dashboard.copilots.title ?? "Copilot",
                    },
                  },
                },
                {
                  path: ROUTES.dashboard.copilots.create.name,
                  element: <CreateCopilot />,
                  handle: {
                    crumb: () => ROUTES.dashboard.copilots.create.title,
                    data: { title: ROUTES.dashboard.copilots.create.title },
                  },
                },
              ],
            },
            {
              path: ROUTES.dashboard.support.name,
              element: <CustomerSupport />,
              handle: {
                crumb: () => ROUTES.dashboard.support.title,
                data: { title: ROUTES.dashboard.support.title },
              },
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
