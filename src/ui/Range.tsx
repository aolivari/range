"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
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
  const [absMin] = useState(min);
  const [absMax] = useState(max);
  
  const [minVal, setMinVal] = useState(type === "fixed" ? options[0] : min);
  const [maxVal, setMaxVal] = useState(type === "fixed" ? options[options.length - 1] : max);
  
  const [minInput, setMinInput] = useState(minVal.toFixed(2));
  const [maxInput, setMaxInput] = useState(maxVal.toFixed(2));

  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging) {
      setMinInput(minVal.toFixed(2));
      setMaxInput(maxVal.toFixed(2));
    }
  }, [minVal, maxVal, isDragging]);

  useEffect(() => {
    if (type === "fixed" && options.length > 0) {
      const sorted = [...options].sort((a, b) => a - b);
      setMinVal(sorted[0]);
      setMaxVal(sorted[sorted.length - 1]);
      setMinInput(sorted[0].toFixed(2));
      setMaxInput(sorted[sorted.length - 1].toFixed(2));
    }
  }, [type, options]);

  const getPercent = useCallback(
    (value: number) => {
      const range = absMax - absMin;
      if (range === 0) return 0;
      return Math.round(((value - absMin) / range) * 100);
    },
    [absMin, absMax]
  );

  const getValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * 100;
    const rawValue = absMin + (percent / 100) * (absMax - absMin);

    if (type === "fixed" && options.length > 0) {
      return options.reduce((prev, curr) => 
        Math.abs(curr - rawValue) < Math.abs(prev - rawValue) ? curr : prev
      );
    }
    return parseFloat(rawValue.toFixed(2));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newValue = getValueFromPosition(e.clientX);
      if (isDragging === "min") {
        setMinVal(Math.min(newValue, maxVal));
      } else {
        setMaxVal(Math.max(newValue, minVal));
      }
    };
    const handleMouseUp = () => setIsDragging(null);
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, minVal, maxVal, absMin, absMax]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, bound: "min" | "max") => {
    let stringVal = e.target.value;
    if (absMin >= 0 && stringVal.includes("-")) stringVal = stringVal.replace("-", "");
    const decimalParts = stringVal.split(".");
    if (decimalParts[1] && decimalParts[1].length > 2) {
      stringVal = `${decimalParts[0]}.${decimalParts[1].substring(0, 2)}`;
    }

    if (bound === "min") {
      setMinInput(stringVal);
      const val = parseFloat(stringVal);
      if (!isNaN(val)) {
        const sanitized = Math.max(absMin, Math.min(val, maxVal - 0.01));
        setMinVal(parseFloat(sanitized.toFixed(2)));
      }
    } else {
      setMaxInput(stringVal);
      const val = parseFloat(stringVal);
      if (!isNaN(val)) {
        const sanitized = Math.min(absMax, Math.max(val, minVal + 0.01));
        setMaxVal(parseFloat(sanitized.toFixed(2)));
      }
    }
  };

  const handleInputBlur = (bound: "min" | "max") => {
    if (bound === "min") setMinInput(minVal.toFixed(2));
    else setMaxInput(maxVal.toFixed(2));
  };

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
