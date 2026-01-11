import { render, screen } from "@testing-library/react";
import SearchCount from "./search-count";

describe("SearchCount", () => {
  test("shows 'No results' when count is 0", () => {
    render(<SearchCount count={0} searchText="test" />);
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  test("shows singular result for count of 1", () => {
    render(<SearchCount count={1} searchText="test" />);
    expect(screen.getByText("1 result")).toBeInTheDocument();
  });

  test("shows plural results for count greater than 1", () => {
    render(<SearchCount count={5} searchText="test" />);
    expect(screen.getByText("5 results")).toBeInTheDocument();
  });

  test("is hidden when searchText is empty", () => {
    render(<SearchCount count={5} searchText="" />);
    const output = screen.getByRole("status");
    expect(output).toHaveAttribute("data-visually-hidden", "true");
  });

  test("is visible when searchText has value", () => {
    render(<SearchCount count={5} searchText="quote" />);
    const output = screen.getByRole("status");
    expect(output).toHaveAttribute("data-visually-hidden", "false");
  });
});
