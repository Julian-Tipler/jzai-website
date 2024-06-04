import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../clients/supabase";
import { useQuery } from "@tanstack/react-query";

export const Copilot = () => {
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilot-id");
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

  const resolvedCopilotId = copilot?.data?.id || copilotId;
  const copilotHostId = resolvedCopilotId
    ? `${hostId}-${resolvedCopilotId}`
    : hostId;
  // If no resolvedCopilotId then just get the default copilot.js
  const bundleId = resolvedCopilotId ? `${resolvedCopilotId}.js` : "copilot.js";

  const {
    isPending,
    error,
    data: scriptContent,
  } = useQuery({
    queryKey: ["copilot-bundle", resolvedCopilotId],
    queryFn: async () => {
      const file = await supabase.storage.from("bundles").download(bundleId);

      return await file.data?.text();
    },
    enabled: !isCopilotPending || !copilotId,
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
