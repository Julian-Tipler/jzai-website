import { FaChevronRight } from "react-icons/fa6";
import { RouteItem } from "../types/route-item";
import { Link } from "react-router-dom";

export const Breadcrumbs = ({ matches }: { matches: RouteItem[] }) => {
  return (
    <nav className="flex mb-5" aria-label="Breadcrumbs">
      <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
        {matches.map((match, index) => {
          const { pathname, handle } = match;
          const crumb = handle?.crumb ? handle.crumb(match.data) : pathname;
          const isLast = index === matches.length - 1;
          const isFirst = index === 0;

          return (
            <li key={pathname} className="inline-flex items-center">
              {!isFirst && <FaChevronRight />}
              {isLast ? (
                <span
                  className="ml-1 text-gray-700 md:ml-2 dark:text-gray-500"
                  aria-current="page"
                >
                  {crumb}
                </span>
              ) : (
                <Link to={pathname}>{crumb}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
