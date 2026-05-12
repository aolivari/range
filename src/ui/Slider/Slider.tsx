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
  isDragging
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
        data-testid="min-handle"
      />
      <div 
        className={`${styles.handle} ${isDragging === "max" ? styles.grabbing : ""}`} 
        style={{ left: `${getPercent(maxVal)}%` }} 
        onMouseDown={() => setIsDragging("max")}
        onTouchStart={() => setIsDragging("max")}
        data-testid="max-handle"
      />
    </div>
  );
};

export default Slider;
