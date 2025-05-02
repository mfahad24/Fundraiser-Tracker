import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    //@ts-ignore
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            values: [
              [],
              [
                "",
                "4000",
                "4000",
                "5000",
                "Organization Fundraiser",
                "Expansion",
                "We’re raising money to expand our headquarters so that we may support more people.",
                "Thank you for your support!",
                "red",
              ],
            ],
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders Loading spinner", async () => {
    render(<App />);

    const loading = screen.getByText(/Loading/i);
    expect(loading).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByRole("spinner")).not.toBeInTheDocument()
    );
  });

  test("renders title", async () => {
    render(<App />);

    const title = await screen.findByText(/Organization Fundraiser/i);
    expect(title).toBeInTheDocument();
  });

  test("renders subtitle", async () => {
    render(<App />);

    const subtitle = await screen.findByText(/Expansion/i);
    expect(subtitle).toBeInTheDocument();
  });

  test("renders description", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            values: [
              [],
              [
                "",
                "1000",
                "1000",
                "5000",
                "Organization Fundraiser",
                "Expansion",
                "We’re raising money to expand our headquarters so that we may support more people.",
                "Thank you for your support!",
                "red",
              ],
            ],
          }),
      })
    );

    render(<App />);

    const description = await screen.findByText(
      /We’re raising money to expand our headquarters so that we may support more people./i
    );
    expect(description).toBeInTheDocument();
  });

  test("renders donated amount", async () => {
    render(<App />);

    const donated = await screen.findByText("$4,000 Donated");
    expect(donated).toBeInTheDocument();
  });

  test("renders goal amount", async () => {
    render(<App />);

    const goal = await screen.findByText("Goal $5,000");
    expect(goal).toBeInTheDocument();
  });

  test("renders thank you message", async () => {
    render(<App />);

    const thankYou = await screen.findByText("Thank you for your support!");
    expect(thankYou).toBeInTheDocument();
  });

  test("renders negative balance text", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            values: [
              [],
              [
                "",
                "-1000",
                "-1000",
                "5000",
                "Organization Fundraiser",
                "Expansion",
                "We’re raising money to expand our headquarters so that we may support more people.",
                "Thank you for your support!",
                "red",
              ],
            ],
          }),
      })
    );

    render(<App />);

    const negativeBalanceMsg = await screen.findByText(
      "Please check your sheet. Your donated balance is negative."
    );
    expect(negativeBalanceMsg).toBeInTheDocument();
  });

  test("renders negative balance text", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            values: [
              [],
              [
                "",
                "5000",
                "5000",
                "5000",
                "Organization Fundraiser",
                "Expansion",
                "We’re raising money to expand our headquarters so that we may support more people.",
                "Thank you for your support!",
                "red",
              ],
            ],
          }),
      })
    );

    render(<App />);

    const goalAchieved = await screen.findByText("Goal of $5,000 achieved!");
    expect(goalAchieved).toBeInTheDocument();
  });
});
