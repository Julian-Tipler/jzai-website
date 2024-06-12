import { MdError } from "react-icons/md";
import Button from "../components/Button";
import Card from "../components/Card";
import { Copilot } from "../components/Copilot";
import CopilotForm from "../components/CopilotForm";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Tables } from "../types/database.types";
import supabase from "../clients/supabase";
import { WiseRoutes, colors } from "../helpers/constants";

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
        navigate(`${WiseRoutes.dashboard.copilots.path}/${data.copilot.id}`);
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
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
        <Card>
          <div className="flex flex-col justify-center text-center items-center lg:items-start lg:text-start">
            <h2 className="mb-4 text-2xl font-normal text-gray-900 dark:text-white">
              Build your copilot
            </h2>
            <p className="mb-8 text-gray-500 dark:text-gray-400 font-light">
              Enter the URL of the website you want to demo with Copilot.
            </p>
            <form className="flex flex-col gap-2 w-full">
              <CopilotForm
                url={url}
                setUrl={setUrl}
                title={title}
                setTitle={setTitle}
                handleColorChange={handleColorChange}
                handleCustomColorChange={handleCustomColorChange}
                selectedColor={selectedColor}
                customColor={customColor}
                predefinedColors={colors}
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
              <Button className="w-full" onClick={onSubmit}>
                Save Changes
              </Button>
            </form>
          </div>
        </Card>
        <div className="flex justify-center items-center">
          <div className="min-h-[610px] min-w-[360px] flex justify-end items-end">
            <Copilot />
          </div>
        </div>
      </div>
    </div>
  );
};
