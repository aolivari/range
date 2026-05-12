import React from "react";
import styles from "./CurrencyInput.module.css";

interface CurrencyInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  "data-testid"?: string;
  symbol?: string;
}

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
