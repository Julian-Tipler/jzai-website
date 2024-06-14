import GoogleSignInButton from "../../components/GoogleSignInButton";

export const Login = () => {
  return (
    <div>
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Login/Signup</h2>
        <GoogleSignInButton />
      </div>
    </div>
  );
};
