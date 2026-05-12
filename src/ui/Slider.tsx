import React from "react";
import styles from "./Slider.module.css";

interface SliderProps {
  minVal: number;
  maxVal: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  getPercent: (value: number) => number;
  setIsDragging: (dragging: "min" | "max" | null) => void;
}

const Slider: React.FC<SliderProps> = ({ 
  minVal, 
  maxVal, 
  trackRef, 
  getPercent, 
  setIsDragging 
}) => {
  return (
    <div className={styles.slider} ref={trackRef}>
      <div 
        className={styles.progress} 
        style={{ 
          left: `${getPercent(minVal)}%`, 
          right: `${100 - getPercent(maxVal)}%` 
        }}
        data-testid="progress-bar"
      />
      <div 
        className={styles.handle} 
        style={{ left: `${getPercent(minVal)}%` }} 
        onMouseDown={() => setIsDragging("min")}
        data-testid="min-handle"
      />
      <div 
        className={styles.handle} 
        style={{ left: `${getPercent(maxVal)}%` }} 
        onMouseDown={() => setIsDragging("max")}
        data-testid="max-handle"
      />
    </div>
  );
};

export default Slider;
