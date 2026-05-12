import React from "react";
import styles from "./Slider.module.css";

interface SliderProps {
  minVal: number;
  maxVal: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  getPercent: (value: number) => number;
  setIsDragging: (dragging: "min" | "max" | null) => void;
  isDragging: "min" | "max" | null;
}

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
