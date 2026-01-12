import { render, screen } from "@testing-library/react";
import Input from "./input";

describe("Input", () => {
  test("input has label", () => {
    const label = "Label";
    render(<Input label={label} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  test("input is required", () => {
    const label = "Label";
    render(<Input label={label} required />);
    /* "exact" flag needed to avoid matching the asterisk added for required fields */
    expect(screen.getByLabelText(label, { exact: false })).toBeRequired();
  });

  test("input has placeholder", () => {
    const placeholder = "Placeholder";
    render(<Input label="Test" placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test("single line input", () => {
    const label = "Label";
    render(<Input label={label} />);
    expect(screen.getByLabelText(label).tagName).toBe("INPUT");
  });

  test("multiline input", () => {
    const label = "Label";
    render(<Input label={label} multiline />);
    expect(screen.getByLabelText(label).tagName).toBe("TEXTAREA");
  });

  test("input has correct type", () => {
    const label = "Label";
    const type = "password";
    render(<Input label={label} type={type} />);
    expect(screen.getByLabelText(label)).toHaveAttribute("type", type);
  });

  test("displays hint text", () => {
    const hint = "This is a hint";
    render(<Input label="Test" hint={hint} />);
    expect(screen.getByText(hint)).toBeInTheDocument();
  });

  test("displays error text", () => {
    const error = "This is an error";
    render(<Input label="Test" error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  test("error has role alert for accessibility", () => {
    const error = "This is an error";
    render(<Input label="Test" error={error} />);
    expect(screen.getByRole("alert")).toHaveTextContent(error);
  });

  test("input has aria-invalid when error is present", () => {
    const label = "Label";
    render(<Input label={label} error="Error message" />);
    expect(screen.getByLabelText(label)).toHaveAttribute("aria-invalid", "true");
  });

  test("input does not have aria-invalid when no error", () => {
    const label = "Label";
    render(<Input label={label} />);
    expect(screen.getByLabelText(label)).toHaveAttribute("aria-invalid", "false");
  });

  test("input does not have aria-describedby when no hint or error", () => {
    const label = "Label";
    render(<Input label={label} />);
    expect(screen.getByLabelText(label)).not.toHaveAttribute("aria-describedby");
  });

  test("input is described by hint", () => {
    const label = "Label";
    const hint = "This is a hint";
    render(<Input label={label} hint={hint} />);
    const input = screen.getByLabelText(label);
    const hintElement = screen.getByText(hint);
    expect(input).toHaveAttribute("aria-describedby", hintElement.id);
  });

  test("input is described by error", () => {
    const label = "Label";
    const error = "This is an error";
    render(<Input label={label} error={error} />);
    const input = screen.getByLabelText(label);
    const errorElement = screen.getByText(error);
    expect(input).toHaveAttribute("aria-describedby", errorElement.id);
  });

  test("input is described by both error and hint", () => {
    const label = "Label";
    const hint = "This is a hint";
    const error = "This is an error";
    render(<Input label={label} hint={hint} error={error} />);
    const input = screen.getByLabelText(label);
    const hintElement = screen.getByText(hint);
    const errorElement = screen.getByText(error);
    expect(input.getAttribute("aria-describedby")).toContain(errorElement.id);
    expect(input.getAttribute("aria-describedby")).toContain(hintElement.id);
  });
});
