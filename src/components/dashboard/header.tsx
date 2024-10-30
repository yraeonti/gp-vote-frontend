"use client";
import { useAuthContext } from "@/context/auth-context";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Header() {
  const { logOut } = useAuthContext();

  return (
    <header className="h-20 shadow-lg border border-gray-300 p-6 flex items-center justify-between">
      {/* <h2>Dashboard</h2> */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 cursor-pointer fill-red-500"
        onClick={() => logOut()}
      >
        <path
          fillRule="evenodd"
          d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>

      <ConnectButton showBalance={false} />
    </header>
  );
}