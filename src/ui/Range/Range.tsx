"use client";

import React from "react";
import { useRange } from "hooks/useRange";
import styles from "./Range.module.css";

/**
 * Props for the Range component.
 */
interface RangeProps {
  /** 
   * "normal" allows free numeric input within min/max boundaries.
   * "fixed" restricts values to a predefined list of options.
   */
  type: "normal" | "fixed";
  /** Minimum allowed value for the range (only for "normal" type) */
  min?: number;
  /** Maximum allowed value for the range (only for "normal" type) */
  max?: number;
  /** List of available numeric options (required for "fixed" type) */
  options?: number[];
  /** Callback triggered when the selection changes */
  onChange?: (min: number, max: number) => void;
}

import Slider from "ui/Slider";
import CurrencyInput from "ui/CurrencyInput";

/**
 * A comprehensive Range Selector component.
 * It provides a dual-handle slider and optionally currency inputs for precise control.
 * It supports both free-range selection and snapping to fixed values.
 * 
 * @component
 * @example
 * ```tsx
 * // Normal mode
 * <Range type="normal" min={0} max={100} onChange={(min, max) => console.log(min, max)} />
 * 
 * // Fixed mode
 * <Range type="fixed" options={[1.99, 5.99, 10.99]} onChange={(min, max) => console.log(min, max)} />
 * ```
 */
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
        type={type}
        options={options}
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
