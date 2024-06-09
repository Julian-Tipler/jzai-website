export type RouteItem = {
  pathname: string;
  element: React.ReactNode;
  children?: RouteItem[];
  data?: unknown;
  handle?: {
    crumb: (data?: unknown) => string;
    data: { title: string };
  };
};
