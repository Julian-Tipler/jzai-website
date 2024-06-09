import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import supabase from "../clients/supabase";
import { Copilot } from "./Copilot";
import { Tables } from "../types/database.types";
import { useLoginContext } from "../contexts/LoginContext";
import { MdError } from "react-icons/md";
import Button from "./Button";

export const CopilotForm = ({ webUrl = "" }: { webUrl?: string }) => {
  const [url, setUrl] = useState(webUrl);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setUrl(webUrl), [webUrl]);

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
    setIsLoading(true);
    const errors = validateForm({ url, primaryColor });

    if (errors.length > 0) {
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const handleModalLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modalLogin(`/copilots/${copilotId}`);
  };

  return (
    <div className="gap-24 py-16 px-4 mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 lg:py-36 lg:px-6">
      <div className="flex flex-col justify-center text-center items-center lg:items-start lg:text-start">
        <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white">
          Build your copilot
        </h2>
        <p className="mb-2 text-gray-500 dark:text-gray-400 font-light">
          Enter your website url.
        </p>
        <p className="mb-10 text-gray-500 dark:text-gray-400 font-light">
          In less than a minute we&apos;ll generate a Copilot for you.
        </p>
        <form className="flex flex-col gap-2 w-4/5">
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
              className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${copilotId ? "bg-gray-200 text-gray-400" : ""}`}
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
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleColorChange(color);
                  }}
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
              <Button onClick={(e) => onSubmit(e)} loading={isLoading}>
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
              </Button>
              <p className="text-center text-gray-400 text-sm font-light">
                No Login Required!
              </p>
            </>
          )}
        </form>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative min-h-[610px] min-w-[360px] flex justify-end items-end">
          <Copilot />
          {!copilotId && (
            <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg"></div>
          )}
        </div>
      </div>
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
