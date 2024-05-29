import React, { useEffect, useState } from "react";
import { Plans } from "../components/Plans";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { useParams } from "react-router-dom";

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

  const claimCopilot = async (plan: string) => {
    const { data, error } = await supabase.functions.invoke(
      `copilots?copilotId=${copilotId}`,
      {
        method: "PATCH",
        body: {
          plan,
        },
      },
    );

    if (error) {
      setError("An error with selecting plan occured. Please try again later");
    }

    if (data?.copilot) {
      setCopilot(data.copilot);
    }
  };

  if (!copilot) {
    return <div>Loading...</div>;
  }

  if (!copilot.id) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center mb-8 w-64">
          To claim your copilot, choose a plan:
        </h1>
        <Plans onSelect={claimCopilot} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div>
        <h1 className="text-2xl font-bold">{copilot.baseUrl}</h1>
        <p className="text-lg">{copilot.plan}</p>
      </div>
      {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
    </div>
  );
};
