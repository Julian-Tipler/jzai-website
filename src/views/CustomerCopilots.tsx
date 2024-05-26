import { useEffect, useState } from "react";
import supabase from "../clients/supabase";
import { Tables } from "../types/database.types";
import { Link } from "react-router-dom";

export const CustomerCopilots = () => {
  const [copilots, setCopilots] = useState<Tables<"copilots">[]>([]);

  useEffect(() => {
    const fetchCopilot = async () => {
      const { data, error } = await supabase.functions.invoke("copilots", {
        method: "GET",
      });

      if (error) {
        console.error("Error fetching copilot", error);
      }
      if (data?.copilots) {
        setCopilots(data.copilots);
      }
    };

    fetchCopilot()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

  if (!copilots.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {copilots.map((copilot) => (
        <Link key={copilot.id} to={`/copilots/${copilot.id}`}>
          <p>{copilot.baseUrl}</p>
        </Link>
      ))}
    </div>
  );
};
