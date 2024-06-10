import supabase from "../clients/supabase";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "../types/database.types";
import WiseLink from "../components/WiseLink";
import Card from "../components/Card";
import { useAuthContext } from "../contexts/AuthContext";
import { WiseRoutes } from "../helpers/constants";
import ChatIcon from "../components/ChatIcon";

export const CustomerCopilots = () => {
  const { session } = useAuthContext();
  const { isPending, error, data } = useQuery({
    queryKey: ["copilots"],
    queryFn: async () =>
      await supabase
        .from("copilots")
        .select("*")
        .eq("userId", session!.user.id)
        .order("created", { ascending: false }),
    enabled: !!session?.user.id,
  });

  const copilots = (data?.data as Tables<"copilots">[]) || [];

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
          <WiseLink to={WiseRoutes.dashboard.copilots.create.name}>
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
            to={WiseRoutes.dashboard.copilots.create.name}
            className="absolute right-0 top-0 m-4"
          >
            Create a new copilot
          </WiseLink>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {copilots?.map((copilot) => (
          <Link key={copilot.id} to={`${copilot.id}`} className="w-full">
            <Card
              key={copilot.id}
              style={{ border: `1px solid ${copilot.primaryColor}` }}
              className="!p-3 w-1/2"
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
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </ul>
    </div>
  );
};
