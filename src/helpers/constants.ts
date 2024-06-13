export const ROUTES = {
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
    support: {
      name: "support",
      path: "/dashboard/support",
      title: "Support",
    },
  },
};

export const COLORS = [
  {
    hex: "#0090FF",
    name: "Blue",
  },
  {
    hex: "#323232",
    name: "Black",
  },
  {
    hex: "#5856fe",
    name: "Purple",
  },
  {
    hex: "#45AF96",
    name: "Green",
  },
  {
    hex: "#F35353",
    name: "Red",
  },
];

export const SUPPORT_EMAIL = "support@wisepilot.io";
