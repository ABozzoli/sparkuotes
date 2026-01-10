import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("Button", () => {
  test("renders button with text", () => {
    const text = "Text";
    render(<Button>{text}</Button>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("renders primary button", () => {
    render(<Button variant="primary">Text</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("primary");
  });

  test("renders secondary button", () => {
    render(<Button variant="secondary">Text</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("secondary");
  });

  test("button has correct type", () => {
    const type = "reset";
    render(<Button type={type}>Text</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", type);
  });

  test("button click works", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Text</Button>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalled();
  });

  test("button is disabled", () => {
    render(<Button disabled>Text</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
