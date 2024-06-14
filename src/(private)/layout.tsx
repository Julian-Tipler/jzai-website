import { FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { Link, Outlet, useMatches } from "react-router-dom";
import { TopBar } from "./top-bar";
import { Helmet } from "react-helmet-async";
import { RouteItem } from "../types/route-item";
import { SideNav } from "./side-nav";
import { Breadcrumbs } from "./breadcrumbs";

export const PrivateLayout = () => {
  const matches = useMatches() as unknown as RouteItem[];
  const breadcrumbs = matches
    .slice(2)
    .filter((match) => match.pathname !== "/dashboard/copilots/"); // For some reason useMatches() matches dashboard/copilots twice.
  const currentMatch = matches[matches.length - 1];
  const title = currentMatch.handle?.crumb(currentMatch.data);

  return (
    <div className="bg-gray-100 flex flex-row h-full w-full">
      <Helmet>
        <title>{title ? `${title} | JZAI` : "JZAI"}</title>
      </Helmet>
      <SideNav />
      <div className="flex flex-col flex-1">
        <div className="overflow-scroll h-full flex flex-col">
          <TopBar />
          <main className="relative p-4 flex flex-col h-full gap-2">
            {breadcrumbs && breadcrumbs.length > 1 && (
              <Breadcrumbs matches={breadcrumbs} />
            )}
            {title && (
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {title}
              </h1>
            )}
            <hr className="my-8" />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
