import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import supabase from "../../clients/supabase";
import { CopilotDisplay } from "../../components/CopilotDisplay";
import { Tables } from "../../types/database.types";
import { useLoginContext } from "../../contexts/LoginContext";
import { MdError } from "react-icons/md";
import CopilotForm from "../../components/CopilotForm";
import Button from "../../components/Button";
import { ROUTES, COLORS } from "../../helpers/constants";
import { useAuthContext } from "../../contexts/AuthContext";

export const BuildCopilotSection = ({ webUrl = "" }: { webUrl?: string }) => {
  const { session } = useAuthContext();
  const [url, setUrl] = useState(webUrl);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const copilotId = searchParams.get("copilot-id");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [customColor, setCustomColor] = useState("");
  const primaryColor = selectedColor || customColor;

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
    setLoading(true);
    const errors = validateForm({ url, primaryColor });

    if (errors.length > 0) {
      setLoading(false);
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
        setLoading(false);
        console.error(error);
        setErrors(["An error occurred. Please try again later"]);
      }

      if (data?.errorMessage) {
        setLoading(false);
        setErrors([data.errorMessage]);
      }

      if (data?.copilot?.id) {
        setLoading(false);
        const queryParams = new URLSearchParams();

        queryParams.set("copilot-id", data.copilot.id);
        const queryString = queryParams.toString();

        navigate(`/?${queryString}`);
      }
    }
  };

  const claimCopilot = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // If the user is logged in, navigate to the copilot dashboard
    if (session) {
      navigate(`${ROUTES.dashboard.copilots.path}/${copilotId}`);
    } else {
      // Otherwise, open the login modal
      modalLogin(`${ROUTES.dashboard.copilots.path}/${copilotId}`);
    }
  };

  return (
    <div className="gap-24 py-16 px-4 mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 lg:py-36 lg:px-6">
      <div className="flex flex-col justify-center text-center items-center lg:items-start lg:text-start">
        <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white">
          Build your copilot
        </h2>
        <p className="mb-1 text-gray-500 dark:text-gray-400 font-light">
          1. Generate your copilot in seconds.
        </p>
        <p className="mb-8 text-gray-500 dark:text-gray-400 font-light">
          2. Ask it questions about your website.
        </p>
        <form className="flex flex-col gap-2 w-4/5">
          <CopilotForm
            url={url}
            setUrl={setUrl}
            title={title}
            setTitle={setTitle}
            handleColorChange={handleColorChange}
            handleCustomColorChange={handleCustomColorChange}
            selectedColor={selectedColor}
            customColor={customColor}
            predefinedColors={COLORS}
            copilotId={copilotId}
          />
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
              onClick={(e) => claimCopilot(e)}
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
              <Button
                onClick={(e) => onSubmit(e)}
                loading={loading}
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
              </Button>
              <p className="text-center text-gray-600 text-sm font-light">
                No Login Required!
              </p>
            </>
          )}
        </form>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative min-h-[610px] min-w-[360px] flex justify-end items-end">
          {copilotId && <CopilotDisplay />}
          {!copilotId && (
            <>
              <div className="absolute inset-[-5px] bg-white bg-opacity-20 backdrop-blur-sm rounded-lg"></div>
              <img
                src="/copilot.png"
                alt="Picture of a copilot"
                width={470}
                loading="lazy"
              />
            </>
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
