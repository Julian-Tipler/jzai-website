import supabase from "../clients/supabase";
import { useLoginContext } from "../contexts/LoginContext";

const SignInWithGoogleButton = () => {
  const { redirectTo } = useLoginContext();

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-normal text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
    >
      Login with Google
    </button>
  );
};

export default SignInWithGoogleButton;
