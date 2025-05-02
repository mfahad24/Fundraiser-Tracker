// App.test.tsx
import { render, screen } from "@testing-library/react";
import { vi } from "vitest"; // Assuming you're using Vitest
import NegativeBalance from "./NegativeBalance";

describe("NegativeBalance component", () => {
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

  test("renders negative balance message", async () => {
    render(<NegativeBalance />);

    const negativeBalanceMsg = screen.getByText(
      /Please check your sheet. Your donated balance is negative./i
    );
    expect(negativeBalanceMsg).toBeInTheDocument();
  });
});
