import Button from "../../../../components/Button";
import Dialog from "../../../../components/Dialog";

export const CancelSubscriptionModal = ({
  open,
  setOpen,
  cancel,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  cancel: () => void;
}) => {
  return (
    <Dialog isOpen={open}>
      <div className="relative p-4 w-full max-w-sm max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2 border-red-700">
          <div className="flex items-start justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <div>
              <h2 className="text-xl font-normal text-gray-900 dark:text-white">
                Cancel Subscription
              </h2>
              <p className="mb-2 text-gray-500 dark:text-gray-400 font-light">
                Are you sure you want to cancel your subscription? You will lose
                access to all premium features.
              </p>
            </div>
            <div className="flex">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => setOpen(false)}
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
          </div>
          <div className="p-4 md:p-5 flex items-center gap-2 h-fit">
            <Button className="w-full" onClick={() => setOpen(false)}>
              No
            </Button>
            <Button
              className="w-full bg-red-700 hover:bg-red-900"
              onClick={cancel}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
