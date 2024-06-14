import { IconType } from "react-icons";
import { AiFillMessage } from "react-icons/ai";
import { BsSendFill } from "react-icons/bs";
import { ROUTES } from "../helpers/constants";

export type LinkItemProps = {
  name: string;
  icon: IconType;
  href: string;
};

export const LINK_ITEMS: Array<LinkItemProps> = [
  {
    name: "Copilots",
    icon: BsSendFill,
    href: ROUTES.dashboard.copilots.name,
  },
  {
    name: "Support",
    icon: AiFillMessage,
    href: ROUTES.dashboard.support.name,
  },
];
