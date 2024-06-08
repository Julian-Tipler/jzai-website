import { useEffect } from "react";
import { linkItems } from "../header/constants/link-items";
import "./MobileMenu.css";

export const MobileMenu = ({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (value: boolean) => void;
}) => {
  useEffect(() => {
    const items = document.querySelectorAll(".mobile-menu-item");

    items.forEach((item, index) => {
      (item as HTMLElement).style.animation =
        `fadeInUp 0.1s ease-out ${index * 0.02}s forwards`;
    });
  }, []);

  return (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-20 lg:hidden h-screen">
      <ul className="px-4">
        {linkItems.map((item, i) => (
          <li
            key={`link-item-${i}`}
            className="mobile-menu-item "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a
              href={item.href}
              className="block py-4 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
