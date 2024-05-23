import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { useQuery } from "@tanstack/react-query";

export const Copilot = () => {
  const [copilot, setCopilot] = useState<Tables<"copilots"> | null>(null);
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilot-id");

  const { isPending, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const file = await supabase.storage
        .from("bundles")
        .download("copilot.js");
      const text = await file.data?.text();

      const existingScript = document.querySelector('script[src="copilot.js"]');

      if (existingScript) {
        existingScript.parentNode?.removeChild(existingScript);
      }

      if (text) {
        // Create a <script> element
        const script = document.createElement("script");

        script.type = "text/javascript";
        script.textContent = text;

        // Append the <script> element to the document body
        document.body.appendChild(script);
      }

      return null;
    },
    enabled: !copilotId || !copilot,
  });

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

      fetchCopilot()
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }, [copilotId]);

  if (!copilotId || !copilot) {
    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
      <div id="jzai-copilot-host" style={{ position: "relative" }}>
        Example Copilot Here
      </div>
    );
  }
};
