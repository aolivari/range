import { useState, useCallback, useRef, useEffect } from "react";

interface UseRangeProps {
  type: "normal" | "fixed";
  min: number;
  max: number;
  options: number[];
}

export const useRange = ({ type, min, max, options }: UseRangeProps) => {
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
      let newValue = getValueFromPosition(e.clientX);
      updateValues(newValue);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      let newValue = getValueFromPosition(e.touches[0].clientX);
      updateValues(newValue);
    };

    const updateValues = (newValue: number) => {
      if (isDragging === "min") {
        if (type === "fixed") {
          const possibleOptions = options.filter(opt => opt < maxVal);
          if (possibleOptions.length > 0) {
            const safeMax = Math.max(...possibleOptions);
            setMinVal(Math.min(newValue, safeMax));
          }
        } else {
          setMinVal(Math.min(newValue, maxVal - 0.01));
        }
      } else {
        if (type === "fixed") {
          const possibleOptions = options.filter(opt => opt > minVal);
          if (possibleOptions.length > 0) {
            const safeMin = Math.min(...possibleOptions);
            setMaxVal(Math.max(newValue, safeMin));
          }
        } else {
          setMaxVal(Math.max(newValue, minVal + 0.01));
        }
      }
    };

    const handleEnd = () => setIsDragging(null);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, minVal, maxVal, absMin, absMax, type, options]);

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

  return {
    minVal,
    maxVal,
    minInput,
    maxInput,
    isDragging,
    setIsDragging,
    trackRef,
    getPercent,
    handleInputChange,
    handleInputBlur
  };
};
