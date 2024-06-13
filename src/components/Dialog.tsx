import React, { useEffect, useRef } from "react";

type DialogProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({ isOpen, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm"
      ref={dialogRef}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

export default Dialog;
