import Dialog from "../components/Dialog";
import GoogleSignInButton from "../components/GoogleSignInButton";

export const LoginModal = ({
  loginModalOpen,
  setLoginModalOpen,
}: {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog isOpen={loginModalOpen}>
      <div className="relative p-4 w-full max-w-sm max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h2 className="text-xl font-normal text-gray-900 dark:text-white">
              Login
            </h2>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => setLoginModalOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </Dialog>
  );
};
