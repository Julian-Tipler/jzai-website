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
    <section className="bg-white dark:bg-gray-900">
      <div className="flex py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="place-self-center mr-auto lg:col-span-7">
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
          {/* <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
              Bring your company into the future
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              A-Z AI helps small and medium size businesses harness the power of
              Artificial Intelligence.
            </p> */}
          {/* <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Speak to Sales
            </a> */}
        </div>
        <Copilot />
        {/* <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div> */}
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
