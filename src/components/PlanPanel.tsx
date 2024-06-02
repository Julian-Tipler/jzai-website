import Plan from "../types/plan";

const PlanPanel = ({
  plan,
  children,
}: {
  plan: Plan;
  children?: React.ReactNode;
}) => {
  return (
    <div
      key={plan.name}
      className="w-[325px] self-stretch p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 text-center"
    >
      <h2 className="text-lg font-normal">{plan.name}</h2>
      <p className="text-2xl font-semibold my-2">
        {convertToPrice(plan.pricePerMessage)}
      </p>
      {/* <p className="text-sm mb-4 text-gray-500">{plan.renewal}</p> */}
      {children && children}
      <ul className="mt-4 text-left font-light">
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
  );
};

export default PlanPanel;

function convertToPrice(number: number): string {
  const dollars = (number / 10000).toFixed(3);

  return `$${dollars}`;
}
