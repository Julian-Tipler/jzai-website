export const WiseRoutes = {
  login: {
    name: "login",
    path: "/login",
    title: "Login",
  },
  dashboard: {
    name: "dashboard",
    path: "/dashboard",
    copilots: {
      name: "copilots",
      path: "/dashboard/copilots",
      title: "Copilots",
      copilotId: {
        name: ":copilotId",
        path: "/dashboard/copilots/:copilotId",
      },
      create: {
        name: "create",
        path: "/dashboard/copilots/create",
        title: "Create",
      },
    },
    settings: {
      name: "settings",
      path: "/dashboard/settings",
      title: "Settings",
    },
  },
};
