import { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCopy } from "react-icons/io";
import Button from "./Button";
import classNames from "classnames";

export const CodeSnippet = ({ codeStr }: { codeStr: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex gap-2">
      <div className="bg-gray-100 p-2 rounded-md flex items-center justify-between">
        <code className="text-sm font-mono text-gray-800">{codeStr}</code>
      </div>
      <Button
        onClick={handleCopy}
        className={classNames("!p-2", {
          "animate-bounce-once": copied,
        })}
        aria-label={copied ? "Copied" : "Copy"}
      >
        {copied ? <IoIosCheckmarkCircle size={20} /> : <IoIosCopy size={20} />}
      </Button>
    </div>
  );
};
