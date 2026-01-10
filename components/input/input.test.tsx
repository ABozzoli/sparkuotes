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
});
