"use client";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  const { token, done } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (done) {
      if (!token) {
        router.push("/login");
      }
    }
  }, [token, router, done]);

  if (!token) {
    return null;
  }
  return <main>{children}</main>;
}
