import { Login } from "./Login";

export const LoginModal = ({
  loginModalOpen,
  setLoginModalOpen,
}: {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
}) => {
  if (!loginModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setLoginModalOpen(false)}
    >
      <Login />
    </div>
  );
};
