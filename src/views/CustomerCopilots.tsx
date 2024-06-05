import supabase from "../clients/supabase";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "../types/database.types";
import WiseLink from "../components/WiseLink";

export const CustomerCopilots = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["copilots"],
    queryFn: async () =>
      await supabase.functions.invoke("copilots", {
        method: "GET",
      }),
  });

  const copilots = (data?.data?.copilots as Tables<"copilots">[]) || [];

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {copilots?.length < 1 && (
        <div className="flex flex-col items-center justify-center my-40">
          <h2 className="mb-4 text-2xl font-light text-gray-900 dark:text-white leading-tight">
            No copilots yet
          </h2>
          <WiseLink to="/copilots/create">Create a new copilot</WiseLink>
        </div>
      )}
      {copilots?.map((copilot) => (
        <Link key={copilot.id} to={`/copilots/${copilot.id}`}>
          <p>{copilot.baseUrl}</p>
        </Link>
      ))}
    </div>
  );
};
