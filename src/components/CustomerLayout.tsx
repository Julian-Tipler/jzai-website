import { FiMenu, FiStar } from "react-icons/fi";
import { IconType } from "react-icons";
import { Link, Outlet, useMatches } from "react-router-dom";
import { TopBar } from "./TopBar";
import { Helmet } from "react-helmet-async";
import { RouteItem } from "../types/route-item";
import { WiseRoutes } from "../helpers/constants";
import { MdContactSupport } from "react-icons/md";
import { Breadcrumbs } from "./Breadcrumbs";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Copilots", icon: FiStar, href: WiseRoutes.dashboard.copilots.name },
  {
    name: "Support",
    icon: MdContactSupport,
    href: WiseRoutes.dashboard.support.name,
  },
];

export const CustomerLayout = () => {
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

const SideNav = () => {
  return (
    <nav className="bg-white sticky z-10 flex flex-col bottom-0 top-0 left-0 dark:bg-gray-900 border-r border-brand-border min-w-60">
      <div className="flex items-center m-4 justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-normal whitespace-nowrap dark:text-white">
            Wise AI
          </span>
        </Link>
      </div>
      <ul className="m-4">
        {LinkItems.map((link) => (
          <li key={link.name}>
            <NavItem icon={link.icon} href={link.href}>
              {link.name}
            </NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const NavItem = ({
  icon: IconComponent,
  children,
  href,
}: {
  icon: IconType;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={href}
      className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-200"
    >
      {IconComponent && <IconComponent className="mr-4 text-16" size={20} />}
      {children}
    </Link>
  );
};

const MobileNav = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div
      className={`flex items-center h-20 bg-brand-cardBackground border-b border-brand-border justify-start md:hidden`}
    >
      <button
        onClick={onOpen}
        aria-label="open menu"
        className="p-2 text-white border border-white rounded outline-none hover:bg-gray-700 focus:bg-gray-700"
      >
        <FiMenu className="text-xl" />
      </button>

      <span className="text-2xl ml-8 font-mono font-bold">Logo</span>
    </div>
  );
};

export default MobileNav;
