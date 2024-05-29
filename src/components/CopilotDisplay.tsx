import { useState } from "react";
import { Tables } from "../types/database.types";
import supabase from "../clients/supabase";
import { redirect } from "react-router-dom";

export const CopilotDisplay = ({
  copilot,
}: {
  copilot: Tables<"copilots">;
}) => {
  const [editField] = useState<string | null>(null);
  const [inputValue] = useState<string>("");

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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Copilot Display</h1>
      {["title", "primaryColor"].map((field) => (
        <div key={field} className="mb-4 flex items-center">
          <div className="w-1/3 font-medium capitalize">{field}</div>
          <div className="flex-grow">
            <input
              type="text"
              value={inputValue}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          {editField === field ? (
            <button className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
              Save
            </button>
          ) : (
            <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          )}
        </div>
      ))}
      <div className="mb-4 flex items-center">
        <div className="w-1/3 font-medium">Credits Remaining</div>
        <div className="flex-grow">{copilot.credits}</div>
      </div>
      <button className={"text-red-500"} onClick={cancelSubscription}>
        Cancel
      </button>
    </div>
  );
};
