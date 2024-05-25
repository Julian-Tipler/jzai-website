export const Plans = ({ onSelect }: { onSelect: (plan: string) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-8">Choose your plan</h1>

      <div className="flex justify-center space-x-4 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => onSelect(plan.name)}
            className={`cursor-pointer p-6 rounded-lg text-center ${plan.name === "platinum" ? "bg-red-100" : "bg-white"}`}
          >
            <h2 className="text-lg font-bold">{plan.name}</h2>
            <p className="font-semibold">{plan.start}</p>
            <p className="text-2xl font-bold my-2">{plan.price}</p>
            <p className="text-sm mb-4">{plan.renewal}</p>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded">
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
    </div>
  );
};

const plans = [
  {
    name: "Free",
    price: "€0 / first month",
    renewal: "then €20 per month. Cancel anytime",
    start: "Start after registration",
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
    ],
  },
  {
    name: "Gold",
    price: "€35 / month",
    renewal: "Cancel anytime",
    start: "Start May 21",
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
    ],
  },
  {
    name: "Platinum",
    price: "€100 / month",
    renewal: "Cancel anytime",
    start: "Start May 3",
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
    ],
  },
];
