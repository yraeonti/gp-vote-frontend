import { render, screen } from "@testing-library/react";
import Header from "@/components/dashboard/header";
import { useAuthContext } from "@/context/auth-context";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Mock } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("@/context/auth-context", () => ({
  useAuthContext: vi.fn(),
}));

vi.mock("@rainbow-me/rainbowkit", () => ({
  ConnectButton: () => <div>Connect Wallet</div>,
}));

describe("Header", () => {
  const logOutMock = vi.fn();

  beforeEach(() => {
    (useAuthContext as Mock).mockReturnValue({
      logOut: logOutMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render a connect button", () => {
    render(<Header />);

    expect(screen.getByText(/connect/i)).toBeInTheDocument();
  });

  it("should invoke logout when power image clicked", async () => {
    const user = userEvent.setup();

    render(<Header />);

    const logoutB = screen.getByRole("logout");

    expect(logoutB).toBeInTheDocument();

    await user.click(logoutB);

    expect(logOutMock).toBeCalledTimes(1);
  });
});
