import { Outlet, useMatches } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Footer } from "./Zooter";
import { Header } from "./Zeader";
import { RouteItem } from "../types/route-item";

export const PublicLayout = () => {
  const matches = useMatches() as unknown as RouteItem[];
  const currentMatch = matches[matches.length - 1];

  return (
    <div>
      <Helmet>
        <title>{currentMatch.handle?.data.title} | JZAI</title>
      </Helmet>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
