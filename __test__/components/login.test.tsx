import { render, screen } from "@testing-library/react";
import Login from "@/components/auth/login";
import { useRouter } from "next/navigation";
import { Mock } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe("Login", () => {
  beforeAll(() => {
    const router = useRouter();
  });
  it("should display validation message for invalid email in input field", async () => {
    const user = userEvent.setup();

    render(<Login />);

    const error_message = /Please provide valid Email/i;

    const emailInput = screen.getByLabelText(/email/i);

    const button = screen.getByRole("button");

    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.type(emailInput, "peter");

    expect(emailInput).toHaveValue("peter");

    await user.click(button);

    expect(screen.getByText(error_message)).toBeInTheDocument();
  });

  it("should display validation message for invalid password length in input field", async () => {
    const user = userEvent.setup();

    render(<Login />);

    const error_message = /Password has to be 6 or more characters/i;

    const input = screen.getByLabelText(/password/i);

    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.type(input, "1234");

    expect(input).toHaveValue("1234");

    await user.click(button);

    expect(screen.getByText(error_message)).toBeInTheDocument();
  });

  it("should not display any error values when input values are valid", async () => {
    const user = userEvent.setup();

    const validInput = { email: "test@gmail.com", password: "123456" };

    const email_error_message = /Please provide valid Email/i;
    const password_error_message = /Password has to be 6 or more characters/i;

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    const button = screen.getByRole("button");

    await user.type(emailInput, validInput.email);
    await user.type(passwordInput, validInput.password);

    await user.click(button);

    expect(screen.queryByText(email_error_message)).not.toBeInTheDocument();
    expect(screen.queryByText(password_error_message)).not.toBeInTheDocument();
  });
});
