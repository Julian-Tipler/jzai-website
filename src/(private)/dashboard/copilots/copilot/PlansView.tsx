import supabase from "../../../../clients/supabase";
import { Tables } from "../../../../types/database.types";

import PlanCard from "../../../../components/PlanCard";
import { MdError } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const PlansView = ({ copilot }: { copilot: Tables<"copilots"> }) => {
  const { id: copilotId } = copilot;
  const [error, setError] = useState<string | null>(null);

  const {
    isPending,
    error: plansError,
    data,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () =>
      await supabase
        .from("plans")
        .select("*")
        .order("pricePerMessage", { ascending: true }),
    refetchOnMount: true,
  });

  const plans = data?.data ? data.data : [];

  // Free plan
  const selectPlan = async (plan: Tables<"plans">) => {
    if (plan.name === "free") {
      const { error } = await supabase.functions.invoke(
        `copilots?copilotId=${copilotId}`,
        {
          method: "PATCH",
          body: {
            plan: plan.id,
          },
        },
      );

      if (error) {
        setError(
          "An error with selecting plan occured. Please try again later",
        );
      }

      return;
    }

    // Paid plan
    const { data, error } = await supabase.functions.invoke(
      "stripe/create-checkout-session",
      {
        method: "POST",
        body: {
          planId: plan.id,
          copilotId,
        },
      },
    );

    if (error) {
      console.error("Error creating checkout session:", error);
    } else {
      const redirectUrl = data.redirectUrl;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("No redirect URL found in response.");
      }
    }

    return;
  };

  if (plans.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center space-x-4 mb-8">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan}>
            <button
              onClick={() => selectPlan(plan)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Select Plan
            </button>
          </PlanCard>
        ))}
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-center flex flex-row gap-2 items-center">
          <MdError />
          {error}
        </div>
      )}
    </div>
  );
};
