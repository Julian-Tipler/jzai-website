import React, { ChangeEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import supabase from "../clients/supabase";
import { Copilot } from "./Copilot";
import { Tables } from "../types/database.types";
import { useLoginContext } from "../contexts/LoginContext";
import { MdError } from "react-icons/md";

export const CopilotForm = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilot-id");
  const predefinedColors = [
    "#0090FF",
    "#FFFFFF",
    "#323232",
    "#5856fe",
    "#45AF96",
    "#F35353",
  ];
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);
  const [customColor, setCustomColor] = useState("");
  const primaryColor = selectedColor || customColor;

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setCustomColor("");
  };

  const handleCustomColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    setCustomColor(color);
    setSelectedColor(color);
  };
  const { modalLogin } = useLoginContext();

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateForm({ url, primaryColor });

    if (errors.length > 0) {
      setErrors(errors);

      return;
    } else {
      setErrors([]);
      const {
        data,
        error,
      }: {
        data: {
          copilot: Tables<"copilots"> | null;
          errorMessage: string | null;
        } | null;
        error: Error | null;
      } = await supabase.functions.invoke("copilots", {
        method: "POST",
        body: {
          url,
          primaryColor,
          title,
        },
      });

      if (error) {
        console.error(error);
        setErrors(["An error occurred. Please try again later"]);
      }
      if (data?.errorMessage) {
        setErrors([data.errorMessage]);
      }

      if (data?.copilot?.id) {
        const queryParams = new URLSearchParams();

        queryParams.set("copilot-id", data.copilot.id);
        const queryString = queryParams.toString();

        navigate(`/?${queryString}`);
      }
    }
  };

  const handleModalLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modalLogin(`/copilots/${copilotId}`);
  };

  return (
    <div className="flex flex-row flex-wrap lg:justify-between justify-center py-8 px-4 mx-auto max-w-screen-xl h-full lg:py-16 gap-20">
      <div className="min-w-[450px]">
        <h2 className="mb-4 text-4xl font-semibold text-gray-900 dark:text-white">
          Build your copilot
        </h2>
        <p>Enter the URL of the website you want to demo with Copilot.</p>
        <p className="mb-10">
          We&apos;ll generate a Copilot for you to try out.
        </p>
        <form className="flex flex-col gap-2">
          <div className="mb-3">
            <label
              className="block text-gray-500 text-sm font-normal mb-2"
              htmlFor="url"
            >
              Your website URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-url-here.com"
              className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${copilotId ? "bg-gray-200 text-gray-400" : ""}`}
              disabled={!!copilotId}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-500 text-sm font-normal mb-2"
              htmlFor="name"
            >
              Your copilot&apos;s name
            </label>
            <input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Copilot"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm font-normal mb-2">
              Choose a color:
            </label>
            <div className="flex space-x-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-lg ${selectedColor === color ? "border-2" : "border-1"} ${selectedColor === color ? "border-blue-500" : "border-grey-500"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm font-normal mb-2">
              Or enter a custom color:
            </label>
            <input
              type="text"
              value={customColor}
              onChange={handleCustomColorChange}
              placeholder="#000000"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Error Container */}
          <div className="min-h-8">
            {errors.map((error) => (
              <p
                key={error}
                className="text-red-600 flex flex-row gap-2 items-center"
              >
                <MdError />
                {error}
              </p>
            ))}
          </div>
          {copilotId ? (
            <button
              onClick={(e) => handleModalLogin(e)}
              className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Claim my copilot
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
            <>
              <button
                onClick={(e) => onSubmit(e)}
                className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Demo my Copilot
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
              <p className="text-center text-gray-400 text-sm">
                No Login Required!
              </p>
            </>
          )}
        </form>
      </div>
      <Copilot />
    </div>
  );
};

const validateForm = ({
  url,
  primaryColor,
}: {
  url: string;
  primaryColor: string;
}) => {
  if (!url) {
    return ["url is required"];
  }
  if (!primaryColor) {
    return ["color is required"];
  }

  return [];
};
