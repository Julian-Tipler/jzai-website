import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Copilot } from "./Copilot";

export const CopilotForm = () => {
  const [url, setUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("blue");
  const [title, setTitle] = useState("");
  const [errors] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilot-id");

  //   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const errors = validateForm({ url, primaryColor });
  //     if (errors.length > 0) {
  //       setErrors(errors);
  //       return;
  //     } else {
  //       const { data, error } = await supabase.functions.invoke("copilots", {
  //         method: "POST",
  //         body: {
  //           url,
  //           primaryColor,
  //           title,
  //         },
  //       });
  //       if (error) {
  //         console.error(error);
  //       }
  //       if (data && data.id) {
  //         const queryParams = new URLSearchParams();
  //         queryParams.set("copilot-id", data.id);
  //         const queryString = queryParams.toString();
  //         navigate(`/?${queryString}`);
  //       }
  //     }
  //   };

  return (
    <section className="bg-white dark:bg-gray-900 border-b border-primary-border">
      <div className="flex py-24 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="place-self-center mr-auto lg:col-span-7">
          <div className="mb-12">
            <h1 className="mb-6 text-5xl font-semibold text-light dark:text-white">
              Build your copilot
            </h1>
            <p className="font-light text-gray-500">
              Customize your copilot blah blah blah blah blah blah blah blah
              blah
            </p>
          </div>
          <script type="module" src="./copilot.js"></script>
          <form className="flex flex-col gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-url-here.com"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Copilot title here"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
            </select>
            {/* Error Container */}
            <div className="min-h-8">
              {errors.map((error) => (
                <p key={error} className="text-red-600">
                  {error}
                </p>
              ))}
            </div>
            {copilotId ? (
              <button
                type="submit"
                className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Generate my script
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                // onClick={() => }
                className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Generate my Copilot
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
          </form>
        </div>
        <Copilot />
      </div>
    </section>
  );
};

// const validateForm = ({
//   url,
//   primaryColor,
// }: {
//   url: string;
//   primaryColor: string;
// }) => {
//   if (!url) {
//     return ["url is required"];
//   }
//   if (!primaryColor) {
//     return ["color is required"];
//   }
//   return [];
// };
