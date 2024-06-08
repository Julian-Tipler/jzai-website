import { LoginModal } from "../LoginModal";
import { useLoginContext } from "../../contexts/LoginContext";
import { LinkItem } from "../LinkItem";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { HeaderButton } from "../HeaderButton";
import { useEffect, useState } from "react";
import { MobileMenu } from "../mobile-menu/MobileMenu";
import { linkItems } from "./constants/link-items";

export const Header = () => {
  const { loginModalOpen, setLoginModalOpen } = useLoginContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;

    if (isMobileMenuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const handleDashboardNavigation = () => {
    navigate("/profile");
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-10">
      <nav className="bg-white border-primary-border px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={"/"} className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-light whitespace-nowrap dark:text-white">
              Wise AI
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {session ? (
              <HeaderButton
                onClick={() => handleDashboardNavigation()}
                text={"Dashboard"}
              />
            ) : (
              <HeaderButton
                onClick={() => setLoginModalOpen(true)}
                text={"Login"}
              />
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            <ul className="flex wrap-col mt-4 font-normal lg:flex-row lg:space-x-8 lg:mt-0">
              {linkItems.map((item, i) => (
                <LinkItem key={`link-item-${i}`} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
      )}
      <LoginModal
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
    </header>
  );
};