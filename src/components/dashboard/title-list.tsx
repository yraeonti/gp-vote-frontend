"use client";
import { useAuthContext } from "@/context/auth-context";
import { apiUrl } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getQueryFunc } from "@/lib/utils";

export default function TitleList() {
  const { token } = useAuthContext();

  const { data, error } = useQuery({
    queryKey: [apiUrl("/title"), token],
    queryFn: getQueryFunc,
  });

  return (
    <div className="text-black mt-4 space-y-5">
      {data && data.length > 0 ? (
        data.map((dat: { title: string }, i: number) => (
          <div
            key={i}
            className="border border-gray-200 flex gap-5 p-3 shadow w-fit rounded-md"
          >
            <span>Title:</span>
            <p>{dat.title}</p>
          </div>
        ))
      ) : (
        <h3>No Titles Added</h3>
      )}
    </div>
  );
}
