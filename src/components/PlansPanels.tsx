import { useState } from "react";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import PlanPanel from "./PlanPanel";
import { MdError } from "react-icons/md";
import Plan from "../types/plan";
import { PLANS } from "../helpers/constants";

export const PlansPanels = ({ copilot }: { copilot: Tables<"copilots"> }) => {
  const { id: copilotId } = copilot;
  const [error, setError] = useState<string | null>(null);

  // Free plan
  const selectPlan = async (plan: Plan) => {
    if (plan.code === "free") {
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
          plan: plan,
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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center space-x-4 mb-8">
        {PLANS.map((plan) => (
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
