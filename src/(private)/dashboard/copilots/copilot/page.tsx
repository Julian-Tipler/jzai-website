import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CopilotView } from "./CopilotView";
import { fetchCopilot } from "../../../../loaders/copilot-loader";
import { PlansView } from "./PlansView";

export const CustomerCopilot: React.FC = () => {
  const { copilotId } = useParams<{ copilotId: string }>();

  const {
    isPending,
    error,
    data: copilot,
  } = useQuery({
    queryKey: ["copilot", copilotId],
    queryFn: () => fetchCopilot(copilotId!),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">{error.message}</div>
    );
  }

  return (
    <div>
      {!copilot.subscriptions?.length ? (
        <PlansView copilot={copilot} />
      ) : (
        <CopilotView copilot={copilot} />
      )}
    </div>
  );
};
