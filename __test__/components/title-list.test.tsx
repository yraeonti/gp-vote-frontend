import { render, screen } from "@testing-library/react";
import { TitleList } from "@/components/dashboard/title-list";
import userEvent from "@testing-library/user-event";

const deleteTitle = vi.fn();

describe("TitleList", () => {
  it("should display 'No Titles Added' when data is null", async () => {
    const user = userEvent.setup();

    const data = null;

    render(
      <TitleList data={data} deleteTitle={deleteTitle} isConnected={true} />
    );

    expect(screen.getByText(/No Titles/i)).toBeInTheDocument();
  });

  it("should display 'No Titles Added' when data is an empty array", async () => {
    const user = userEvent.setup();

    const data: [] = [];

    render(
      <TitleList data={data} deleteTitle={deleteTitle} isConnected={true} />
    );

    expect(screen.getByText(/No Titles/i)).toBeInTheDocument();
  });

  it("should render list with title when data array is not empty", async () => {
    const data = [
      {
        title: "New title 1",
        uuid: "2354326rfgj24354576",
      },
      {
        title: "New title 2",
        uuid: "78hgjklhfdrtghfbhj",
      },
    ];

    render(
      <TitleList data={data} deleteTitle={deleteTitle} isConnected={true} />
    );

    data.forEach((dat) => {
      const title = screen.getByText(dat.title);
      expect(title).toBeInTheDocument();
    });
  });

  it("should display alert if trash icon is clicked and wallet is not connected", async () => {
    const user = userEvent.setup();
    const data = [
      {
        title: "New title 1",
        uuid: "2354326rfgj24354576",
      },
      {
        title: "New title 2",
        uuid: "78hgjklhfdrtghfbhj",
      },
    ];

    render(
      <TitleList data={data} deleteTitle={deleteTitle} isConnected={false} />
    );

    data.forEach(async () => {
      const deleteButton = screen.getAllByRole("delete");

      await user.click(deleteButton[0]);

      expect(screen.getByRole("alert", { hidden: true })).toBeInTheDocument();
    });
  });
});
