import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import supabase from "../../../clients/supabase";
import Card from "../../../components/Card";
import ChatIcon from "../../../components/ChatIcon";
import WiseLink from "../../../components/WiseLink";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ROUTES } from "../../../helpers/constants";
import { Tables } from "../../../types/database.types";

export const CustomerCopilots = () => {
  const { session } = useAuthContext();
  const { isPending, error, data } = useQuery({
    queryKey: ["copilots"],
    queryFn: async () =>
      await supabase
        .from("copilots")
        .select("*, subscriptions(*, plans(*))")
        .eq("userId", session!.user.id)
        .order("created", { ascending: false }),
    enabled: !!session?.user.id,
  });

  const copilots = data?.data || [];

  console.log(copilots);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (copilots?.length < 1) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-4 text-xl font-light text-gray-900 dark:text-white leading-tight">
            No copilots yet
          </h2>
          <WiseLink to={ROUTES.dashboard.copilots.create.name}>
            Create a new copilot
          </WiseLink>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex w-full justify-end">
        <div className="flex">
          <WiseLink
            to={ROUTES.dashboard.copilots.create.name}
            className="absolute right-0 top-0 m-4"
          >
            Create a new copilot
          </WiseLink>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {copilots?.map((copilot) => (
          <li key={copilot.id} className="w-1/2">
            <Link to={`${copilot.id}`}>
              <Card
                key={copilot.id}
                style={{ border: `1px solid ${copilot.primaryColor}` }}
                className="!p-3"
              >
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div
                      className="flex w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: copilot.primaryColor }}
                    >
                      <ChatIcon />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {copilot.title}
                      </h3>
                      <p className="text-gray-500 text-md font-normal">
                        {copilot.baseUrl}
                      </p>
                      {copilot.subscriptions?.length > 0 && (
                        <div className="flex gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Subscription:
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {copilot.subscriptions[0].plans?.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
