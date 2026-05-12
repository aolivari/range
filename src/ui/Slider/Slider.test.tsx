import { describe, test, expect, jest } from "@jest/globals";
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Slider from "./Slider";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe("Slider Component", () => {
  const mockGetPercent = (val: number) => val;
  const mockSetIsDragging = jest.fn();
  const mockTrackRef = {
    current: null,
  } as unknown as React.RefObject<HTMLDivElement>;

  test("renders progress bar and handles with correct positions", () => {
    render(
      <Slider
        minVal={20}
        maxVal={80}
        getPercent={mockGetPercent}
        setIsDragging={mockSetIsDragging}
        isDragging={null}
        trackRef={mockTrackRef}
      />,
    );

    const progressBar = screen.getByTestId("progress-bar");
    const minHandle = screen.getByTestId("min-handle");
    const maxHandle = screen.getByTestId("max-handle");

    expect(progressBar.style.left).toBe("20%");
    expect(progressBar.style.right).toBe("20%"); // 100 - 80 = 20
    expect(minHandle.style.left).toBe("20%");
    expect(maxHandle.style.left).toBe("80%");
  });

  test("calls setIsDragging when handles are clicked", () => {
    render(
      <Slider
        minVal={20}
        maxVal={80}
        getPercent={mockGetPercent}
        setIsDragging={mockSetIsDragging}
        isDragging={null}
        trackRef={mockTrackRef}
      />,
    );

    const minHandle = screen.getByTestId("min-handle");
    const maxHandle = screen.getByTestId("max-handle");

    fireEvent.mouseDown(minHandle);
    expect(mockSetIsDragging).toHaveBeenCalledWith("min");

    fireEvent.mouseDown(maxHandle);
    expect(mockSetIsDragging).toHaveBeenCalledWith("max");
  });

  test("calls setIsDragging when handles are touched", () => {
    render(
      <Slider
        minVal={20}
        maxVal={80}
        getPercent={mockGetPercent}
        setIsDragging={mockSetIsDragging}
        isDragging={null}
        trackRef={mockTrackRef}
      />,
    );

    const minHandle = screen.getByTestId("min-handle");
    fireEvent.touchStart(minHandle);
    expect(mockSetIsDragging).toHaveBeenCalledWith("min");
  });

  test("applies dragging classes correctly", () => {
    const { rerender } = render(
      <Slider
        minVal={20}
        maxVal={80}
        getPercent={mockGetPercent}
        setIsDragging={mockSetIsDragging}
        isDragging="min"
        trackRef={mockTrackRef}
      />,
    );

    const minHandle = screen.getByTestId("min-handle");
    // We check for the presence of the class.
    // Since we use CSS modules, we might just check if it contains *any* class that looks like grabbing
    // but a better way is to check the className property.
    expect(minHandle.className).toContain("grabbing");

    rerender(
      <Slider
        minVal={20}
        maxVal={80}
        getPercent={mockGetPercent}
        setIsDragging={mockSetIsDragging}
        isDragging="max"
        trackRef={mockTrackRef}
      />,
    );
    const maxHandle = screen.getByTestId("max-handle");
    expect(maxHandle.className).toContain("grabbing");
  });
});
