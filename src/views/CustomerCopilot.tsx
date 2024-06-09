import React, { useEffect, useState } from "react";
import { PlansPanels } from "../components/PlansPanels";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { useParams } from "react-router-dom";
import { CopilotDisplay } from "../components/CopilotDisplay";
import { FaChevronRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { fetchCopilot } from "../loaders/copilot-loader";

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
      <CopilotDisplay copilot={data} />
      {/* )} */}
    </div>
  );
};
