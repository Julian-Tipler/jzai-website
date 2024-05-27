import React, { useEffect, useState } from "react";
import { PlansPanels, Plan } from "../components/PlansPanels";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { CopilotDisplay } from "../components/CopilotDisplay";

export const CustomerCopilot: React.FC = () => {
  const [copilot, setCopilot] = useState<Tables<"copilots"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { copilotId } = useParams<{ copilotId: string }>();
  const { session } = useAuthContext();

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

  const selectPlan = async (plan: Plan) => {
    if (plan.code === "free") {
      const { data, error } = await supabase.functions.invoke(
        `copilots?copilotId=${copilotId}`,
        {
          method: "PATCH",
          body: {
            plan: plan.code,
          },
        },
      );

      if (error) {
        setError(
          "An error with selecting plan occured. Please try again later",
        );
      }
      if (data?.copilot) {
        setCopilot(data.copilot);
      }

      return;
    }
    // Open stripe tab

    window.open(
      plan.link + "?prefilled_email=" + session?.user.email,
      "_blank",
    );

    return;
  };

  if (!copilot) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      {!copilot.userId ? (
        <PlansPanels onSelect={selectPlan} />
      ) : (
        <CopilotDisplay copilot={copilot} />
      )}

      {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
    </div>
  );
};
