import React from "react";
import styles from "./Slider.module.css";

/**
 * Props for the Slider component.
 */
interface SliderProps {
  /** Current minimum value of the selection */
  minVal: number;
  /** Current maximum value of the selection */
  maxVal: number;
  /** Reference to the track element (used for coordinate calculations) */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Utility function to convert a value to its percentage position in the track */
  getPercent: (value: number) => number;
  /** Callback to update which handle is currently being dragged */
  setIsDragging: (dragging: "min" | "max" | null) => void;
  /** Indicates which handle is currently being dragged, if any */
  isDragging: "min" | "max" | null;
  /** Range type normal or fixed */
  type?: "normal" | "fixed";
  /** Available numeric options for fixed range mode */
  options?: number[];
  /** Absolute minimum boundary */
  absMin?: number;
  /** Absolute maximum boundary */
  absMax?: number;
  /** Callback for keydown events */
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, bound: "min" | "max") => void;
}

/**
 * A presentation component that renders a range slider with two handles and a progress bar.
 * It relies on external state and logic (usually from useRange hook) to handle interactions.
 * 
 * @component
 * @example
 * <Slider 
 *   minVal={20} 
 *   maxVal={80} 
 *   getPercent={(v) => v} 
 *   setIsDragging={(d) => console.log(d)} 
 *   isDragging={null} 
 *   trackRef={myRef} 
 * />
 */
const Slider: React.FC<SliderProps> = ({ 
  minVal, 
  maxVal, 
  trackRef, 
  getPercent, 
  setIsDragging,
  isDragging,
  type,
  options,
  absMin = 0,
  absMax = 100,
  onKeyDown
}) => {
  return (
    <div className={`${styles.slider} ${isDragging ? styles.draggingMode : ""}`} ref={trackRef}>
      <div 
        className={styles.progress} 
        style={{ 
          left: `${getPercent(minVal)}%`, 
          right: `${100 - getPercent(maxVal)}%` 
        }}
        data-testid="progress-bar"
      />
      <div 
        className={`${styles.handle} ${isDragging === "min" ? styles.grabbing : ""}`} 
        style={{ left: `${getPercent(minVal)}%` }} 
        onMouseDown={() => setIsDragging("min")}
        onTouchStart={() => setIsDragging("min")}
        onKeyDown={(e) => onKeyDown && onKeyDown(e, "min")}
        tabIndex={0}
        role="slider"
        aria-label="Minimum range value"
        aria-valuemin={absMin}
        aria-valuemax={maxVal}
        aria-valuenow={minVal}
        data-testid="min-handle"
      />
      <div 
        className={`${styles.handle} ${isDragging === "max" ? styles.grabbing : ""}`} 
        style={{ left: `${getPercent(maxVal)}%` }} 
        onMouseDown={() => setIsDragging("max")}
        onTouchStart={() => setIsDragging("max")}
        onKeyDown={(e) => onKeyDown && onKeyDown(e, "max")}
        tabIndex={0}
        role="slider"
        aria-label="Maximum range value"
        aria-valuemin={minVal}
        aria-valuemax={absMax}
        aria-valuenow={maxVal}
        data-testid="max-handle"
      />
    </div>
  );
};

export default Slider;
