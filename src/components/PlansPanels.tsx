import { useState, useEffect } from "react";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";

type Plan = {
  id: string;
  name: string;
  code: string;
  pricePerMessage: number;
  features: {
    available: boolean;
    feature: string;
  }[];
};

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
  console.log("PLANS", plans);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center space-x-4 mb-8">
        {plans.map((plan: Plan) => (
          <div
            key={plan.name}
            className={` p-6 rounded-lg text-center ${plan.name === "platinum" ? "bg-red-100" : "bg-white"}`}
          >
            <h2 className="text-lg font-bold">{plan.name}</h2>
            <p className="text-2xl font-bold my-2">
              {`${convertToPrice(plan.pricePerMessage)} / message`}
            </p>
            {/* <p className="text-xs text-gray-500 my-2">
              (estimated 1000 credits per message)
            </p> */}
            <p className="text-sm mb-4">Cancel any time</p>
            <button
              onClick={() => selectPlan(plan)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Select Plan
            </button>
            <ul className="mt-4 text-left">
              {plan.features.map((feature, index: number) => (
                <li key={index} className="mb-2 flex items-center">
                  {feature.available ? (
                    <span className="text-green-500 mr-2">✔</span>
                  ) : (
                    <span className="text-red-500 mr-2">✘</span>
                  )}
                  {feature.feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
    </div>
  );
};

function convertToPrice(number: number): string {
  const dollars = (number / 10000).toFixed(3);

  return `$${dollars}`;
}
