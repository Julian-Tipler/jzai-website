import { ChangeEvent, useState } from "react";
import { Tables } from "../../../../types/database.types";
import supabase from "../../../../clients/supabase";
import { redirect, useParams } from "react-router-dom";
import { CopilotDisplay } from "../../../../components/copilot-display";
import CopilotForm from "../../../../components/copilot-form";
import { MdClose, MdEdit, MdError } from "react-icons/md";
import Button from "../../../../components/button";
import { ROUTES, COLORS } from "../../../../helpers/constants";
import { CodeSnippet } from "../../../../components/code-snippet";
import { CancelSubscriptionModal } from "./cancel-subscription-modal";
import Card from "../../../../components/card";

export const CopilotView = ({ copilot }: { copilot: Tables<"copilots"> }) => {
  const { copilotId } = useParams<{ copilotId: string }>();
  const [cancelSubscriptionModalOpen, setCancelSubscriptionModalOpen] =
    useState(false);
  const [url, setUrl] = useState(copilot.baseUrl);
  const [title, setTitle] = useState(copilot.title ?? "Copilot");
  const [errors, setErrors] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);
  const isCustomColor = !COLORS.map((color) => color.hex).includes(
    copilot.primaryColor,
  );
  const [selectedColor, setSelectedColor] = useState(
    isCustomColor ? COLORS[0].hex : copilot.primaryColor,
  );
  const [customColor, setCustomColor] = useState(
    isCustomColor ? copilot.primaryColor : "",
  );
  const primaryColor = selectedColor || customColor;
  const downloadUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/bundles/${copilotId}.js`;

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
        copilotId: copilotId,
      },
    });
    redirect(ROUTES.dashboard.copilots.path);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateForm({ url, primaryColor });

    if (errors.length > 0) {
      setErrors(errors);

      return;
    } else {
      setErrors([]);

      const body = {
        copilotId: copilotId,
        primaryColor,
        title,
      };

      const { data, error } = await supabase.functions.invoke("copilots", {
        method: "PUT",
        body,
      });

      if (error) {
        console.error(error);
        setErrors(["An error occurred. Please try again later"]);
      }

      if (data?.errorMessage) {
        setErrors([data.errorMessage]);
      }

      window.location.reload();
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
      <CancelSubscriptionModal
        open={cancelSubscriptionModalOpen}
        setOpen={setCancelSubscriptionModalOpen}
        cancel={cancelSubscription}
      />
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Card>
            <div className="flex flex-col justify-center text-center items-center lg:items-start lg:text-start">
              <div className="flex mb-6 w-full justify-between items-start">
                <div className="flex flex-col">
                  <h2 className="mb-4 text-2xl font-normal text-gray-900 dark:text-white">
                    Copilot Options
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 font-light">
                    Edit your copilot and see changes in real-time.
                  </p>
                </div>
                {edit ? (
                  <button
                    onClick={() => setEdit(false)}
                    aria-label="Stop editing copilot"
                  >
                    <MdClose size={24} />
                  </button>
                ) : (
                  <button
                    onClick={() => setEdit(true)}
                    aria-label="Edit copilot"
                  >
                    <MdEdit size={24} />
                  </button>
                )}
              </div>
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
                  predefinedColors={COLORS}
                  copilotId={copilot.id}
                  urlIsReadOnly={true}
                  allReadyOnly={!edit}
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
                {edit && (
                  <Button className="w-full" onClick={onSubmit}>
                    Save Changes
                  </Button>
                )}
              </form>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col">
              <h3 className="mb-4 text-xl font-normal text-gray-900 dark:text-white">
                Code Snippet
              </h3>
              <p className="mb-6 text-gray-500 dark:text-gray-400 font-light">
                Paste the following code snippet into the
                {" <head>"} tag of your index.html file to add your copilot to
                your website.
              </p>
              <CodeSnippet codeStr={downloadUrl} />
            </div>
          </Card>
        </div>
        <div className="flex justify-center items-center">
          <div className="min-h-[610px] min-w-[360px] flex justify-end items-end relative">
            <CopilotDisplay />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 my-20">
        <hr />
        <div className="flex justify-center">
          <Button
            className="bg-red-700 hover:bg-red-900 w-1/4"
            onClick={() => setCancelSubscriptionModalOpen(true)}
          >
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};
