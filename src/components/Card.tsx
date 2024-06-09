import classNames from "classnames";
import React, { ElementType, HTMLAttributes } from "react";

const Card = ({
  tag: Tag = "div",
  children,
  ...props
}: {
  tag?: ElementType;
  children: React.ReactNode;
} & HTMLAttributes<HTMLElement>) => {
  return (
    <Tag
      {...props}
      className={classNames(
        "p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800",
        props.className,
      )}
    >
      {children}
    </Tag>
  );
};

export default Card;
