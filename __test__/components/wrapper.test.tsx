import { render, screen } from "@testing-library/react";
import Wrapper from "@/components/dashboard/wrapper";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Mock, vi } from "vitest";

vi.mock("@/context/auth-context", () => ({
  useAuthContext: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Wrapper", () => {
  const mockRouterPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render children when token is present", () => {
    (useAuthContext as Mock).mockReturnValue({
      token: "mockToken",
      done: true,
    });

    render(
      <Wrapper>
        <div>Protected Content</div>
      </Wrapper>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("should redirect to login when token is absent", () => {
    (useAuthContext as Mock).mockReturnValue({
      token: null,
      done: true,
    });

    render(
      <Wrapper>
        <div>Protected Content</div>
      </Wrapper>
    );

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("should not render children if done is false", () => {
    (useAuthContext as Mock).mockReturnValue({
      token: null,
      done: false,
    });

    render(
      <Wrapper>
        <div>Protected Content</div>
      </Wrapper>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
