import { IconType } from "react-icons";
import { FiHome, FiCompass, FiSettings } from "react-icons/fi";

type LinkItemProps = {
  name: string;
  icon: IconType;
  href: string;
};

export const linkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Features", icon: FiCompass, href: "#features" },
  { name: "Pricing", icon: FiSettings, href: "#pricing" },
  { name: "Custom Solutions", icon: FiSettings, href: "#custom" },
  { name: "Contact", icon: FiSettings, href: "#contact" },
];
