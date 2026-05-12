import React from "react";
import styles from "./CurrencyInput.module.css";

/**
 * Props for the CurrencyInput component.
 */
interface CurrencyInputProps {
  /** The current string value of the input */
  value: string;
  /** Callback triggered when the input value changes */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback triggered when the input loses focus (used for formatting) */
  onBlur: () => void;
  /** Test identifier for automated testing */
  "data-testid"?: string;
  /** Currency symbol to display next to the input (default: €) */
  symbol?: string;
}

/**
 * A controlled numeric input component specifically designed for currency values.
 * It displays a symbol (like €) and handles numeric entry with decimal support.
 * 
 * @component
 * @example
 * <CurrencyInput 
 *   value="10.50" 
 *   symbol="€" 
 *   onChange={(e) => handle(e)} 
 *   onBlur={() => format()} 
 * />
 */
const CurrencyInput: React.FC<CurrencyInputProps> = ({ 
  value, 
  onChange, 
  onBlur, 
  "data-testid": testId,
  symbol = "€"
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input 
        type="number" 
        value={value} 
        onChange={onChange}
        onBlur={onBlur}
        className={styles.labelInput}
        data-testid={testId}
        step="0.01"
      />
      <span className={styles.currencySymbol}>{symbol}</span>
    </div>
  );
};

export default CurrencyInput;
