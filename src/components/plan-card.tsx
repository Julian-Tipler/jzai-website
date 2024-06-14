import { Tables } from "../types/database.types";

const PlanCard = ({
  plan,
  children,
}: {
  plan: Tables<"plans">;
  children?: React.ReactNode;
}) => {
  return (
    <div
      key={plan.name}
      className="w-[325px] self-stretch p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 text-center"
    >
      <h2 className="text-lg font-normal">{plan.name}</h2>
      {plan.pricePerMessage && (
        <p className="text-2xl font-semibold my-2">
          {convertToPrice(plan.pricePerMessage)}
        </p>
      )}
      {/* <p className="text-sm mb-4 text-gray-500">{plan.renewal}</p> */}
      {children && children}
      <ul className="mt-4 text-left font-light">
        {plan.features?.map((feature, index) => {
          const feat = feature as Record<string, string>;

          return (
            <li key={index} className="mb-2 flex items-center">
              {feat?.available && feat.available ? (
                <span className="text-green-500 mr-2">✔</span>
              ) : (
                <span className="text-red-500 mr-2">✘</span>
              )}
              {feat.feature}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlanCard;

function convertToPrice(number: number): string {
  const dollars = (number / 10000).toFixed(3);

  return `$${dollars}`;
}
