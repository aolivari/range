"use client";

import React from "react";
import { useRange } from "hooks/useRange";
import styles from "./Range.module.css";

interface RangeProps {
  type: "normal" | "fixed";
  min?: number;
  max?: number;
  options?: number[];
}

const Range: React.FC<RangeProps> = ({ 
  type, 
  min = 0, 
  max = 100, 
  options = [] 
}) => {
  const {
    minVal,
    maxVal,
    minInput,
    maxInput,
    setIsDragging,
    trackRef,
    getPercent,
    handleInputChange,
    handleInputBlur
  } = useRange({ type, min, max, options });


  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.labelContainer}>
        {type === "normal" ? (
          <div className={styles.inputWrapper}>
            <input 
              type="number" 
              value={minInput} 
              onChange={(e) => handleInputChange(e, "min")}
              onBlur={() => handleInputBlur("min")}
              className={styles.labelInput}
              data-testid="min-input"
              step="0.01"
            />
            <span className={styles.currencySymbol}>€</span>
          </div>
        ) : (
          <span className={styles.fixedLabel}>{minVal.toFixed(2)}€</span>
        )}
      </div>

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

      <div className={styles.labelContainer}>
        {type === "normal" ? (
          <div className={styles.inputWrapper}>
            <input 
              type="number" 
              value={maxInput} 
              onChange={(e) => handleInputChange(e, "max")}
              onBlur={() => handleInputBlur("max")}
              className={styles.labelInput}
              data-testid="max-input"
              step="0.01"
            />
            <span className={styles.currencySymbol}>€</span>
          </div>
        ) : (
          <span className={styles.fixedLabel}>{maxVal.toFixed(2)}€</span>
        )}
      </div>
      
      <div className={styles.currentValue} data-testid="selection-result">
        Selection: {minVal.toFixed(2)}€ - {maxVal.toFixed(2)}€
      </div>
    </div>
  );
};

export default Range;
