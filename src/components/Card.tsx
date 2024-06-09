import { ElementType } from "react";

const Card = ({
  tag: Tag = "div",
  children,
}: {
  tag?: ElementType;
  children: React.ReactNode;
}) => {
  return (
    <Tag className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      {children}
    </Tag>
  );
};

export default Card;
