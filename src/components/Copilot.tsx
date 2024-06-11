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
        .download(`${resolvedCopilotId!}.js?${uniqueId}`);
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

  if (error) return "An error has occurred: " + error.message;
  if (copilotError) return "An error has occurred: " + copilotError.message;

  if (isPending) {
    return (
      <div className="absolute flex justify-center items-center h-full w-full">
        <svg
          className="animate-spin h-10 w-10 text-primary-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div id={copilotHostId} style={{ position: "relative" }}>
      {/* <div>{copilot.id}</div> */}
    </div>
  );
};
