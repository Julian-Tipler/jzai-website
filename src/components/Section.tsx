import classNames from "classnames";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum SectionVariant {
  Primary = "bg-primary-bg dark:bg-gray-800",
  Secondary = "bg-white dark:bg-gray-700",
}

const Section = ({
  id,
  children,
  className,
  variant = SectionVariant.Primary,
}: {
  id: string;
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
}) => {
  return (
    <section
      id={id}
      className={classNames(
        className,
        variant,
        "border-b border-primary-border",
      )}
    >
      {children}
    </section>
  );
};

export default Section;
