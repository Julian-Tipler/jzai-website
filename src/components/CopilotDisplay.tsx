import { useState } from "react";

type Copilot = {
  title: string;
  color: string;
  credits: number;
  plan: string;
};

export const CopilotDisplay = ({ copilot }: { copilot: Copilot }) => {
  const [editField] = useState<string | null>(null);
  const [inputValue] = useState<string>("");

  // const handleEdit = (field: string) => {};

  // const handleSave = () => {};

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  //AI generated garbage code, feel free to change. I just added it to show the idea
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Copilot Display</h1>
      {["title", "primaryColor", "plan"].map((field) => (
        <div key={field} className="mb-4 flex items-center">
          <div className="w-1/3 font-medium capitalize">{field}</div>
          {editField === field ? (
            <div className="flex-grow">
              <input
                type="text"
                value={inputValue}
                // onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
          ) : (
            <div className="flex-grow">{copilot[field as keyof Copilot]}</div>
          )}
          {editField === field ? (
            <button
              // onClick={handleSave}
              className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              // onClick={() => handleEdit(field)}
              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      ))}
      <div className="mb-4 flex items-center">
        <div className="w-1/3 font-medium">Credits Remaining</div>
        <div className="flex-grow">{copilot.credits}</div>
      </div>
    </div>
  );
};
