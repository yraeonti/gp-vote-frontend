"use client";
import { useAuthContext } from "@/context/auth-context";
import { apiUrl } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getQueryFunc } from "@/lib/utils";
import { useAccount } from "wagmi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function Titles() {
  const { token, logOut } = useAuthContext();

  const { isConnected } = useAccount();

  const [titleData, setTitleData] = useState<
    null | { title: string; uuid: string }[]
  >(null);

  const { data, error } = useQuery({
    queryKey: [apiUrl("/title"), token],
    queryFn: getQueryFunc,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const deleteTitle = (id: string) => {
    const newdata =
      titleData && titleData.filter((dat: any) => dat.uuid !== id);
    setTitleData(newdata);
  };

  if (error) {
    if (error.message === "Unauthorized") {
      logOut();
    }
  }

  useEffect(() => {
    if (data) {
      setTitleData(data);
    }
  }, [data]);

  return (
    <TitleList
      data={titleData}
      deleteTitle={deleteTitle}
      isConnected={isConnected}
    />
  );
}

export const TitleList = ({
  data,
  deleteTitle,
  isConnected,
}: {
  data: { title: string; uuid: string }[] | [] | null;
  deleteTitle: (id: string) => void;
  isConnected: boolean;
}) => {
  return (
    <div className="text-black mt-4 space-y-5">
      {data && data.length > 0 ? (
        data.map((dat, i) => (
          <div
            key={i}
            className="flex items-center gap-2 border border-gray-200 shadow  w-fit rounded-md"
          >
            <div className="flex gap-5 overflow-hidden mx-2">
              <span>Title:</span>
              <p className="truncate ">{dat.title}</p>
            </div>

            <div className="bg-neutral-200 h-full border-l p-3 rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="delete"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 stroke-red-800 cursor-pointer"
                onClick={() => {
                  if (!isConnected) {
                    Swal.fire({
                      title: "Info!",
                      text: "Please Connect Wallet",
                      toast: true,
                      position: "top-end",
                      timer: 2800,
                    });

                    return;
                  }
                  deleteTitle(dat.uuid);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </div>
        ))
      ) : (
        <h3>No Titles Added</h3>
      )}
    </div>
  );
};
