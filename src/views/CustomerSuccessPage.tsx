import { Link, useSearchParams } from "react-router-dom";
import { baseUrl } from "../helpers/base-url";

export const CustomerSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilot-id");

  return (
    <div>
      <div>Success!</div>
      <div>
        View copilot
        <Link
          className="text-blue-500"
          to={baseUrl() + "/copilots" + `/${copilotId}`}
        >
          {" "}
          here
        </Link>
      </div>
    </div>
  );
};
