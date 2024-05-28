import { useState } from "react";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { baseUrl } from "../helpers/base-url";

export const PlansPanels = ({ copilot }: { copilot: Tables<"copilots"> }) => {
  const { id: copilotId } = copilot;
  const [error, setError] = useState<string | null>(null);

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

      // Need to handle recirecting to success page
      return;
    }
    // Open stripe tab

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
      console.log(data);
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
      <h1 className="text-2xl font-bold text-center mb-8 w-64">
        To claim your copilot, choose a plan:
      </h1>

      <div className="flex justify-center space-x-4 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={` p-6 rounded-lg text-center ${plan.name === "platinum" ? "bg-red-100" : "bg-white"}`}
          >
            <h2 className="text-lg font-bold">{plan.name}</h2>
            <p className="text-2xl font-bold my-2">{plan.price}</p>
            <p className="text-sm mb-4">{plan.renewal}</p>
            <button
              onClick={() => selectPlan(plan)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Select Plan
            </button>
            <ul className="mt-4 text-left">
              {plan.features.map((feature, index) => (
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

export type Plan = {
  name: string;
  code: string;
  successUrl: string;
  priceId: string | null;
  price: string;
  renewal: string;
  features: { feature: string; available: boolean }[];
};

const plans: Plan[] = [
  {
    name: "Free",
    code: "free",
    successUrl: "window.location.href" + "/success",
    priceId: null,
    price: "$0 / first month",
    renewal: "",
    features: [
      { feature: "1000 credits a month", available: true },

      {
        feature: "email warning when credits are expiring",
        available: true,
      },
      {
        feature: "customer service help",
        available: false,
      },
      {
        feature: "re-scrape website manually",
        available: false,
      },
      {
        feature: "max website size of 40 pages",
        available: false,
      },
    ],
  },
  {
    name: "Gold",
    code: "silver",
    successUrl: baseUrl() + "/success",
    priceId: import.meta.env.VITE_GOLD_PRICE_ID,
    price: "$10 / month",
    renewal: "Cancel anytime",
    features: [
      { feature: "10000 credits a month", available: true },

      {
        feature: "email warning when credits are expiring",
        available: true,
      },
      {
        feature: "customer service help",
        available: true,
      },
      {
        feature: "re-scrapes your website once a day",
        available: true,
      },
      {
        feature: "max website size of 200 pages",
        available: true,
      },
    ],
  },
  {
    name: "Platinum",
    code: "gold",
    successUrl: baseUrl() + "/success",
    priceId: import.meta.env.VITE_PLATINUM_PRICE_ID,
    price: "$20 / month",
    renewal: "Cancel anytime",
    features: [
      { feature: "100000 credits a month", available: true },

      {
        feature: "email warning when credits are expiring",
        available: true,
      },
      {
        feature: "customer service help",
        available: true,
      },
      {
        feature: "re-scrapes your website 5x a day",
        available: true,
      },
      {
        feature: "max website size of 1000 pages",
        available: true,
      },
    ],
  },
];
