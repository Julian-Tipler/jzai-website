import { MdError } from "react-icons/md";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../clients/supabase";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import CopilotForm from "../../../../components/CopilotForm";
import { ROUTES, COLORS } from "../../../../helpers/constants";
import { Tables } from "../../../../types/database.types";

export const CreateCopilot = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const predefinedColors = [
    "#0090FF",
    "#323232",
    "#5856fe",
    "#45AF96",
    "#F35353",
  ];
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);
  const [customColor, setCustomColor] = useState("");
  const primaryColor = selectedColor || customColor;
  const navigate = useNavigate();

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setCustomColor("");
  };

  const handleCustomColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    setCustomColor(color);
    setSelectedColor(color);
  };

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
        navigate(`${ROUTES.dashboard.copilots.path}/${data.copilot.id}`);
      }
    }
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

  return (
    <div>
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2 h-fit items-start">
        <Card className="h-fit">
          <div className="flex flex-col justify-center text-center items-center lg:items-start lg:text-start h-fit">
            <h2 className="mb-4 text-2xl font-normal text-gray-900 dark:text-white">
              Build your copilot
            </h2>
            <p className="mb-1 text-gray-500 dark:text-gray-400 font-light">
              1. Generate your copilot in seconds.
            </p>
            <p className="mb-8 text-gray-500 dark:text-gray-400 font-light">
              2. Ask it questions about your website.
            </p>
            <form className="flex flex-col gap-2 w-full h-full justify-between">
              <>
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
                  copilotId={null}
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
              </>
              <Button className="w-full" onClick={onSubmit}>
                Create
              </Button>
            </form>
          </div>
        </Card>
        <div className="flex justify-center items-center">
          <div className="lg:mt-[-35px] relative min-w-[360px] flex justify-end items-end overflow-hidden">
            <>
              <div className="absolute inset-[-15px] bg-primary-bg bg-opacity-20 backdrop-blur-sm rounded-lg"></div>
              <img
                src="/copilot-gray-bg.png"
                alt="Picture of a copilot"
                width={450}
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
