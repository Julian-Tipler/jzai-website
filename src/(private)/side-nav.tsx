import { Link } from "react-router-dom";
import { LINK_ITEMS } from "./constants";

export const SideNav = () => {
  return (
    <nav className="bg-white sticky z-10 flex flex-col bottom-0 top-0 left-0 dark:bg-gray-900 border-r border-brand-border min-w-60">
      <div className="flex items-center m-4 justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/wisepilot-logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="WisePilot Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            WisePilot
          </span>
        </Link>
      </div>
      <ul className="m-4">
        {LINK_ITEMS.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.name}>
              <Link
                to={link.href}
                className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-200"
              >
                {Icon && <Icon className="mr-4 text-16" size={20} />}
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
