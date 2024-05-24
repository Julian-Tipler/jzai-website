import supabase from "../clients/supabase";
import { useLoginModalContext } from "../contexts/LoginModalContext";

export const LoginModal = ({
  loginModalOpen,
  setLoginModalOpen,
}: {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
}) => {
  const { redirectTo } = useLoginModalContext();
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  };

  if (!loginModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setLoginModalOpen(false)}
    >
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Login/Signup</h2>
        <button
          onClick={signInWithGoogle}
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Login with Google
        </button>
        {/* <button onClick={signInWithApple}>Login with Apple</button> */}
      </div>
    </div>
  );
};
