import { render, screen } from "@testing-library/react";
import SignUp from "@/components/auth/sign-up";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

beforeEach(() => {
  const router = useRouter();
});

const email_error_message = /Please provide valid Email/i;
const password_error_message = /Password has to be 6 or more characters/i;
const username_error_message = /name is required/i;

describe("SignUp", () => {
  it("should display validation message for invalid email in input field", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    const emailInput = screen.getByLabelText(/email/i);

    const button = screen.getByRole("button");

    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.type(emailInput, "jags");

    expect(emailInput).toHaveValue("jags");

    await user.click(button);

    expect(screen.getByText(email_error_message)).toBeInTheDocument();
  });

  it("should display validation message for invalid password length in input field", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    const input = screen.getByLabelText(/password/i);

    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.type(input, "3244");

    expect(input).toHaveValue("3244");

    await user.click(button);

    expect(screen.getByText(password_error_message)).toBeInTheDocument();
  });

  it("should display validation message for empty input username filed", async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    const input = screen.getByLabelText(/name/i);

    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText(username_error_message)).toBeInTheDocument();
  });

  it("should not display any error values when input values are valid", async () => {
    const user = userEvent.setup();

    const validInput = {
      email: "test@gmail.com",
      password: "123456",
      username: "john",
    };

    render(<SignUp />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const usernameInput = screen.getByLabelText(/name/i);

    const button = screen.getByRole("button");

    await user.type(emailInput, validInput.email);
    await user.type(passwordInput, validInput.password);
    await user.type(usernameInput, validInput.username);

    expect(screen.queryByText(email_error_message)).not.toBeInTheDocument();
    expect(screen.queryByText(password_error_message)).not.toBeInTheDocument();
    expect(screen.queryByText(username_error_message)).not.toBeInTheDocument();
  });
});
