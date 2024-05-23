import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../clients/supabase";

export const Copilot = () => {
  const [copilot, setCopilot] = useState<any>({});
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilot-id");

  useEffect(() => {
    if (copilotId) {
      const fetchCopilot = async () => {
        const { data, error } = await supabase
          .from("copilots")
          .select("*")
          .eq("id", copilotId)
          .single();
        if (error) {
          console.error("Error fetching copilot", error);
        }
        if (data) {
          setCopilot(data);
        }
      };
      fetchCopilot();
    }
  }, [copilotId]);

  if (!copilotId) return <div>Example Copilot Here</div>;
  return <div>Copilot ID:{copilot.id}</div>;
};
