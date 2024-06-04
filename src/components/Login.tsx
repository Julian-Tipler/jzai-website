import SignInWithGoogleButton from "./SignInWithGoogleButton";

export const Login = () => {
  return (
    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Login/Signup</h2>
      <SignInWithGoogleButton />
      {/* <button onClick={signInWithApple}>Login with Apple</button> */}
    </div>
  );
};
