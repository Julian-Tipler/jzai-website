import Plan from "../types/plan";
import { baseUrl } from "./base-url";

export const PLANS: Plan[] = [
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
    code: "gold",
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
    code: "platinum",
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
