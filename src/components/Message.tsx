import classNames from "classnames";

export const Message = ({
  message,
  className,
  style,
}: {
  message: { role: "user" | "assistant"; content: string };
  className?: string;
  style?: Record<string, string>;
}) => {
  const isUser = message.role === "user";

  return (
    <div
      className={classNames(className, "flex flex-row text-xs", {
        "items-end": isUser,
        "items-start": !isUser,
      })}
      style={style}
    >
      {!isUser && (
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
      )}
      <div
        className={classNames("flex flex-col", {
          "items-end": isUser,
          "items-start": !isUser,
        })}
      >
        <div className="mb-1 text-xs text-slate-400">
          {isUser ? "You" : "Bot"}
        </div>
        <div
          className={classNames(
            "w-4/5 rounded-lg rounded-tl-lg rounded-tr-lg p-4 text-left text-lg font-normal",
            {
              "self-end rounded-bl-lg rounded-br-none bg-primary-700 text-white":
                isUser,
              "rounded-br rounded-bl-none self-start bg-slate-100 text-black":
                !isUser,
            },
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
