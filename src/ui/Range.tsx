"use client";

import React from "react";
import { useRange } from "hooks/useRange";
import styles from "./Range.module.css";

interface RangeProps {
  type: "normal" | "fixed";
  min?: number;
  max?: number;
  options?: number[];
  onChange?: (min: number, max: number) => void;
}

import Slider from "./Slider";
import CurrencyInput from "./CurrencyInput";

const Range: React.FC<RangeProps> = ({ 
  type, 
  min = 0, 
  max = 100, 
  options = [],
  onChange
}) => {
  const {
    minVal,
    maxVal,
    minInput,
    maxInput,
    setIsDragging,
    isDragging,
    trackRef,
    getPercent,
    handleInputChange,
    handleInputBlur
  } = useRange({ type, min, max, options });

  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    if (onChangeRef.current) {
      onChangeRef.current(minVal, maxVal);
    }
  }, [minVal, maxVal]);

  return (
    <div className={styles.rangeContainer}>
      {type === "normal" ? (
        <CurrencyInput 
          value={minInput} 
          onChange={(e) => handleInputChange(e, "min")}
          onBlur={() => handleInputBlur("min")}
          data-testid="min-input"
        />
      ) : (
        <span className={styles.fixedLabel}>{minVal.toFixed(2)}€</span>
      )}

      <Slider 
        minVal={minVal}
        maxVal={maxVal}
        trackRef={trackRef}
        getPercent={getPercent}
        setIsDragging={setIsDragging}
        isDragging={isDragging}
      />

      {type === "normal" ? (
        <CurrencyInput 
          value={maxInput} 
          onChange={(e) => handleInputChange(e, "max")}
          onBlur={() => handleInputBlur("max")}
          data-testid="max-input"
        />
      ) : (
        <span className={styles.fixedLabel}>{maxVal.toFixed(2)}€</span>
      )}
    </div>
  );
};


export default Range;
