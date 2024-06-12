import classNames from "classnames";
import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

const WiseLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return (
    <Link
      {...props}
      ref={ref}
      className={classNames(
        props.className,
        "text-white bg-brand hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 outline-none",
      )}
    >
      {props.children}
    </Link>
  );
});

WiseLink.displayName = "WiseLink";

export default WiseLink;
