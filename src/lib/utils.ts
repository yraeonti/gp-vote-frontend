import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryKey } from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getQueryFunc({ queryKey }: { queryKey: QueryKey }) {
  const [key, token] = queryKey as string[];
  const response = await fetch(key, {
    headers: {
      Authorization: token,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
