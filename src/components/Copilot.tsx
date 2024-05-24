import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../clients/supabase";
import productionSupabase from "../clients/productionSupabase";
import { Tables } from "../types/database.types";
import { useQuery } from "@tanstack/react-query";

export const Copilot = () => {
  const [copilot, setCopilot] = useState<Tables<"copilots"> | null>(null);
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilot-id");
  const hostId = copilotId
    ? `jzai-copilot-host-${copilotId}`
    : "jzai-copilot-host";

  const { isPending, error } = useQuery({
    queryKey: ["copilotBundle", copilotId],
    queryFn: async () => {
      const bundleId = copilotId ? `${copilotId}.js` : "copilot.js";
      const file = await productionSupabase.storage
        .from("bundles")
        .download(bundleId);
      const text = await file.data?.text();

      const existingScript = document.querySelector(
        'script[id="copilot-script"]',
      );

      if (existingScript) {
        existingScript.parentNode?.removeChild(existingScript);
      }

      if (text) {
        // Create a <script> element
        const script = document.createElement("script");

        script.id = "copilot-script";

        // script.src = "copilot.js";

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
      <div id={hostId} style={{ position: "relative" }}>
        Example Copilot Here
      </div>
    );
  }
};
