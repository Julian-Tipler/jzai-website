import { ChangeEvent, useState } from "react";
import { Tables } from "../types/database.types";
import supabase from "../clients/supabase";
import { redirect } from "react-router-dom";
import { Copilot } from "./Copilot";
import CopilotForm from "./CopilotForm";
import { MdError } from "react-icons/md";
import Card from "./Card";
import Button from "./Button";

export const CopilotDisplay = ({
  copilot,
}: {
  copilot: Tables<"copilots">;
}) => {
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

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setCustomColor("");
  };

  const handleCustomColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    setCustomColor(color);
    setSelectedColor(color);
  };

  const cancelSubscription = async () => {
    await supabase.functions.invoke("stripe/cancel-subscription", {
      method: "POST",
      body: {
        copilotId: copilot.id,
      },
    });
    redirect("/copilots");
  };

  return (
    <div>
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
        <Card>
          <div className="flex flex-col justify-center text-center items-center lg:items-start lg:text-start">
            <h2 className="mb-4 text-2xl font-normal text-gray-900 dark:text-white">
              Edit your copilot
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
                predefinedColors={predefinedColors}
                copilotId={copilot.id}
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
              <Button className="w-full" onClick={cancelSubscription}>
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
      <div className="flex flex-col gap-20 my-20">
        <hr />
        <div className="flex justify-center">
          <Button
            className="bg-red-500 hover:bg-red-700 w-1/4"
            onClick={cancelSubscription}
          >
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};
