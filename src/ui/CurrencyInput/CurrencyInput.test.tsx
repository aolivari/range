import { describe, test, expect, jest } from "@jest/globals";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import CurrencyInput from "./CurrencyInput";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe("CurrencyInput Component", () => {
  test("renders correctly with value and symbol", () => {
    render(
      <CurrencyInput
        value="10.00"
        onChange={() => {}}
        onBlur={() => {}}
        data-testid="currency-input"
        symbol="€"
      />,
    );
    const input = screen.getByTestId("currency-input") as HTMLInputElement;
    expect(input.value).toBe("10.00");
    expect(screen.getByText("€")).toBeTruthy();
  });

  test("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(
      <CurrencyInput
        value="10.00"
        onChange={handleChange}
        onBlur={() => {}}
        data-testid="currency-input"
      />,
    );
    const input = screen.getByTestId("currency-input");
    fireEvent.change(input, { target: { value: "20.00" } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("calls onBlur when input loses focus", () => {
    const handleBlur = jest.fn();
    render(
      <CurrencyInput
        value="10.00"
        onChange={() => {}}
        onBlur={handleBlur}
        data-testid="currency-input"
      />,
    );
    const input = screen.getByTestId("currency-input");
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });
});
