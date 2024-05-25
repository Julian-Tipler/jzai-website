import React, { useEffect, useState } from "react";
import { Plans } from "../components/Plans";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { useParams } from "react-router-dom";

export const CustomerCopilot: React.FC = () => {
  const [copilot, setCopilot] = useState<Tables<"copilots"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ...

  const { copilotId } = useParams<{ copilotId: string }>();

  useEffect(() => {
    const fetchCopilot = async () => {
      const { data, error } = await supabase.functions.invoke(
        `copilots?copilotId=${copilotId}`,
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

  const claimCopilot = async (plan: string) => {
    const { data, error } = await supabase.functions.invoke("copilots", {
      method: "PUT",
      body: {
        copilotId: copilot?.id,
        plan,
      },
    });

    if (error) {
      setError("An error occurred. Please try again later");
    }

    if (data?.copilot) {
      setCopilot(data.copilot);
    }
  };
  // Select plan which sends an "edit" copilot call
  // hold the copilot object in state. if the copilot has a user and a plan, then show the generate button

  if (!copilot) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      {!copilot.userId ? (
        <Plans onSelect={claimCopilot} />
      ) : (
        <div>The actual copilot</div>
      )}

      {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
    </div>
  );
};
