import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import supabase from "../clients/supabase";
import { useQuery } from "@tanstack/react-query";

export const Copilot = () => {
  // We search both searchParams and regular params to handle both home and copilot pages.
  const [searchParams] = useSearchParams();
  const paramsCopilotId = useParams().copilotId;
  const searchParamsCopilotId = searchParams.get("copilot-id");
  const copilotId = paramsCopilotId || searchParamsCopilotId;
  const hostId = "jzai-copilot-host";

  const {
    isPending: isCopilotPending,
    error: copilotError,
    data: copilot,
  } = useQuery({
    queryKey: ["copilot", copilotId],
    queryFn: async () =>
      await supabase.from("copilots").select("*").eq("id", copilotId!).single(),
    enabled: !!copilotId,
  });

  const resolvedCopilotId = copilot?.data?.id;
  const copilotHostId = `${hostId}-${resolvedCopilotId}`;

  const {
    isPending,
    error,
    data: scriptContent,
  } = useQuery({
    queryKey: ["copilot-bundle", resolvedCopilotId],
    queryFn: async () => {
      // This id prevents the browser from caching the file.
      const uniqueId = new Date().getTime();
      const file = await supabase.storage
        .from("bundles")
        .download(`${resolvedCopilotId!}?${uniqueId}`);
      const text = await file.data?.text();

      if (!text) throw "No text found in file";

      return text;
    },
    enabled: !!resolvedCopilotId,
  });

  useEffect(() => {
    const removeOldScript = () => {
      const currentScript = document.querySelector(
        `script[id="${copilotHostId}"]`,
      );

      if (currentScript) {
        document.body.removeChild(currentScript);
      }
    };

    if (scriptContent) {
      removeOldScript();

      // Create a new <script> element if it doesn't exist
      const script = document.createElement("script");

      script.type = "text/javascript";
      script.textContent = `(function() {${scriptContent}})();`;
      script.id = copilotHostId;

      // Append the <script> element to the document body
      document.body.appendChild(script);
    }

    return () => {
      removeOldScript();
    };
  }, [scriptContent, copilotHostId]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if (copilotError) return "An error has occurred: " + copilotError.message;

  return (
    <div id={copilotHostId} style={{ position: "relative" }}>
      {/* <div>{copilot.id}</div> */}
    </div>
  );
};
