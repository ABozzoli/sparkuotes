import { render, screen } from "@testing-library/react";
import Label from "./label";

describe("Label", () => {
  test("renders label", () => {
    const text = "Text";
    render(<Label htmlFor="">{text}</Label>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("label text is correct", () => {
    const text = "Text";
    render(<Label htmlFor="">{text}</Label>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("required label shows asterisk", () => {
    /* prettier-ignore */
    render(<Label htmlFor="" required>Test</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("non-required label has no asterisk", () => {
    render(<Label htmlFor="">Test</Label>);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  test("label has 'for' attribute", () => {
    const text = "Text";
    render(<Label htmlFor="input-id">{text}</Label>);
    expect(screen.getByText(text)).toHaveAttribute("for", "input-id");
  });
});
