import supabase from "../clients/supabase";

export const LoginModal = ({ loginModalOpen }: { loginModalOpen: boolean }) => {
  const signInWithGoogle = async () => {
    const { data, errors } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
    console.log(data,errors);
  };

  if (!loginModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login/Signup</h1>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with Google
        </button>
        {/* <button onClick={signInWithApple}>Login with Apple</button> */}
      </div>
    </div>
  );
};
