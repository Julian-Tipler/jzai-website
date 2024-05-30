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
      className={`self-stretch p-6 rounded-lg text-center ${plan.name === "platinum" ? "bg-red-100" : "bg-white"}`}
    >
      <h2 className="text-lg font-bold">{plan.name}</h2>
      <p className="text-2xl font-bold my-2">
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
