import { IconType } from "react-icons";
import { FiHome, FiCompass, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LoginModal } from "./LoginModal";
import { useLoginModalContext } from "../contexts/LoginModalContext";

const url = "https://jzai.com/";

type LinkItemProps = {
  name: string;
  icon: IconType;
  href: string;
};

const linkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Features", icon: FiCompass, href: "/features" },
  { name: "Contact", icon: FiSettings, href: "/contact" },
];

export const Header = () => {
  const { loginModalOpen, setLoginModalOpen } = useLoginModalContext();

  return (
    <header>
      <nav className="bg-white border-primary-border px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href={url} className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              A-Z AI
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 outline-none"
            >
              Login
            </button>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex wrap-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {linkItems.map((item, i) => (
                <LinkItem key={`link-item-${i}`} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <LoginModal loginModalOpen={loginModalOpen} />
    </header>
  );
};

const LinkItem = (item: LinkItemProps) => {
  return (
    <li>
      <Link
        to={item.href}
        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
      >
        {item.name}
      </Link>
    </li>
  );
};
