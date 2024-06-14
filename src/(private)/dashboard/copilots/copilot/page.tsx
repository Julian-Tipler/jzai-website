import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CopilotView } from "./CopilotView";
import { fetchCopilot } from "../../../../loaders/copilot-loader";

export const CustomerCopilot: React.FC = () => {
  const { copilotId } = useParams<{ copilotId: string }>();

  const { isPending, error, data } = useQuery({
    queryKey: ["copilot", copilotId],
    queryFn: () => fetchCopilot(copilotId!),
    enabled: !!copilotId,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {/* {!copilot.subscriptions?.length ? (
        <PlansPanels copilot={copilot} />
      ) : ( */}
      <CopilotView copilot={data} />
      {/* )} */}
    </div>
  );
};
