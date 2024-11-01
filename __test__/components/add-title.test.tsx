import { render, screen } from "@testing-library/react";
import { AddTitle } from "@/components/dashboard/add-title";
import userEvent from "@testing-library/user-event";

const title_error_message = "Title cannot be empty";

const onSubmit = vi.fn();

const setOpen = vi.fn();

describe("AddTitle", () => {
  it("Should not display form when modal is not open", async () => {
    render(
      <AddTitle
        onSubmit={onSubmit}
        open={false}
        isConnected={false}
        setOpen={setOpen}
      />
    );

    const button = screen.getByText("Add Title");

    const titleInput = screen.queryByLabelText(/title/i);

    expect(button).toBeInTheDocument();
    expect(titleInput).not.toBeInTheDocument();
  });

  it("should display alert if wallet is not connected when add title buuton is clicked", async () => {
    const user = userEvent.setup();

    render(
      <AddTitle
        onSubmit={onSubmit}
        open={false}
        isConnected={false}
        setOpen={setOpen}
      />
    );

    const button = screen.getByText("Add Title");

    await user.click(button);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getAllByRole("alert")).toHaveLength(1);
  });

  it("should display form modal when wallet is connected and open is true", async () => {
    const user = userEvent.setup();

    render(
      <AddTitle
        onSubmit={onSubmit}
        open={true}
        isConnected={true}
        setOpen={setOpen}
      />
    );

    expect(screen.getByRole("modal")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Title")).toBeInTheDocument();
  });

  it("should diplay error message when title is empty and the submit button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <AddTitle
        onSubmit={onSubmit}
        open={true}
        isConnected={true}
        setOpen={setOpen}
      />
    );

    const button = screen.getByText("Submit");

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText(title_error_message)).toBeInTheDocument();
  });

  it("should invoke onSubmit function, alert should be displayed if title field passes validation and wallet is not connected", async () => {
    const user = userEvent.setup();

    render(
      <AddTitle
        onSubmit={onSubmit}
        open={true}
        isConnected={false}
        setOpen={setOpen}
      />
    );

    const button = screen.getByText("Submit");

    const titleInput = screen.getByPlaceholderText("Enter Title");

    expect(button).toBeInTheDocument();

    await user.type(titleInput, "New Title");

    await user.click(button);

    expect(screen.queryByText(title_error_message)).not.toBeInTheDocument();

    expect(onSubmit).toHaveBeenCalledTimes(0);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getAllByRole("alert")).toHaveLength(1);
  });

  it("onSubmit function should be called if title field passes validation and wallet is connected", async () => {
    const user = userEvent.setup();

    render(
      <AddTitle
        onSubmit={onSubmit}
        open={true}
        isConnected={true}
        setOpen={setOpen}
      />
    );

    const button = screen.getByText("Submit");

    const titleInput = screen.getByPlaceholderText("Enter Title");

    expect(button).toBeInTheDocument();

    await user.type(titleInput, "New Title");

    await user.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
