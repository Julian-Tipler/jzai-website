import React, { useEffect, useState } from "react";
import { PlansPanels } from "../components/PlansPanels";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { useParams } from "react-router-dom";
import { CopilotDisplay } from "../components/CopilotDisplay";

export const CustomerCopilot: React.FC = () => {
  const [copilot, setCopilot] = useState<Tables<"copilots"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { copilotId } = useParams<{ copilotId: string }>();

  useEffect(() => {
    const fetchCopilot = async () => {
      const { data, error } = await supabase.functions.invoke(
        `copilots/${copilotId}`,
        {
          method: "GET",
        },
      );

      if (error) {
        setError("An error occurred. Please try again later");
      }

      if (data?.copilot) {
        setCopilot(data.copilot);
      }
    };

    fetchCopilot();
  }, [copilotId]);

  if (!copilot) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8">
      {!copilot.userId ? (
        <PlansPanels copilot={copilot} />
      ) : (
        <CopilotDisplay copilot={copilot} />
      )}
    </div>
  );
};
