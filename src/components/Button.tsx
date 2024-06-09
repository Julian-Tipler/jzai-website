import classNames from "classnames";
import { forwardRef } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { className?: string }
>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(
        props.className,
        "text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 outline-none",
      )}
    >
      {props.children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
