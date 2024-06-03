import { useState, useEffect } from "react";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";

import PlanPanel from "./PlanPanel";
import { MdError } from "react-icons/md";
import Plan from "../types/plan";

export const PlansPanels = ({ copilot }: { copilot: Tables<"copilots"> }) => {
  const { id: copilotId } = copilot;
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase.functions.invoke("plans", {
        method: "GET",
      });

      if (error) {
        setError("An error occured. Please try again later.");
      }

      if (data && data.plans) {
        setPlans(data.plans);
      }
    };

    fetchPlans();
  }, []);

  // Free plan
  const selectPlan = async (plan: Plan) => {
    if (plan.name === "free") {
      const { error } = await supabase.functions.invoke(
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
          <PlanPanel key={plan.name} plan={plan}>
            <button
              onClick={() => selectPlan(plan)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Select Plan
            </button>
          </PlanPanel>
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
