import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Range from "./Range";

describe("Range Component", () => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      width: 100,
      height: 10,
      top: 0,
      left: 0,
      bottom: 10,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    } as any));
  });

  test("renders correctly in normal mode with decimals", () => {
    render(<Range type="normal" min={10} max={50} />);
    const minInput = screen.getByTestId("min-input") as HTMLInputElement;
    const maxInput = screen.getByTestId("max-input") as HTMLInputElement;
    expect(minInput.value).toBe("10.00");
    expect(maxInput.value).toBe("50.00");
  });

  test("clamps values to absolute maximum", () => {
    render(<Range type="normal" min={0} max={100} />);
    const maxInput = screen.getByTestId("max-input") as HTMLInputElement;
    fireEvent.change(maxInput, { target: { value: "150" } });
    fireEvent.blur(maxInput);
    expect(maxInput.value).toBe("100.00");
  });

  test("snaps to closest value in fixed mode", async () => {
    const options = [1.99, 10.99, 50.00];
    render(<Range type="fixed" options={options} min={1.99} max={50.00} />);
    
    const minHandle = screen.getByTestId("min-handle");
    const result = screen.getByTestId("selection-result");

    fireEvent.mouseDown(minHandle);
    await act(async () => {
      // Move to 25px in a 100px track (approx 25% of the range)
      // Range is ~50. 25% is ~12. Closest is 10.99.
      fireEvent.mouseMove(window, { clientX: 25 });
    });
    
    expect(result.textContent).toContain("10.99€");
    fireEvent.mouseUp(window);
  });

  test("updates progress bar styles based on selection", () => {
    render(<Range type="normal" min={0} max={100} />);
    const minInput = screen.getByTestId("min-input") as HTMLInputElement;
    const maxInput = screen.getByTestId("max-input") as HTMLInputElement;
    const progressBar = screen.getByTestId("progress-bar");

    // Initial 0-100 should be full width
    expect(progressBar.style.left).toBe("0%");
    expect(progressBar.style.right).toBe("0%");

    // Change to 25-75
    fireEvent.change(minInput, { target: { value: "25" } });
    fireEvent.change(maxInput, { target: { value: "75" } });
    
    expect(progressBar.style.left).toBe("25%");
    expect(progressBar.style.right).toBe("25%");
  });

  test("prevents handles from crossing during drag", async () => {
    render(<Range type="normal" min={0} max={100} />);
    const minHandle = screen.getByTestId("min-handle");
    const result = screen.getByTestId("selection-result");

    fireEvent.mouseDown(minHandle);
    await act(async () => {
      // Arrastramos el mínimo hasta el final (100)
      fireEvent.mouseMove(window, { clientX: 150 });
    });
    // El mínimo debe haberse quedado en 99.99€ (el máximo 100.00€ menos el gap de 0.01)
    expect(result.textContent).toContain("99.99€ - 100.00€");
    fireEvent.mouseUp(window);
  });

  test("prevents max handle from crossing min handle during drag", async () => {
    render(<Range type="normal" min={0} max={100} />);
    const maxHandle = screen.getByTestId("max-handle");
    const result = screen.getByTestId("selection-result");

    fireEvent.mouseDown(maxHandle);
    await act(async () => {
      // Arrastramos el máximo hasta el principio (0)
      fireEvent.mouseMove(window, { clientX: -50 });
    });
    // El máximo debe haberse quedado en 0.01€ (el mínimo 0.00€ más el gap de 0.01)
    expect(result.textContent).toContain("0.00€ - 0.01€");
    fireEvent.mouseUp(window);
  });

  test("prevents overlapping in fixed mode", async () => {
    const options = [1.99, 10.99, 50.00];
    render(<Range type="fixed" options={options} min={1.99} max={10.99} />);
    
    const maxHandle = screen.getByTestId("max-handle");
    const result = screen.getByTestId("selection-result");

    fireEvent.mouseDown(maxHandle);
    await act(async () => {
      // Intentamos mover el máximo (que está en 10.99) hacia la izquierda, donde está el mínimo (1.99)
      fireEvent.mouseMove(window, { clientX: 0 });
    });
    
    // En modo fixed, no pueden estar en el mismo sitio. 
    // Como el mínimo está en 1.99, el máximo se queda en la siguiente opción disponible (10.99)
    expect(result.textContent).toContain("1.99€ - 10.99€");
    fireEvent.mouseUp(window);
  });
});
