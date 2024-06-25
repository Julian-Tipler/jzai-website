import React from "react";
import { useLocation } from "react-router-dom";

export const SuccessPage: React.FC = () => {
  // Get the query parameters from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const copilotId = queryParams.get("copilot-id");

  console.log(copilotId);
  // Construct the copilot dashboard link
  const dashboardLink = `/dashboard/copilots/${copilotId}`;

  return (
    <div className="flex flex-col items-center justify-center bg-green-100 p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Your purchase was successful!
      </h1>
      <p className="text-lg mb-6">
        Thank you for your purchase. You can access your copilot dashboard
        below.
      </p>
      <a
        href={dashboardLink}
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Go to your copilot dashboard
      </a>
    </div>
  );
};
