import { QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import supabase from "../clients/supabase";

export const fetchCopilot = async (copilotId: string) => {
  const { data: copilot, error } = await supabase
    .from("copilots")
    .select("*, subscriptions(*,plans(*))")
    .eq("id", copilotId)
    .order("createdAt", {
      referencedTable: "subscriptions",
      ascending: false,
    })
    .single();

  if (error) {
    throw new Error("Network response was not ok");
  }

  // Sorts the subscriptions by createdAt
  return copilot;
};

export const copilotLoader = async ({
  params,
  queryClient,
}: {
  params: Params<string>;
  queryClient: QueryClient;
}) => {
  const { copilotId } = params as { copilotId: string };

  return await queryClient.fetchQuery({
    queryKey: ["copilot", copilotId],
    queryFn: () => fetchCopilot(copilotId),
  });
};
