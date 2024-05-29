/* eslint-disable react/prop-types */

interface HeaderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  text,
  ...props
}) => {
  return (
    <button
      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 outline-none"
      {...props}
    >
      {text}
    </button>
  );
};
