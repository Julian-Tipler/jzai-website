import { useState } from "react";

import {
  FiHome,
  FiSettings,
  FiMenu,
  //   FiStar,
  //   FiCompass,
  //   FiSmartphone,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Profile", icon: FiHome, href: "/profile" },
  { name: "Settings", icon: FiSettings, href: "/profile/settings" },
];
const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

export const CustomerLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={"min-h-screen bg-gray-100"}>
      <SidebarContent onClose={() => onClose} />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex" onClick={onClose}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="relative bg-white dark:bg-gray-900 w-full max-w-xs p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onClose={onClose} />
          </div>
        </div>
      )}
      <MobileNav onOpen={onOpen} />
      <div className="flex flex-col md:ml-60 h-screen main">
        <div className="min-h-[60px] p-0 m-0 topbar">
          <TopBar />
        </div>
        <div
          className="p-4 flex-1 overflow-auto body"
          style={{ backgroundColor: "var(--brand-background)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

//Nav items for mobile and desktop view
const SidebarContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className={`fixed h-full "bg-gray-900" border-r border-brand-border w-full md:w-60`}
    >
      <div className="flex h-20 items-center mx-8 justify-between">
        <span className="text-2xl font-bold text-brand-primary">Logo</span>
        <button className="flex md:hidden" onClick={onClose}>
          Close
        </button>
      </div>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </div>
  );
};

interface NavItemProps {
  icon: IconType;
  href: string;
  children: ReactText;
}
const NavItem = ({ icon: IconComponent, children, href }: NavItemProps) => {
  return (
    <a
      href={href}
      className="group flex items-center p-4 mx-4 rounded-lg cursor-pointer no-underline focus:outline-none"
    >
      {IconComponent && (
        <IconComponent className="mr-4 text-16 group-hover:text-text-primary" />
      )}
      {children}
    </a>
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
